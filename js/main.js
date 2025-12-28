/**
 * MAIN APPLICATION SCRIPT
 * Core functionality and event handlers
 */

// ============================================
// MOBILE NAVIGATION
// ============================================

/**
 * Toggle mobile navigation
 */
function toggleMobileNav() {
    const mobileNav = document.querySelector('.nav-mobile');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }
}

/**
 * Close mobile navigation
 */
function closeMobileNav() {
    const mobileNav = document.querySelector('.nav-mobile');
    if (mobileNav) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// PRODUCT INTERACTIONS
// ============================================

/**
 * Setup product card event listeners
 */
function setupProductListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        // Add to cart from product card
        if (e.target.classList.contains('product-view-btn')) {
            const productId = parseInt(e.target.dataset.productId);
            openQuickView(productId); // Show product details
        }
        
        // Quick view button
        if (e.target.closest('.quick-view')) {
            const btn = e.target.closest('.quick-view');
            const productId = parseInt(btn.dataset.productId);
            openQuickView(productId);
        }
        
        // Add to wishlist
        if (e.target.closest('.add-to-wishlist')) {
            const btn = e.target.closest('.add-to-wishlist');
            const productId = parseInt(btn.dataset.productId);
            addToWishlist(productId);
        }
    });
}

/**
 * Open quick view modal for product
 * @param {number} productId - Product ID
 */
function openQuickView(productId) {
    const product = window.ProductManager.getProductById(productId);
    if (!product) return;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    const originalPriceHTML = product.originalPrice 
        ? `<span class="price-original">${window.ProductManager.formatPrice(product.originalPrice)}</span>` 
        : '';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Quick View</h3>
                <button class="modal-close" onclick="closeQuickView()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
                    </div>
                    <div>
                        <span class="product-brand">${product.brand}</span>
                        <h2 style="margin: 0.5rem 0;">${product.name}</h2>
                        <div class="product-price" style="margin-bottom: 1rem;">
                            <span class="price-current" style="font-size: 1.5rem;">${window.ProductManager.formatPrice(product.price)}</span>
                            ${originalPriceHTML}
                        </div>
                        <p class="text-muted">${product.description}</p>
                        
                        <div style="margin: 1rem 0;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Size</label>
                            <select id="qv-size" class="filter-select" style="width: 100%;">
                                ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div style="margin: 1rem 0;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Color</label>
                            <select id="qv-color" class="filter-select" style="width: 100%;">
                                ${product.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                        </div>
                        
                        <button class="btn btn-primary btn-full" onclick="addFromQuickView(${product.id})">
                            Add to Cart
                        </button>
                        
                        <p class="text-sm text-muted" style="margin-top: 1rem;">
                            ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeQuickView();
    });
}

/**
 * Close quick view modal
 */
function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Add to cart from quick view modal
 * @param {number} productId - Product ID
 */
function addFromQuickView(productId) {
    const size = document.getElementById('qv-size')?.value;
    const color = document.getElementById('qv-color')?.value;
    window.CartManager.addToCart(productId, 1, size, color);
    closeQuickView();
}

/**
 * Add product to wishlist
 * @param {number} productId - Product ID
 */
function addToWishlist(productId) {
    const product = window.ProductManager.getProductById(productId);
    if (!product) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist.includes(productId)) {
        window.CartManager.showToast('Already in wishlist', 'info');
        return;
    }
    
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.CartManager.showToast(`${product.name} added to wishlist`, 'success');
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            if (searchResults) searchResults.innerHTML = '';
            return;
        }
        
        debounceTimer = setTimeout(() => {
            const results = window.ProductManager.searchProducts(query);
            displaySearchResults(results);
        }, 300);
    });
    
    // Close search results on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            if (searchResults) searchResults.innerHTML = '';
        }
    });
}

/**
 * Display search results
 * @param {Array} results - Search results
 */
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No products found</div>';
        return;
    }
    
    searchResults.innerHTML = results.slice(0, 5).map(product => `
        <a href="products.html?id=${product.id}" class="search-result-item">
            <img src="${product.image}" alt="${product.name}">
            <div>
                <strong>${product.name}</strong>
                <span>${window.ProductManager.formatPrice(product.price)}</span>
            </div>
        </a>
    `).join('');
}

// ============================================
// FORM VALIDATION
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Setup checkout form validation
 */
function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('first-name')?.value.trim();
        const lastName = document.getElementById('last-name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const address = document.getElementById('address')?.value.trim();
        const city = document.getElementById('city')?.value.trim();
        const state = document.getElementById('state')?.value.trim();
        const zip = document.getElementById('zip')?.value.trim();
        
        // Validate
        let isValid = true;
        
        if (!firstName || !lastName) {
            showFieldError('first-name', 'Please enter your full name');
            isValid = false;
        }
        
        if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!isValidPhone(phone)) {
            showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (!address || !city || !state || !zip) {
            showFieldError('address', 'Please complete your shipping address');
            isValid = false;
        }
        
        if (isValid) {
            processOrder({
                customer: { firstName, lastName, email, phone },
                shipping: { address, city, state, zip },
                items: window.CartManager.getCartItems(),
                total: window.CartManager.getCartTotal()
            });
        }
    });
}

/**
 * Show field error message
 * @param {string} fieldId - Field ID
 * @param {string} message - Error message
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.style.borderColor = 'var(--color-error)';
    
    // Create or update error message
    let errorEl = field.parentElement.querySelector('.form-error');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    
    // Remove error on focus
    field.addEventListener('focus', function onFocus() {
        field.style.borderColor = '';
        if (errorEl) errorEl.remove();
        field.removeEventListener('focus', onFocus);
    });
}

/**
 * Process order
 * @param {Object} orderData - Order data
 */
function processOrder(orderData) {
    // In a real application, this would send to a backend
    console.log('Processing order:', orderData);
    
    // Generate order ID
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    
    // Clear cart
    window.CartManager.clearCart();
    
    // Show success message
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <section class="section">
                <div class="container text-center">
                    <div style="max-width: 500px; margin: 0 auto;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">✓</div>
                        <h2>Order Confirmed!</h2>
                        <p class="text-muted">Thank you for your order, ${orderData.customer.firstName}!</p>
                        <p style="margin-bottom: 2rem;">
                            Your order number is <strong>${orderId}</strong>
                        </p>
                        <p class="text-sm text-muted">
                            A confirmation email has been sent to ${orderData.customer.email}
                        </p>
                        <a href="index.html" class="btn btn-primary" style="margin-top: 2rem;">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </section>
        `;
    }
}

// ============================================
// NEWSLETTER SIGNUP
// ============================================

/**
 * Setup newsletter form
 */
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]')?.value.trim();
        
        if (!isValidEmail(email)) {
            window.CartManager.showToast('Please enter a valid email', 'error');
            return;
        }
        
        // In a real app, this would send to a backend
        window.CartManager.showToast('Thanks for subscribing!', 'success');
        form.reset();
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Setup scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize application
 */
function initApp() {
    // Setup mobile navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavClose = document.querySelector('.nav-mobile-close');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileNav);
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }
    
    // Close mobile nav on link click
    document.querySelectorAll('.nav-mobile a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Setup other functionality
    setupProductListeners();
    setupSearch();
    setupCheckoutForm();
    setupNewsletterForm();
    setupScrollAnimations();
    
    // Mark active nav item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Make functions globally available
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.addFromQuickView = addFromQuickView;

/**
 * SECURE PAYMENT VALIDATION
 * Card validation, input masking, and security features
 */

// Luhn algorithm for card validation
function validateCardNumber(number) {
    const digits = number.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Detect card type
function detectCardType(number) {
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/
    };
    
    const digits = number.replace(/\D/g, '');
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(digits)) return type;
    }
    return null;
}

// Validate expiry date
function validateExpiry(expiry) {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    
    const month = parseInt(match[1], 10);
    const year = parseInt('20' + match[2], 10);
    
    if (month < 1 || month > 12) return false;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
}

// Validate CVC
function validateCVC(cvc, cardType) {
    const digits = cvc.replace(/\D/g, '');
    const expectedLength = cardType === 'amex' ? 4 : 3;
    return digits.length === expectedLength;
}

// Encrypt sensitive data (simulation - in production use real encryption)
function encryptData(data) {
    // Base64 encoding as simulation (use real encryption in production)
    return btoa(JSON.stringify({
        data: data,
        timestamp: Date.now(),
        token: generateSecurityToken()
    }));
}

// Generate security token
function generateSecurityToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Mask card number for display
function maskCardNumber(number) {
    const digits = number.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    return '•••• •••• •••• ' + digits.slice(-4);
}

// Setup secure payment form
function setupSecurePayment() {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCvcInput = document.getElementById('cardCvc');
    
    if (!cardNumberInput) return;
    
    // Card number formatting and validation
    cardNumberInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        this.value = formatted;
        
        // Detect and highlight card type
        const cardType = detectCardType(value);
        document.querySelectorAll('.card-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        if (cardType) {
            const iconEl = document.querySelector('.card-icon.' + cardType);
            if (iconEl) iconEl.classList.add('active');
        }
        
        // Validate
        if (value.length >= 13) {
            if (validateCardNumber(value)) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
                this.classList.remove('valid');
            }
        } else {
            this.classList.remove('valid', 'invalid');
        }
    });
    
    // Expiry date formatting and validation
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            this.value = value;
            
            if (value.length === 5) {
                if (validateExpiry(value)) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
            } else {
                this.classList.remove('valid', 'invalid');
            }
        });
    }
    
    // CVC validation
    if (cardCvcInput) {
        cardCvcInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            this.value = value;
            
            const cardType = detectCardType(cardNumberInput.value);
            const expectedLength = cardType === 'amex' ? 4 : 3;
            
            if (value.length === expectedLength) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else if (value.length > 0) {
                this.classList.remove('valid', 'invalid');
            }
        });
    }
    
    console.log('🔒 Secure payment form initialized');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cardNumber')) {
        setupSecurePayment();
    }
});

// Export for use
window.PaymentSecurity = {
    validateCardNumber,
    validateExpiry,
    validateCVC,
    detectCardType,
    encryptData,
    maskCardNumber,
    generateSecurityToken
};


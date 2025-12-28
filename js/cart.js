/**
 * SHOPPING CART FUNCTIONALITY
 * Handles cart operations, storage, and UI updates
 */

// Cart state
let cart = [];

/**
 * Initialize cart from localStorage
 */
function initCart() {
    const stored = localStorage.getItem('vendorCart');
    if (stored) {
        cart = JSON.parse(stored);
    }
    updateCartUI();
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('vendorCart', JSON.stringify(cart));
    updateCartUI();
}

/**
 * Add item to cart
 * @param {number} productId - Product ID to add
 * @param {number} quantity - Quantity to add (default: 1)
 * @param {string} size - Selected size (optional)
 * @param {string} color - Selected color (optional)
 */
function addToCart(productId, quantity = 1, size = null, color = null) {
    const product = window.ProductManager.getProductById(productId);
    if (!product) {
        showToast('Product not found', 'error');
        return;
    }
    
    // Check if item already exists in cart with same size/color
    const existingIndex = cart.findIndex(item => 
        item.productId === productId && 
        item.size === size && 
        item.color === color
    );
    
    if (existingIndex !== -1) {
        // Update quantity of existing item
        cart[existingIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            productId,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity,
            size: size || product.sizes[0],
            color: color || product.colors[0]
        });
    }
    
    saveCart();
    showToast(`${product.name} added to cart`, 'success');
}

/**
 * Remove item from cart
 * @param {number} index - Index in cart array
 */
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const item = cart[index];
        cart.splice(index, 1);
        saveCart();
        showToast(`${item.name} removed from cart`, 'success');
    }
}

/**
 * Update item quantity
 * @param {number} index - Index in cart array
 * @param {number} quantity - New quantity
 */
function updateQuantity(index, quantity) {
    if (index >= 0 && index < cart.length) {
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            cart[index].quantity = quantity;
            saveCart();
        }
    }
}

/**
 * Clear entire cart
 */
function clearCart() {
    cart = [];
    saveCart();
    showToast('Cart cleared', 'success');
}

/**
 * Get cart items
 * @returns {Array} Cart items
 */
function getCartItems() {
    return cart;
}

/**
 * Get cart item count
 * @returns {number} Total number of items
 */
function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculate cart subtotal
 * @returns {number} Subtotal
 */
function getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calculate shipping cost
 * @returns {number} Shipping cost
 */
function getShippingCost() {
    const subtotal = getCartSubtotal();
    // Free shipping over $150
    return subtotal >= 150 ? 0 : 9.99;
}

/**
 * Calculate tax
 * @returns {number} Tax amount
 */
function getTax() {
    const subtotal = getCartSubtotal();
    // 8% tax rate
    return subtotal * 0.08;
}

/**
 * Calculate cart total
 * @returns {number} Total
 */
function getCartTotal() {
    return getCartSubtotal() + getShippingCost() + getTax();
}

/**
 * Update cart count in header
 */
function updateCartUI() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    
    cartCountElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

/**
 * Generate cart item HTML
 * @param {Object} item - Cart item
 * @param {number} index - Item index
 * @returns {string} HTML string
 */
function generateCartItemHTML(item, index) {
    return `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <span class="cart-item-brand">${item.brand}</span>
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="text-sm text-muted">Size: ${item.size} | Color: ${item.color}</p>
                <span class="cart-item-price">${window.ProductManager.formatPrice(item.price)}</span>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-index="${index}">−</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <button class="cart-item-remove" data-index="${index}">Remove</button>
            </div>
        </div>
    `;
}

/**
 * Render cart items to container
 * @param {HTMLElement} container - Container element
 */
function renderCart(container) {
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.map((item, index) => generateCartItemHTML(item, index)).join('');
    
    // Add event listeners
    container.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            updateQuantity(index, cart[index].quantity - 1);
            renderCart(container);
            updateCartSummary();
        });
    });
    
    container.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            updateQuantity(index, cart[index].quantity + 1);
            renderCart(container);
            updateCartSummary();
        });
    });
    
    container.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            removeFromCart(index);
            renderCart(container);
            updateCartSummary();
        });
    });
}

/**
 * Update cart summary section
 */
function updateCartSummary() {
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    const summaryEl = document.querySelector('.cart-summary');
    
    if (cart.length === 0 && summaryEl) {
        summaryEl.style.display = 'none';
        return;
    }
    
    if (summaryEl) {
        summaryEl.style.display = 'block';
    }
    
    if (subtotalEl) {
        subtotalEl.textContent = window.ProductManager.formatPrice(getCartSubtotal());
    }
    
    if (shippingEl) {
        const shipping = getShippingCost();
        shippingEl.textContent = shipping === 0 ? 'FREE' : window.ProductManager.formatPrice(shipping);
    }
    
    if (taxEl) {
        taxEl.textContent = window.ProductManager.formatPrice(getTax());
    }
    
    if (totalEl) {
        totalEl.textContent = window.ProductManager.formatPrice(getCartTotal());
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type ('success', 'error', 'info')
 */
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', initCart);

// Export functions for use in other modules
window.CartManager = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItems,
    getCart: getCartItems, // Alias for checkout compatibility
    getCartCount,
    getCartSubtotal,
    getTotal: getCartSubtotal, // Alias for checkout compatibility
    getShippingCost,
    getTax,
    getCartTotal,
    renderCart,
    updateCartSummary,
    showToast
};

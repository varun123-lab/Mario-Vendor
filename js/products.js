/**
 * PRODUCTS DATA AND MANAGEMENT
 * This file contains the product catalog data and related functions
 */

// Product categories
const CATEGORIES = {
    SWEATERS: 'sweaters',
    ACCESSORIES: 'accessories'
};

// Available brands
const BRANDS = {
    RALPH_LAUREN: 'Ralph Lauren',
    ESSENTIALS: 'Essentials',
    APPLE: 'Apple'
};

// Product catalog data
let products = [
    // Sweaters
    {
        id: 1,
        name: 'Ralph Lauren Sweater',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.SWEATERS,
        price: 25.00,
        originalPrice: 5000.00,
        image: 'images/products/WhatsApp Image 2025-12-29 at 1.47.30 PM.jpeg',
        description: 'Classic cable-knit sweater. 100% cotton construction with embroidered red Polo pony logo. Premium quality.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black', 'Hunter Green'],
        stock: 18,
        badge: 'sale',
        featured: true
    },
    {
        id: 2,
        name: 'Essentials Sweater',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.SWEATERS,
        price: 50.00,
        originalPrice: 9000.00,
        image: 'images/products/fear fo god sweater.jpeg',
        description: 'Fear of God Essentials relaxed fit crewneck sweater. Soft cotton blend fabric with rubberized "ESSENTIALS FEAR OF GOD" branding.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Tan', 'Beige', 'Sage', 'Black'],
        stock: 22,
        badge: 'sale',
        featured: true
    },
    
    // Accessories - AirPods
    {
        id: 3,
        name: 'AirPods',
        brand: BRANDS.APPLE,
        category: CATEGORIES.ACCESSORIES,
        price: 15.00,
        originalPrice: 100.00,
        image: 'images/products/download.jpeg',
        description: 'Apple AirPods wireless earbuds with spatial audio and dynamic head tracking. Adaptive EQ. Sweat and water resistant.',
        sizes: ['One Size'],
        colors: ['White'],
        stock: 35,
        badge: 'sale',
        featured: true
    }
];

/**
 * Get all products
 * @returns {Array} All products
 */
function getAllProducts() {
    return products;
}

/**
 * Get featured products
 * @returns {Array} Featured products
 */
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

/**
 * Get products by category
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered products
 */
function getProductsByCategory(category) {
    if (!category || category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

/**
 * Get products by brand
 * @param {string} brand - Brand to filter by
 * @returns {Array} Filtered products
 */
function getProductsByBrand(brand) {
    return products.filter(product => product.brand === brand);
}

/**
 * Get a single product by ID
 * @param {number} id - Product ID
 * @returns {Object|null} Product or null if not found
 */
function getProductById(id) {
    return products.find(product => product.id === parseInt(id)) || null;
}

/**
 * Search products by name or description
 * @param {string} query - Search query
 * @returns {Array} Matching products
 */
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
}

/**
 * Sort products
 * @param {Array} productList - Products to sort
 * @param {string} sortBy - Sort criteria ('price-low', 'price-high', 'name', 'newest')
 * @returns {Array} Sorted products
 */
function sortProducts(productList, sortBy) {
    const sorted = [...productList];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

/**
 * Add a new product (vendor functionality)
 * @param {Object} productData - Product data
 * @returns {Object} Created product
 */
function addProduct(productData) {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct = {
        id: newId,
        ...productData,
        badge: productData.badge || 'new'
    };
    products.push(newProduct);
    saveProductsToStorage();
    return newProduct;
}

/**
 * Update an existing product (vendor functionality)
 * @param {number} id - Product ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated product or null if not found
 */
function updateProduct(id, updates) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    saveProductsToStorage();
    return products[index];
}

/**
 * Delete a product (vendor functionality)
 * @param {number} id - Product ID
 * @returns {boolean} Success status
 */
function deleteProduct(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    
    products.splice(index, 1);
    saveProductsToStorage();
    return true;
}

/**
 * Save products to localStorage
 */
function saveProductsToStorage() {
    localStorage.setItem('vendorProducts', JSON.stringify(products));
}

/**
 * Load products from localStorage
 */
function loadProductsFromStorage() {
    const stored = localStorage.getItem('vendorProducts');
    if (stored) {
        products = JSON.parse(stored);
    }
}

/**
 * Format price to currency string
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

/**
 * Generate product card HTML
 * @param {Object} product - Product data
 * @returns {string} HTML string
 */
function generateProductCardHTML(product) {
    const badgeHTML = product.badge 
        ? `<span class="product-badge ${product.badge}">${product.badge}</span>` 
        : '';
    
    const originalPriceHTML = product.originalPrice 
        ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` 
        : '';

    return `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${badgeHTML}
                <div class="product-actions">
                    <button class="product-action-btn quick-view" title="Quick View" data-product-id="${product.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="product-action-btn add-to-wishlist" title="Add to Wishlist" data-product-id="${product.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-brand">${product.brand}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    ${originalPriceHTML}
                </div>
                <button class="product-view-btn" data-product-id="${product.id}">View Details</button>
            </div>
        </article>
    `;
}

/**
 * Render products to a container
 * @param {HTMLElement} container - Container element
 * @param {Array} productList - Products to render
 */
function renderProducts(container, productList) {
    if (!container) return;
    
    if (productList.length === 0) {
        container.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <p class="text-muted">No products available yet.</p>
                <p class="text-muted text-sm">Check back soon for new arrivals!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productList.map(generateProductCardHTML).join('');
}

// Initialize products from localStorage on load
document.addEventListener('DOMContentLoaded', loadProductsFromStorage);

// Export functions for use in other modules
window.ProductManager = {
    getAllProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductById,
    searchProducts,
    sortProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    formatPrice,
    generateProductCardHTML,
    renderProducts,
    CATEGORIES,
    BRANDS
};

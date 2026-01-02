/**
 * PRODUCTS DATA AND MANAGEMENT
 * This file contains the product catalog data and related functions
 */

// Product categories
const CATEGORIES = {
    HOODIES: 'hoodies',
    SWEATERS: 'sweaters',
    TSHIRTS: 't-shirts',
    ACCESSORIES: 'accessories'
};

// Available brands
const BRANDS = {
    RALPH_LAUREN: 'Ralph Lauren',
    SP5DER: 'Sp5der',
    DENIM_TEARS: 'Denim Tears',
    ESSENTIALS: 'Essentials',
    APPLE: 'Apple'
};

// Product catalog data
let products = [
    // Hoodies
    {
        id: 1,
        name: 'Ralph Lauren Hoodie',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.HOODIES,
        price: 4500.00,
        originalPrice: 5000.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        description: 'Premium cotton hoodie with embroidered Polo logo. Comfortable fit with kangaroo pocket and ribbed cuffs.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Gray'],
        stock: 25,
        badge: 'sale',
        featured: true
    },
    {
        id: 2,
        name: 'Sp5der Hoodie',
        brand: BRANDS.SP5DER,
        category: CATEGORIES.HOODIES,
        price: 3999.00,
        originalPrice: 5000.00,
        image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&h=400&fit=crop',
        description: 'Iconic spider web print design. Heavy-weight fleece construction. Available in multiple vibrant colors including Pink, Blue, Green, Yellow, Purple, Red.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'Blue', 'Green', 'Yellow', 'Purple', 'Red'],
        stock: 12,
        badge: 'sale',
        featured: true
    },
    {
        id: 3,
        name: 'Denim Tears Hoodie',
        brand: BRANDS.DENIM_TEARS,
        category: CATEGORIES.HOODIES,
        price: 4200.00,
        originalPrice: 5000.00,
        image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400&h=400&fit=crop',
        description: 'African Diaspora Goods collection. Premium French terry material with signature cotton wreath design.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Cream'],
        stock: 8,
        badge: 'sale',
        featured: true
    },
    {
        id: 4,
        name: 'Essentials Hoodie',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.HOODIES,
        price: 25.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
        description: 'Fear of God Essentials oversized fit hoodie with dropped shoulders. Rubberized logo on chest.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Oatmeal', 'Black', 'Sage'],
        stock: 30,
        badge: 'new',
        featured: true
    },
    
    // Sweaters
    {
        id: 5,
        name: 'Ralph Lauren Sweater',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.SWEATERS,
        price: 50.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
        description: 'Classic cable-knit sweater. 100% cotton construction with embroidered red Polo pony logo. Premium quality.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black', 'Hunter Green'],
        stock: 18,
        badge: null,
        featured: true
    },
    {
        id: 6,
        name: 'Essentials Sweater',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.SWEATERS,
        price: 8500.00,
        originalPrice: 9000.00,
        image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=400&h=400&fit=crop',
        description: 'Fear of God Essentials relaxed fit crewneck sweater. Soft cotton blend fabric with rubberized "ESSENTIALS FEAR OF GOD" branding.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Tan', 'Beige', 'Sage', 'Black'],
        stock: 22,
        badge: 'sale',
        featured: true
    },
    
    // T-Shirts
    {
        id: 7,
        name: 'Ralph Lauren T-Shirt',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.TSHIRTS,
        price: 25.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        description: 'Classic cotton tee featuring the iconic Polo Bear graphic. Premium soft cotton construction.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy'],
        stock: 40,
        badge: null,
        featured: false
    },
    {
        id: 8,
        name: 'Sp5der T-Shirt',
        brand: BRANDS.SP5DER,
        category: CATEGORIES.TSHIRTS,
        price: 4500.00,
        originalPrice: 5000.00,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
        description: 'Premium cotton tee with signature spider web print design. Heavyweight construction.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Pink'],
        stock: 28,
        badge: 'sale',
        featured: true
    },
    {
        id: 9,
        name: 'Denim Tears T-Shirt',
        brand: BRANDS.DENIM_TEARS,
        category: CATEGORIES.TSHIRTS,
        price: 3800.00,
        originalPrice: 5000.00,
        image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
        description: 'Heavyweight cotton tee with signature cotton wreath print. African Diaspora Goods collection.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black'],
        stock: 20,
        badge: 'sale',
        featured: true
    },
    {
        id: 10,
        name: 'Essentials T-Shirt',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.TSHIRTS,
        price: 25.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop',
        description: 'Fear of God Essentials boxy fit tee with rubberized branding on chest.',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Oatmeal', 'Black', 'Sage', 'Cream'],
        stock: 50,
        badge: 'new',
        featured: true
    },
    
    // Accessories - AirPods
    {
        id: 11,
        name: 'AirPods',
        brand: BRANDS.APPLE,
        category: CATEGORIES.ACCESSORIES,
        price: 179.00,
        originalPrice: 199.00,
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
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

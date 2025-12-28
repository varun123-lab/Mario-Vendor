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
    TECH: 'Tech'
};

// Product catalog data
let products = [
    // Hoodies
    {
        id: 1,
        name: 'Classic Logo Hoodie',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.HOODIES,
        price: 189.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        description: 'Premium cotton hoodie with embroidered logo. Comfortable fit with kangaroo pocket.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Gray'],
        stock: 25,
        badge: null,
        featured: true
    },
    {
        id: 2,
        name: 'Web Print Hoodie',
        brand: BRANDS.SP5DER,
        category: CATEGORIES.HOODIES,
        price: 349.99,
        originalPrice: 399.99,
        image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&h=400&fit=crop',
        description: 'Iconic spider web print design. Heavy-weight fleece construction.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'Blue'],
        stock: 12,
        badge: 'sale',
        featured: true
    },
    {
        id: 3,
        name: 'Cotton Wreath Hoodie',
        brand: BRANDS.DENIM_TEARS,
        category: CATEGORIES.HOODIES,
        price: 295.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400&h=400&fit=crop',
        description: 'Signature cotton wreath embroidery. Premium French terry material.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Cream'],
        stock: 8,
        badge: 'new',
        featured: true
    },
    {
        id: 4,
        name: 'Fear of God Essentials Hoodie',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.HOODIES,
        price: 165.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
        description: 'Oversized fit with dropped shoulders. Rubberized logo on chest.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Oatmeal', 'Black', 'Sage'],
        stock: 30,
        badge: null,
        featured: false
    },
    {
        id: 5,
        name: 'Tech Fleece Hoodie',
        brand: BRANDS.TECH,
        category: CATEGORIES.HOODIES,
        price: 129.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1542327897-4141b355e20e?w=400&h=400&fit=crop',
        description: 'Lightweight tech fleece with moisture-wicking properties. Perfect for active lifestyle.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Gray', 'Navy'],
        stock: 20,
        badge: 'new',
        featured: true
    },
    
    // Sweaters
    {
        id: 6,
        name: 'Cable Knit Sweater',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.SWEATERS,
        price: 225.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
        description: 'Classic cable-knit pattern. 100% merino wool construction.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Cream', 'Navy', 'Hunter Green'],
        stock: 18,
        badge: null,
        featured: true
    },
    {
        id: 7,
        name: 'Web Knit Cardigan',
        brand: BRANDS.SP5DER,
        category: CATEGORIES.SWEATERS,
        price: 425.00,
        originalPrice: 475.00,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
        description: 'Heavyweight knit cardigan with spider motif buttons.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown'],
        stock: 6,
        badge: 'sale',
        featured: false
    },
    {
        id: 8,
        name: 'Heritage Crewneck',
        brand: BRANDS.DENIM_TEARS,
        category: CATEGORIES.SWEATERS,
        price: 275.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
        description: 'Cotton heritage crewneck with embroidered details.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Blue', 'White'],
        stock: 14,
        badge: null,
        featured: false
    },
    {
        id: 9,
        name: 'Essentials Knit Sweater',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.SWEATERS,
        price: 145.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=400&h=400&fit=crop',
        description: 'Relaxed fit knit sweater. Soft cotton blend fabric.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Oatmeal', 'Black', 'Dark Oatmeal'],
        stock: 22,
        badge: null,
        featured: true
    },
    
    // T-Shirts
    {
        id: 10,
        name: 'Polo Bear Tee',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.TSHIRTS,
        price: 89.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        description: 'Classic cotton tee featuring the iconic Polo Bear graphic.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy'],
        stock: 40,
        badge: null,
        featured: false
    },
    {
        id: 11,
        name: 'Spider Web Tee',
        brand: BRANDS.SP5DER,
        category: CATEGORIES.TSHIRTS,
        price: 175.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
        description: 'Premium cotton tee with all-over web print design.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Pink'],
        stock: 28,
        badge: 'new',
        featured: true
    },
    {
        id: 12,
        name: 'Cotton Wreath Tee',
        brand: BRANDS.DENIM_TEARS,
        category: CATEGORIES.TSHIRTS,
        price: 145.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
        description: 'Heavyweight cotton tee with signature cotton wreath print.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black'],
        stock: 20,
        badge: null,
        featured: false
    },
    {
        id: 13,
        name: 'Essentials Logo Tee',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.TSHIRTS,
        price: 55.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop',
        description: 'Boxy fit tee with rubberized Essentials branding.',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Oatmeal', 'Black', 'Sage', 'Cream'],
        stock: 50,
        badge: null,
        featured: true
    },
    {
        id: 14,
        name: 'Tech Performance Tee',
        brand: BRANDS.TECH,
        category: CATEGORIES.TSHIRTS,
        price: 65.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop',
        description: 'Moisture-wicking performance tee. Quick-dry fabric technology.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Gray'],
        stock: 35,
        badge: 'new',
        featured: true
    },
    
    // Accessories - AirPods & Tech
    {
        id: 15,
        name: 'AirPods Pro 2nd Gen',
        brand: BRANDS.TECH,
        category: CATEGORIES.ACCESSORIES,
        price: 249.00,
        originalPrice: null,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1660803972361',
        description: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio with dynamic head tracking.',
        sizes: ['One Size'],
        colors: ['White'],
        stock: 50,
        badge: 'new',
        featured: true
    },
    {
        id: 16,
        name: 'AirPods 3rd Gen',
        brand: BRANDS.TECH,
        category: CATEGORIES.ACCESSORIES,
        price: 179.00,
        originalPrice: 199.00,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1632861342000',
        description: 'Spatial audio with dynamic head tracking. Adaptive EQ. Sweat and water resistant.',
        sizes: ['One Size'],
        colors: ['White'],
        stock: 35,
        badge: 'sale',
        featured: true
    },
    {
        id: 17,
        name: 'AirPods Max',
        brand: BRANDS.TECH,
        category: CATEGORIES.ACCESSORIES,
        price: 549.00,
        originalPrice: null,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1604021221000',
        description: 'High-fidelity audio with custom acoustic design. Active Noise Cancellation. 20 hours battery life.',
        sizes: ['One Size'],
        colors: ['Space Gray', 'Silver', 'Green', 'Pink', 'Sky Blue'],
        stock: 15,
        badge: null,
        featured: true
    },
    {
        id: 18,
        name: 'Premium Leather AirPods Case',
        brand: BRANDS.RALPH_LAUREN,
        category: CATEGORIES.ACCESSORIES,
        price: 75.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
        description: 'Premium leather AirPods case with gold-tone hardware and signature pony logo.',
        sizes: ['AirPods Pro', 'AirPods 3'],
        colors: ['Black', 'Brown', 'Navy'],
        stock: 35,
        badge: null,
        featured: false
    },
    {
        id: 19,
        name: 'Canvas Tote Bag',
        brand: BRANDS.DENIM_TEARS,
        category: CATEGORIES.ACCESSORIES,
        price: 125.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
        description: 'Heavy canvas tote with cotton wreath embroidery.',
        sizes: ['One Size'],
        colors: ['Natural', 'Black'],
        stock: 10,
        badge: 'new',
        featured: false
    },
    {
        id: 20,
        name: 'Essentials Crossbody Bag',
        brand: BRANDS.ESSENTIALS,
        category: CATEGORIES.ACCESSORIES,
        price: 85.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
        description: 'Nylon crossbody bag with rubberized logo patch.',
        sizes: ['One Size'],
        colors: ['Black', 'Sage', 'Cream'],
        stock: 25,
        badge: null,
        featured: true
    },
    {
        id: 21,
        name: 'Tech Backpack',
        brand: BRANDS.TECH,
        category: CATEGORIES.ACCESSORIES,
        price: 149.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        description: 'Water-resistant backpack with laptop compartment and USB charging port.',
        sizes: ['One Size'],
        colors: ['Black', 'Gray'],
        stock: 18,
        badge: null,
        featured: false
    },
    {
        id: 22,
        name: 'Smart Watch Band',
        brand: BRANDS.TECH,
        category: CATEGORIES.ACCESSORIES,
        price: 49.99,
        originalPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
        description: 'Premium silicone watch band compatible with all major smartwatches.',
        sizes: ['S/M', 'M/L'],
        colors: ['Black', 'White', 'Navy', 'Red'],
        stock: 45,
        badge: 'sale',
        featured: false
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

/**
 * VENDOR DASHBOARD FUNCTIONALITY
 * Handles product and order management for vendors
 */

// Dashboard state
let editingProductId = null;
let currentTab = 'orders';

/**
 * Get all orders from localStorage
 */
function getOrders() {
    return JSON.parse(localStorage.getItem('vendor_orders') || '[]');
}

/**
 * Save orders to localStorage
 */
function saveOrders(orders) {
    localStorage.setItem('vendor_orders', JSON.stringify(orders));
}

/**
 * Update order status
 */
function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        saveOrders(orders);
        renderOrdersTable();
        updateDashboardStats();
        if (window.CartManager) {
            window.CartManager.showToast(`Order #${orderId} marked as ${newStatus}`, 'success');
        }
    }
}

/**
 * Initialize vendor dashboard
 */
function init() {
    updateDashboardStats();
    renderOrdersTable();
    renderProductTable();
    setupEventListeners();
    setupTabNavigation();
    setupImageDragDrop();
}

/**
 * Setup tab navigation
 */
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });
}

/**
 * Switch between tabs
 */
function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(`${tab}-section`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

/**
 * Update dashboard statistics
 */
function updateDashboardStats() {
    const products = window.ProductManager ? window.ProductManager.getAllProducts() : [];
    const orders = getOrders();
    
    // Total products
    const totalProductsEl = document.getElementById('total-products');
    if (totalProductsEl) {
        totalProductsEl.textContent = products.length;
    }
    
    // Total orders
    const totalOrdersEl = document.getElementById('total-orders');
    if (totalOrdersEl) {
        totalOrdersEl.textContent = orders.length;
    }
    
    // Total revenue
    const totalRevenueEl = document.getElementById('total-revenue');
    if (totalRevenueEl) {
        const revenue = orders
            .filter(o => o.status !== 'cancelled')
            .reduce((sum, o) => sum + (o.total || 0), 0);
        totalRevenueEl.textContent = '$' + revenue.toFixed(2);
    }
    
    // Pending orders
    const pendingOrdersEl = document.getElementById('pending-orders');
    if (pendingOrdersEl) {
        const pendingCount = orders.filter(o => o.status === 'pending').length;
        pendingOrdersEl.textContent = pendingCount;
    }
    
    // In stock products
    const inStockEl = document.getElementById('in-stock');
    if (inStockEl) {
        const inStockCount = products.filter(p => p.stock > 10).length;
        inStockEl.textContent = inStockCount;
    }
    
    // Low stock products (less than 10)
    const lowStockEl = document.getElementById('low-stock');
    if (lowStockEl) {
        const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length;
        lowStockEl.textContent = lowStockCount;
    }
}

/**
 * Render orders table
 */
function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-body');
    const noOrders = document.getElementById('no-orders');
    
    if (!tbody) return;
    
    const orders = getOrders();
    const filterStatus = document.getElementById('filter-order-status')?.value || '';
    
    let filteredOrders = orders;
    if (filterStatus) {
        filteredOrders = orders.filter(o => o.status === filterStatus);
    }
    
    if (filteredOrders.length === 0) {
        tbody.innerHTML = '';
        if (noOrders) noOrders.style.display = 'block';
        return;
    }
    
    if (noOrders) noOrders.style.display = 'none';
    
    tbody.innerHTML = filteredOrders.map(order => {
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        const itemCount = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        const customerName = order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'Unknown';
        
        const statusClass = {
            'pending': 'status-pending',
            'processing': 'status-processing',
            'shipped': 'status-shipped',
            'delivered': 'status-delivered',
            'cancelled': 'status-cancelled'
        }[order.status] || 'status-pending';
        
        return `
            <tr data-order-id="${order.id}">
                <td><strong>#${order.id}</strong></td>
                <td>${formattedDate}</td>
                <td>
                    <div>${customerName}</div>
                    <small style="color: var(--color-gray-500);">${order.customer?.email || ''}</small>
                </td>
                <td>${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
                <td><strong>$${(order.total || 0).toFixed(2)}</strong></td>
                <td>
                    <span class="order-status ${statusClass}">${order.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view-order" data-order-id="${order.id}" title="View Details">👁</button>
                        <select class="status-select" data-order-id="${order.id}">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    // Add event listeners for status changes
    tbody.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', function() {
            const orderId = parseInt(this.dataset.orderId);
            updateOrderStatus(orderId, this.value);
        });
    });
    
    // Add event listeners for view order
    tbody.querySelectorAll('.view-order').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.dataset.orderId);
            viewOrderDetails(orderId);
        });
    });
}

/**
 * View order details
 */
function viewOrderDetails(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const date = new Date(order.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const itemsHTML = order.items ? order.items.map(item => `
        <div class="order-detail-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <strong>${item.name}</strong>
                <div style="font-size: 0.875rem; color: var(--color-gray-500);">
                    ${item.brand} ${item.size ? '• Size: ' + item.size : ''} • Qty: ${item.quantity}
                </div>
            </div>
            <div style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('') : '';
    
    const modal = document.getElementById('order-detail-modal') || createOrderDetailModal();
    
    modal.querySelector('.modal-body').innerHTML = `
        <div class="order-detail-header">
            <div>
                <h3>Order #${order.id}</h3>
                <p style="color: var(--color-gray-500);">${formattedDate}</p>
            </div>
            <span class="order-status status-${order.status}">${order.status}</span>
        </div>
        
        <div class="order-detail-section">
            <h4>Customer Information</h4>
            <p><strong>${order.customer?.firstName} ${order.customer?.lastName}</strong></p>
            <p>${order.customer?.email}</p>
            <p>${order.customer?.phone}</p>
        </div>
        
        <div class="order-detail-section">
            <h4>Shipping Address</h4>
            <p>${order.customer?.address}</p>
            ${order.customer?.address2 ? `<p>${order.customer.address2}</p>` : ''}
            <p>${order.customer?.city}, ${order.customer?.state} ${order.customer?.zip}</p>
        </div>
        
        <div class="order-detail-section">
            <h4>Items</h4>
            <div class="order-detail-items">
                ${itemsHTML}
            </div>
        </div>
        
        <div class="order-detail-summary">
            <div class="summary-row"><span>Subtotal</span><span>$${(order.subtotal || 0).toFixed(2)}</span></div>
            <div class="summary-row"><span>Shipping</span><span>${order.shipping?.cost === 0 ? 'FREE' : '$' + (order.shipping?.cost || 0).toFixed(2)}</span></div>
            <div class="summary-row"><span>Tax</span><span>$${(order.tax || 0).toFixed(2)}</span></div>
            <div class="summary-row summary-total"><span>Total</span><span>$${(order.total || 0).toFixed(2)}</span></div>
        </div>
    `;
    
    modal.classList.add('active');
}

/**
 * Create order detail modal if it doesn't exist
 */
function createOrderDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'order-detail-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content modal-lg">
            <button class="modal-close">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.classList.remove('active'));
    modal.querySelector('.modal-backdrop').addEventListener('click', () => modal.classList.remove('active'));
    
    return modal;
}

/**
 * Render products table
 */
function renderProductTable() {
    const tbody = document.getElementById('products-table-body');
    if (!tbody || !window.ProductManager) return;
    
    const products = window.ProductManager.getAllProducts();
    const searchTerm = document.getElementById('search-products')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('filter-category')?.value || '';
    const brandFilter = document.getElementById('filter-brand')?.value || '';
    
    let filteredProducts = products;
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }
    
    if (brandFilter) {
        filteredProducts = filteredProducts.filter(p => p.brand === brandFilter);
    }
    
    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem;">
                    No products found
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredProducts.map(product => {
        let stockStatus = 'in-stock';
        let stockLabel = 'In Stock';
        
        if (product.stock === 0) {
            stockStatus = 'out-of-stock';
            stockLabel = 'Out of Stock';
        } else if (product.stock <= 10) {
            stockStatus = 'low-stock';
            stockLabel = 'Low Stock';
        }
        
        return `
            <tr data-product-id="${product.id}">
                <td>
                    <div class="product-cell">
                        <div class="product-thumb">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <span class="product-name">${product.name}</span>
                    </div>
                </td>
                <td>${product.category}</td>
                <td>${product.brand}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><span class="status-badge ${stockStatus}">${stockLabel}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-product" data-product-id="${product.id}">Edit</button>
                        <button class="action-btn delete delete-product" data-product-id="${product.id}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    // Add event listeners
    tbody.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.productId)));
    });
    
    tbody.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.productId)));
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add product button
    const addBtn = document.getElementById('add-product-btn');
    if (addBtn) {
        addBtn.addEventListener('click', openAddModal);
    }
    
    // Product form
    const form = document.getElementById('product-form');
    if (form) {
        form.addEventListener('submit', handleProductSubmit);
    }
    
    // Cancel button
    const cancelBtn = document.getElementById('cancel-product');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeProductModal);
    }
    
    // Modal close
    const modalClose = document.querySelector('#product-modal .modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }
    
    // Modal backdrop
    const modalBackdrop = document.querySelector('#product-modal .modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeProductModal);
    }
    
    // Search products
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
        searchInput.addEventListener('input', renderProductTable);
    }
    
    // Filter products
    const categoryFilter = document.getElementById('filter-category');
    const brandFilter = document.getElementById('filter-brand');
    if (categoryFilter) categoryFilter.addEventListener('change', renderProductTable);
    if (brandFilter) brandFilter.addEventListener('change', renderProductTable);
    
    // Filter orders
    const orderStatusFilter = document.getElementById('filter-order-status');
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', renderOrdersTable);
    }
}

/**
 * Open add product modal
 */
function openAddModal() {
    editingProductId = null;
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('product-form');
    
    if (title) title.textContent = 'Add New Product';
    if (form) form.reset();
    if (modal) modal.classList.add('active');
}

/**
 * Open edit product modal
 */
function openEditModal(productId) {
    editingProductId = productId;
    const product = window.ProductManager.getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    
    if (title) title.textContent = 'Edit Product';
    
    // Fill form
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-brand').value = product.brand;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-sizes').value = product.sizes?.join(', ') || '';
    document.getElementById('product-image').value = product.image;
    if (product.image) showImagePreview(product.image);
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-featured').checked = product.featured;
    
    if (modal) modal.classList.add('active');
}

/**
 * Close product modal
 */
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.remove('active');
    editingProductId = null;
    hideImagePreview();
    const fileInput = document.getElementById('product-image-file');
    if (fileInput) fileInput.value = '';
}

/**
 * Handle product form submission
 */
function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('product-name').value,
        brand: document.getElementById('product-brand').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        sizes: document.getElementById('product-sizes').value.split(',').map(s => s.trim()).filter(s => s),
        colors: ['Black', 'White'], // Default colors
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value,
        featured: document.getElementById('product-featured').checked,
        badge: null,
        originalPrice: null
    };
    
    if (editingProductId) {
        window.ProductManager.updateProduct(editingProductId, formData);
        if (window.CartManager) window.CartManager.showToast('Product updated successfully', 'success');
    } else {
        window.ProductManager.addProduct(formData);
        if (window.CartManager) window.CartManager.showToast('Product added successfully', 'success');
    }
    
    closeProductModal();
    renderProductTable();
    updateDashboardStats();
}

/**
 * Delete product
 */
function deleteProduct(productId) {
    const product = window.ProductManager.getProductById(productId);
    if (!product) return;
    
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        window.ProductManager.deleteProduct(productId);
        if (window.CartManager) window.CartManager.showToast('Product deleted', 'success');
        renderProductTable();
        updateDashboardStats();
    }
}


/**
 * Setup image drag and drop functionality
 */
function setupImageDragDrop() {
    const dropZone = document.getElementById('image-drop-zone');
    const fileInput = document.getElementById('product-image-file');
    const urlInput = document.getElementById('product-image');
    const preview = document.getElementById('image-preview');
    
    if (!dropZone || !fileInput || !preview) return;
    
    // Click to browse
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImageFile(file);
    });
    
    // Drag events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });
    
    // URL input change - show preview
    urlInput.addEventListener('input', (e) => {
        const url = e.target.value.trim();
        if (url) {
            showImagePreview(url);
        } else {
            hideImagePreview();
        }
    });
}

/**
 * Handle dropped/selected image file
 */
function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        showImagePreview(dataUrl);
        // Store the data URL in the hidden field or use it directly
        document.getElementById('product-image').value = dataUrl;
    };
    reader.readAsDataURL(file);
}

/**
 * Show image preview
 */
function showImagePreview(src) {
    const dropZone = document.getElementById('image-drop-zone');
    const preview = document.getElementById('image-preview');
    
    if (!preview || !dropZone) return;
    
    preview.src = src;
    preview.style.display = 'block';
    dropZone.classList.add('has-image');
    
    // Add remove button if not exists
    if (!dropZone.querySelector('.remove-image')) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-image';
        removeBtn.innerHTML = '×';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            hideImagePreview();
            document.getElementById('product-image').value = '';
            document.getElementById('product-image-file').value = '';
        };
        dropZone.appendChild(removeBtn);
    }
}

/**
 * Hide image preview
 */
function hideImagePreview() {
    const dropZone = document.getElementById('image-drop-zone');
    const preview = document.getElementById('image-preview');
    
    if (!preview || !dropZone) return;
    
    preview.src = '';
    preview.style.display = 'none';
    dropZone.classList.remove('has-image');
}

// Export for global access
window.VendorDashboard = {
    init,
    updateDashboardStats,
    renderOrdersTable,
    renderProductTable,
    updateOrderStatus,
    getOrders
};

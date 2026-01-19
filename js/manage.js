// Manage page functionality
let currentStatusFilter = 'all';
let currentTab = 'items';

// Categories and publication types data
let categoriesData = [
    { key: 'ai', name: 'AI Chips' },
    { key: 'processor', name: 'Processors' },
    { key: 'memory', name: 'Memory' }
];

let publicationTypesData = [
    { key: 'conference', name: 'Conference' },
    { key: 'journal', name: 'Journal' },
    { key: 'arxiv', name: 'ArXiv' }
];

// Initialize manage page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    if (!window.DDHGallery.isAuthenticated() || !isAdmin()) {
        window.location.href = 'index.html';
        return;
    }
    
    loadCategoriesAndTypes();
    initializeManagePage();
    setupManageEventListeners();
    renderCurrentTab();
});

function initializeManagePage() {
    // Update navigation state
    updateAuthState();
}

function setupManageEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Status filter buttons
    document.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
        btn.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            filterByStatus(status);
            
            // Update active filter button
            document.querySelectorAll('.filter-btn[data-status]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add category button
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', addCategory);
    }

    // Add publication type button
    const addTypeBtn = document.getElementById('add-type-btn');
    if (addTypeBtn) {
        addTypeBtn.addEventListener('click', addPublicationType);
    }
}

function filterByStatus(status) {
    currentStatusFilter = status;
    renderManageGrid();
}

function renderManageGrid() {
    const manageGrid = document.getElementById('manage-grid');
    if (!manageGrid) return;
    
    manageGrid.innerHTML = '';
    
    // Filter items based on current status filter
    let filteredItems = galleryData;
    if (currentStatusFilter !== 'all') {
        filteredItems = galleryData.filter(item => item.status === currentStatusFilter);
    }
    
    filteredItems.forEach(item => {
        const manageItem = createManageItem(item);
        manageGrid.appendChild(manageItem);
    });
    
    // Add fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.manage-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
}

function createManageItem(item) {
    const div = document.createElement('div');
    div.className = 'manage-item';
    div.setAttribute('data-id', item.id);
    div.setAttribute('data-status', item.status);
    
    // Extract first author from the author list
    const firstAuthor = getFirstAuthor(item.author);
    const authorCount = getAuthorCount(item.author);
    const authorDisplay = authorCount > 1 ? `${firstAuthor} et al.` : firstAuthor;
    
    const statusBadge = getStatusBadge(item.status);
    const typeBadge = getPublicationTypeName(item.publicationType);
    const categoryBadge = getCategoryName(item.category);
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="manage-item-image" loading="lazy">
        <div class="manage-item-content">
            <h3 class="manage-item-title">${item.title}</h3>
            <div class="manage-item-author">By ${authorDisplay}</div>
            <div class="manage-item-meta">
                <span class="status-${item.status}">${statusBadge}</span>
                <span>${typeBadge}</span>
                <span>${categoryBadge}</span>
                <span>Owner: ${item.owner}</span>
            </div>
            <div class="manage-item-actions">
                <a href="edit-item.html?id=${item.id}" class="manage-btn edit">
                    <i class="fas fa-edit"></i> Edit
                </a>
                <button class="manage-btn delete" onclick="deleteItem(${item.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    return div;
}

function getStatusBadge(status) {
    const statusNames = {
        'featured': 'Featured',
        'normal': 'Normal',
        'hidden': 'Hidden'
    };
    return statusNames[status] || status;
}

function deleteItem(itemId) {
    const item = galleryData.find(i => i.id === itemId);
    if (!item) return;
    
    if (confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) {
        // In a real application, this would make an API call
        const index = galleryData.findIndex(i => i.id === itemId);
        if (index > -1) {
            galleryData.splice(index, 1);
            
            // Save to localStorage
            localStorage.setItem('galleryData', JSON.stringify(galleryData));
            
            // Re-render the grid
            renderManageGrid();
            
            // Show success message
            window.DDHGallery.showNotification('Item deleted successfully', 'success');
        }
    }
}

// Quick status change functions
function changeItemStatus(itemId, newStatus) {
    const item = galleryData.find(i => i.id === itemId);
    if (!item) return;
    
    item.status = newStatus;
    item.updatedAt = new Date().toISOString().split('T')[0];
    
    // Save to localStorage
    localStorage.setItem('galleryData', JSON.stringify(galleryData));
    
    // Re-render the grid
    renderManageGrid();
    
    // Show success message
    window.DDHGallery.showNotification(`Item status changed to ${newStatus}`, 'success');
}

// Load categories and types from localStorage
function loadCategoriesAndTypes() {
    const savedCategories = localStorage.getItem('categoriesData');
    if (savedCategories) {
        categoriesData = JSON.parse(savedCategories);
    }
    
    const savedTypes = localStorage.getItem('publicationTypesData');
    if (savedTypes) {
        publicationTypesData = JSON.parse(savedTypes);
    }
}

// Save categories and types to localStorage
function saveCategoriesAndTypes() {
    localStorage.setItem('categoriesData', JSON.stringify(categoriesData));
    localStorage.setItem('publicationTypesData', JSON.stringify(publicationTypesData));
}

// Tab switching functionality
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    renderCurrentTab();
}

function renderCurrentTab() {
    switch (currentTab) {
        case 'items':
            renderManageGrid();
            break;
        case 'categories':
            renderCategoriesList();
            break;
        case 'types':
            renderPublicationTypesList();
            break;
    }
}

// Categories management
function renderCategoriesList() {
    const categoriesList = document.getElementById('categories-list');
    if (!categoriesList) return;
    
    categoriesList.innerHTML = '';
    
    categoriesData.forEach(category => {
        const usage = getUsageCount('category', category.key);
        const categoryItem = createManagementItem(category, usage, 'category');
        categoriesList.appendChild(categoryItem);
    });
}

function addCategory() {
    const keyInput = document.getElementById('new-category-key');
    const nameInput = document.getElementById('new-category-name');
    
    const key = keyInput.value.trim().toLowerCase();
    const name = nameInput.value.trim();
    
    if (!key || !name) {
        window.DDHGallery.showNotification('Please fill in both fields', 'error');
        return;
    }
    
    // Check if key already exists
    if (categoriesData.find(cat => cat.key === key)) {
        window.DDHGallery.showNotification('Category key already exists', 'error');
        return;
    }
    
    // Add new category
    categoriesData.push({ key, name });
    saveCategoriesAndTypes();
    
    // Clear inputs
    keyInput.value = '';
    nameInput.value = '';
    
    // Re-render
    renderCategoriesList();
    window.DDHGallery.showNotification('Category added successfully', 'success');
}

function deleteCategory(key) {
    const usage = getUsageCount('category', key);
    if (usage > 0) {
        window.DDHGallery.showNotification(`Cannot delete category. ${usage} items are using it.`, 'error');
        return;
    }
    
    const category = categoriesData.find(cat => cat.key === key);
    if (!category) return;
    
    if (confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
        categoriesData = categoriesData.filter(cat => cat.key !== key);
        saveCategoriesAndTypes();
        renderCategoriesList();
        window.DDHGallery.showNotification('Category deleted successfully', 'success');
    }
}

// Publication types management
function renderPublicationTypesList() {
    const typesList = document.getElementById('types-list');
    if (!typesList) return;
    
    typesList.innerHTML = '';
    
    publicationTypesData.forEach(type => {
        const usage = getUsageCount('publicationType', type.key);
        const typeItem = createManagementItem(type, usage, 'type');
        typesList.appendChild(typeItem);
    });
}

function addPublicationType() {
    const keyInput = document.getElementById('new-type-key');
    const nameInput = document.getElementById('new-type-name');
    
    const key = keyInput.value.trim().toLowerCase();
    const name = nameInput.value.trim();
    
    if (!key || !name) {
        window.DDHGallery.showNotification('Please fill in both fields', 'error');
        return;
    }
    
    // Check if key already exists
    if (publicationTypesData.find(type => type.key === key)) {
        window.DDHGallery.showNotification('Publication type key already exists', 'error');
        return;
    }
    
    // Add new type
    publicationTypesData.push({ key, name });
    saveCategoriesAndTypes();
    
    // Clear inputs
    keyInput.value = '';
    nameInput.value = '';
    
    // Re-render
    renderPublicationTypesList();
    window.DDHGallery.showNotification('Publication type added successfully', 'success');
}

function deletePublicationType(key) {
    const usage = getUsageCount('publicationType', key);
    if (usage > 0) {
        window.DDHGallery.showNotification(`Cannot delete publication type. ${usage} items are using it.`, 'error');
        return;
    }
    
    const type = publicationTypesData.find(t => t.key === key);
    if (!type) return;
    
    if (confirm(`Are you sure you want to delete the publication type "${type.name}"?`)) {
        publicationTypesData = publicationTypesData.filter(t => t.key !== key);
        saveCategoriesAndTypes();
        renderPublicationTypesList();
        window.DDHGallery.showNotification('Publication type deleted successfully', 'success');
    }
}

// Helper functions
function getUsageCount(field, value) {
    return galleryData.filter(item => item[field] === value).length;
}

function createManagementItem(item, usage, type) {
    const div = document.createElement('div');
    div.className = 'management-item';
    
    const canDelete = usage === 0;
    
    div.innerHTML = `
        <div class="management-item-info">
            <div class="management-item-key">${item.key}</div>
            <div class="management-item-name">${item.name}</div>
            <div class="management-item-usage">${usage} items using this ${type}</div>
        </div>
        <div class="management-item-actions">
            <button class="btn-small btn-danger"
                    onclick="${type === 'category' ? 'deleteCategory' : 'deletePublicationType'}('${item.key}')"
                    ${!canDelete ? 'disabled' : ''}>
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return div;
}

// Helper function to extract the first author from author list
function getFirstAuthor(authorString) {
    if (!authorString) return '';
    
    // Split by common delimiters (comma, semicolon, 'and', '&')
    const authors = authorString.split(/[,;]|(?:\s+and\s+)|(?:\s*&\s*)/)
        .map(author => author.trim())
        .filter(author => author.length > 0);
    
    return authors.length > 0 ? authors[0] : authorString;
}

// Helper function to count the number of authors
function getAuthorCount(authorString) {
    if (!authorString) return 0;
    
    // Split by common delimiters (comma, semicolon, 'and', '&')
    const authors = authorString.split(/[,;]|(?:\s+and\s+)|(?:\s*&\s*)/)
        .map(author => author.trim())
        .filter(author => author.length > 0);
    
    return authors.length;
}

// Export functions for global access
window.ManagePage = {
    deleteItem,
    changeItemStatus,
    renderManageGrid,
    deleteCategory,
    deletePublicationType
};
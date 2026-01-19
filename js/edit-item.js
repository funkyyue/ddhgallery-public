// Edit item page functionality
let currentItem = null;
let itemId = null;

// Initialize edit page
document.addEventListener('DOMContentLoaded', function() {
    // Get item ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    itemId = parseInt(urlParams.get('id'));
    
    if (!itemId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Check authentication and permissions
    if (!window.DDHGallery.isAuthenticated()) {
        window.location.href = 'index.html?signin=true';
        return;
    }
    
    // Find the item
    currentItem = galleryData.find(item => item.id === itemId);
    if (!currentItem) {
        window.DDHGallery.showNotification('Item not found', 'error');
        window.location.href = 'index.html';
        return;
    }
    
    // Check if user can edit this item
    if (!canUserEditItem(currentItem)) {
        window.DDHGallery.showNotification('You do not have permission to edit this item', 'error');
        window.location.href = 'index.html';
        return;
    }
    
    initializeEditPage();
    setupEditEventListeners();
    populateForm();
});

function initializeEditPage() {
    // Update navigation state
    updateAuthState();
    
    // Show/hide status section based on admin privileges
    const statusSection = document.getElementById('status-section');
    if (statusSection) {
        if (isAdmin()) {
            statusSection.style.display = 'block';
        } else {
            statusSection.style.display = 'none';
        }
    }
}

function setupEditEventListeners() {
    // Form submission
    const editForm = document.getElementById('edit-form');
    if (editForm) {
        editForm.addEventListener('submit', handleEditSubmit);
    }
}

function populateForm() {
    if (!currentItem) return;
    
    // Populate form fields
    document.getElementById('item-id').value = currentItem.id;
    document.getElementById('title').value = currentItem.title;
    document.getElementById('author').value = currentItem.author;
    document.getElementById('description').value = currentItem.description;
    document.getElementById('image').value = currentItem.image;
    document.getElementById('publicationLink').value = currentItem.publicationLink;
    document.getElementById('publicationType').value = currentItem.publicationType;
    document.getElementById('category').value = currentItem.category;
    
    // Set status radio button (if admin)
    if (isAdmin()) {
        const statusRadio = document.querySelector(`input[name="status"][value="${currentItem.status}"]`);
        if (statusRadio) {
            statusRadio.checked = true;
        }
    }
}

function handleEditSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['title', 'author', 'description', 'image', 'publicationLink', 'publicationType', 'category'];
    for (const field of requiredFields) {
        if (!formData.get(field)) {
            window.DDHGallery.showNotification(`Please fill in the ${field} field`, 'error');
            return;
        }
    }
    
    // Show loading
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        try {
            // Update the item
            const updatedItem = {
                ...currentItem,
                title: formData.get('title'),
                author: formData.get('author'),
                description: formData.get('description'),
                image: formData.get('image'),
                publicationLink: formData.get('publicationLink'),
                publicationType: formData.get('publicationType'),
                category: formData.get('category'),
                updatedAt: new Date().toISOString().split('T')[0]
            };
            
            // Update status if admin
            if (isAdmin() && formData.get('status')) {
                updatedItem.status = formData.get('status');
            }
            
            // Find and update the item in galleryData
            const itemIndex = galleryData.findIndex(item => item.id === itemId);
            if (itemIndex > -1) {
                galleryData[itemIndex] = updatedItem;
                
                // Save to localStorage
                localStorage.setItem('galleryData', JSON.stringify(galleryData));
                
                hideLoading();
                window.DDHGallery.showNotification('Item updated successfully!', 'success');
                
                // Redirect after a short delay
                setTimeout(() => {
                    if (isAdmin()) {
                        window.location.href = 'manage.html';
                    } else {
                        window.location.href = 'profile.html';
                    }
                }, 1500);
            } else {
                throw new Error('Item not found');
            }
        } catch (error) {
            hideLoading();
            window.DDHGallery.showNotification('Error updating item: ' + error.message, 'error');
        }
    }, 1000);
}

function showLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Saving...';
    }
}

function hideLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    }
}

// Export functions for global access
window.EditItemPage = {
    handleEditSubmit,
    populateForm
};
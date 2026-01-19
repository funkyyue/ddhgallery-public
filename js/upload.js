// Upload page JavaScript functionality

// Upload form state
let selectedFile = null;
let isUploading = false;

// Initialize upload page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isAuthenticated) {
        // Redirect to home page and trigger sign-in modal
        window.location.href = 'index.html?signin=true';
        return;
    }

    initializeUpload();
    setupUploadEventListeners();
    updateNavigationState();
});

function initializeUpload() {
    // Pre-fill author field with current user name
    if (currentUser && currentUser.name) {
        const authorField = document.getElementById('item-author');
        if (authorField) {
            authorField.value = currentUser.name;
        }
    }
}

function setupUploadEventListeners() {
    // Upload form submission
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUploadSubmit);
    }

    // File upload area
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('chip-image');
    
    if (uploadArea && fileInput) {
        // Click to upload
        uploadArea.addEventListener('click', () => {
            if (!selectedFile) {
                fileInput.click();
            }
        });

        // File input change
        fileInput.addEventListener('change', handleFileSelect);

        // Drag and drop
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
    }

    // Remove image button
    const removeImageBtn = document.getElementById('remove-image');
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', removeSelectedImage);
    }

    // Cancel button
    const cancelBtn = document.getElementById('cancel-upload');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }

    // User dropdown functionality
    const userDropdownBtn = document.getElementById('user-dropdown-btn');
    if (userDropdownBtn) {
        userDropdownBtn.addEventListener('click', toggleUserDropdown);
    }

    // Sign out functionality
    const signoutLink = document.getElementById('signout-link');
    if (signoutLink) {
        signoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
            window.location.href = 'index.html';
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const userMenu = document.getElementById('user-menu');
        const userDropdownMenu = document.getElementById('user-dropdown-menu');
        if (userDropdownMenu && userMenu && !userMenu.contains(e.target)) {
            userDropdownMenu.classList.remove('show');
        }
    });
}

function handleUploadSubmit(e) {
    e.preventDefault();
    
    if (isUploading) return;
    
    // Get form data
    const formData = new FormData(e.target);
    const uploadData = {
        title: formData.get('title').trim(),
        correspondingAuthor: formData.get('correspondingAuthor').trim(),
        description: formData.get('description').trim(),
        fullAuthorList: formData.get('fullAuthorList').trim(),
        publicationType: formData.get('publicationType'),
        publicationYear: parseInt(formData.get('publicationYear')),
        publicationLink: formData.get('publicationLink').trim(),
        publicationTitle: formData.get('publicationTitle').trim(),
        featured: formData.get('featured') === 'on',
        chipImage: selectedFile
    };
    
    // Validate required fields
    if (!uploadData.title) {
        showNotification('Title is required', 'error');
        return;
    }
    
    if (!uploadData.correspondingAuthor) {
        showNotification('Corresponding author is required', 'error');
        return;
    }
    
    if (!uploadData.publicationType) {
        showNotification('Publication type is required', 'error');
        return;
    }
    
    if (!uploadData.publicationLink) {
        showNotification('Publication link is required', 'error');
        return;
    }
    
    if (!uploadData.publicationYear || uploadData.publicationYear < 1900) {
        showNotification('Valid publication year is required', 'error');
        return;
    }
    
    // Start upload process
    startUpload(uploadData);
}

function startUpload(uploadData) {
    isUploading = true;
    
    // Update submit button
    const submitBtn = document.getElementById('submit-upload');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Uploading...';
    }
    
    // Simulate upload process
    setTimeout(() => {
        processUpload(uploadData);
    }, 2000);
}

function processUpload(uploadData) {
    try {
        // Create new gallery item
        const newItem = {
            id: Date.now(), // Simple ID generation
            title: uploadData.title,
            author: uploadData.fullAuthorList || uploadData.correspondingAuthor, // Use full author list as primary author field
            description: uploadData.description,
            image: selectedFile ? URL.createObjectURL(selectedFile) : generatePlaceholderImage(uploadData.title),
            publicationLink: uploadData.publicationLink,
            category: getCategoryFromType(uploadData.publicationType),
            publicationType: uploadData.publicationType,
            publicationYear: uploadData.publicationYear,
            publicationTitle: uploadData.publicationTitle,
            fullAuthorList: uploadData.fullAuthorList,
            correspondingAuthor: uploadData.correspondingAuthor,
            status: 'hidden', // All new uploads are hidden by default and require admin approval
            owner: currentUser.email,
            uploadedBy: currentUser.email,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };
        
        // Add to main gallery data (for display)
        galleryData.push(newItem);
        localStorage.setItem('galleryData', JSON.stringify(galleryData));
        
        // Add to user's gallery items
        let userItems = JSON.parse(localStorage.getItem('userGalleryItems') || '[]');
        userItems.push(newItem);
        localStorage.setItem('userGalleryItems', JSON.stringify(userItems));
        
        // Show success
        showUploadSuccess();
        
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('Upload failed. Please try again.', 'error');
        resetUploadButton();
    }
}

function showUploadSuccess() {
    const formContainer = document.getElementById('upload-form-container');
    const successMessage = document.getElementById('success-message');
    
    if (formContainer) formContainer.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetUploadButton() {
    isUploading = false;
    const submitBtn = document.getElementById('submit-upload');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Gallery Item';
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processSelectedFile(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processSelectedFile(files[0]);
    }
}

function processSelectedFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file', 'error');
        return;
    }
    
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        showNotification('File size must be less than 10MB', 'error');
        return;
    }
    
    selectedFile = file;
    showImagePreview(file);
}

function showImagePreview(file) {
    const uploadContent = document.getElementById('upload-content');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const fileName = document.getElementById('file-name');
    
    if (uploadContent) uploadContent.style.display = 'none';
    if (imagePreview) imagePreview.style.display = 'flex';
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = function(e) {
        if (previewImg) previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    if (fileName) {
        fileName.textContent = `${file.name} (${formatFileSize(file.size)})`;
    }
}

function removeSelectedImage() {
    selectedFile = null;
    
    const uploadContent = document.getElementById('upload-content');
    const imagePreview = document.getElementById('image-preview');
    const fileInput = document.getElementById('chip-image');
    
    if (uploadContent) uploadContent.style.display = 'block';
    if (imagePreview) imagePreview.style.display = 'none';
    if (fileInput) fileInput.value = '';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getCategoryFromType(publicationType) {
    // Map publication types to gallery categories
    const typeMap = {
        'conference': 'processor',
        'journal': 'memory',
        'arxiv': 'ai'
    };
    return typeMap[publicationType] || 'processor';
}

function generatePlaceholderImage(title) {
    // Generate a placeholder image URL based on title
    const colors = ['3b82f6', '10b981', 'f59e0b', '8b5cf6', 'ef4444', '06b6d4'];
    const color = colors[title.length % colors.length];
    const encodedTitle = encodeURIComponent(title.substring(0, 20));
    return `https://via.placeholder.com/400x250/${color}/ffffff?text=${encodedTitle}`;
}

function isUserAdmin() {
    return currentUser && (currentUser.role === 'admin' || currentUser.email === 'admin@ddhgallery.com');
}

function updateNavigationState() {
    // Update navigation user name
    const userName = document.getElementById('user-name');
    if (userName && currentUser) {
        userName.textContent = `Welcome, ${currentUser.name || currentUser.email.split('@')[0]}`;
    }
    
    // Show user menu, hide auth link
    const userMenu = document.getElementById('user-menu');
    const authLink = document.getElementById('auth-link');
    
    if (userMenu) userMenu.style.display = 'block';
    if (authLink) authLink.style.display = 'none';
}

function toggleUserDropdown() {
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    if (userDropdownMenu) {
        userDropdownMenu.classList.toggle('show');
    }
}

// Export functions for global access
window.UploadPage = {
    handleUploadSubmit,
    processSelectedFile,
    removeSelectedImage,
    updateNavigationState
};
// Profile page JavaScript functionality

// Profile data structure
let userProfile = {
    name: '',
    email: '',
    affiliation: '',
    bio: '',
    role: 'user',
    createdAt: new Date().toISOString(),
    galleryItems: []
};

// Profile editing state
let isEditingProfile = false;

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isAuthenticated) {
        window.location.href = 'index.html';
        return;
    }

    initializeProfile();
    setupProfileEventListeners();
    loadUserProfile();
    loadUserGalleryItems();
    updateProfileStats();
});

function initializeProfile() {
    // Load user data from current user
    if (currentUser) {
        userProfile.name = currentUser.name || '';
        userProfile.email = currentUser.email || '';
        
        // Load additional profile data from localStorage if available
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            try {
                const parsed = JSON.parse(savedProfile);
                userProfile = { ...userProfile, ...parsed };
            } catch (e) {
                console.error('Error loading profile data:', e);
            }
        }
    }
}

function setupProfileEventListeners() {
    // Edit profile button
    const editBtn = document.getElementById('edit-profile-btn');
    if (editBtn) {
        editBtn.addEventListener('click', toggleProfileEdit);
    }

    // Save profile button
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProfile);
    }

    // Cancel profile button
    const cancelBtn = document.getElementById('cancel-profile-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelProfileEdit);
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

    // User dropdown functionality
    const userDropdownBtn = document.getElementById('user-dropdown-btn');
    if (userDropdownBtn) {
        userDropdownBtn.addEventListener('click', toggleUserDropdown);
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

function loadUserProfile() {
    // Populate form fields
    document.getElementById('profile-name').value = userProfile.name || '';
    document.getElementById('profile-email').value = userProfile.email || '';
    document.getElementById('profile-affiliation').value = userProfile.affiliation || '';
    document.getElementById('profile-bio').value = userProfile.bio || '';
    
    // Update meta information
    const memberSince = document.getElementById('member-since');
    if (memberSince) {
        const date = new Date(userProfile.createdAt);
        memberSince.textContent = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
    }
    
    const userRole = document.getElementById('user-role');
    if (userRole) {
        userRole.textContent = userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1);
    }

    // Update navigation user name
    const userName = document.getElementById('user-name');
    if (userName) {
        userName.textContent = `Welcome, ${userProfile.name || userProfile.email.split('@')[0]}`;
    }
}

function toggleProfileEdit() {
    isEditingProfile = !isEditingProfile;
    
    const fields = ['profile-name', 'profile-email', 'profile-affiliation', 'profile-bio'];
    const editBtn = document.getElementById('edit-profile-btn');
    const actions = document.getElementById('profile-actions');
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.readOnly = !isEditingProfile;
            if (fieldId === 'profile-email') {
                field.readOnly = true; // Email should not be editable
            }
        }
    });
    
    if (editBtn) {
        editBtn.style.display = isEditingProfile ? 'none' : 'flex';
    }
    
    if (actions) {
        actions.style.display = isEditingProfile ? 'flex' : 'none';
    }
}

function saveProfile() {
    // Get form values
    const name = document.getElementById('profile-name').value.trim();
    const affiliation = document.getElementById('profile-affiliation').value.trim();
    const bio = document.getElementById('profile-bio').value.trim();
    
    // Validate required fields
    if (!name) {
        showNotification('Name is required', 'error');
        return;
    }
    
    // Update profile data
    userProfile.name = name;
    userProfile.affiliation = affiliation;
    userProfile.bio = bio;
    
    // Update current user
    if (currentUser) {
        currentUser.name = name;
        saveUserState(); // Save to localStorage
    }
    
    // Save profile data
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Exit edit mode
    toggleProfileEdit();
    
    // Show success message
    showNotification('Profile updated successfully!', 'success');
    
    // Update navigation
    loadUserProfile();
}

function cancelProfileEdit() {
    // Reload original values
    loadUserProfile();
    
    // Exit edit mode
    toggleProfileEdit();
}

function loadUserGalleryItems() {
    // Load user's gallery items from localStorage
    const savedItems = localStorage.getItem('userGalleryItems');
    let userItems = [];
    
    if (savedItems) {
        try {
            userItems = JSON.parse(savedItems);
        } catch (e) {
            console.error('Error loading user gallery items:', e);
        }
    }
    
    userProfile.galleryItems = userItems;
    displayUserGalleryItems(userItems);
}

function displayUserGalleryItems(items) {
    const galleryContainer = document.getElementById('user-gallery');
    if (!galleryContainer) return;
    
    if (!items || items.length === 0) {
        galleryContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <h3>No gallery items yet</h3>
                <p>Start by uploading your first chip design!</p>
                <a href="upload.html" class="btn btn-primary">
                    <i class="fas fa-upload"></i> Upload Item
                </a>
            </div>
        `;
        return;
    }
    
    const itemsHtml = items.map(item => `
        <div class="gallery-item-row">
            <img src="${item.image || 'https://via.placeholder.com/80x60/3b82f6/ffffff?text=Chip'}" 
                 alt="${item.title}" class="item-image">
            <div class="item-info">
                <div class="item-title">
                    ${item.title}
                    ${item.featured ? '<i class="fas fa-star featured-star"></i>' : ''}
                </div>
                <div class="item-description">${item.description}</div>
                <div class="item-meta">
                    <span class="item-badge">${item.publicationType.toUpperCase()}</span>
                    <span class="item-year">${item.publicationYear}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    galleryContainer.innerHTML = itemsHtml;
}

function updateProfileStats() {
    const items = userProfile.galleryItems || [];
    
    // Calculate stats
    const totalItems = items.length;
    const featuredItems = items.filter(item => item.featured).length;
    const doiPapers = items.filter(item => item.publicationType === 'doi').length;
    const arxivPapers = items.filter(item => item.publicationType === 'arxiv').length;
    
    // Update DOM
    const totalEl = document.getElementById('total-items');
    const featuredEl = document.getElementById('featured-items');
    const doiEl = document.getElementById('doi-papers');
    const arxivEl = document.getElementById('arxiv-papers');
    
    if (totalEl) totalEl.textContent = totalItems;
    if (featuredEl) featuredEl.textContent = featuredItems;
    if (doiEl) doiEl.textContent = doiPapers;
    if (arxivEl) arxivEl.textContent = arxivPapers;
}

function toggleUserDropdown() {
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    if (userDropdownMenu) {
        userDropdownMenu.classList.toggle('show');
    }
}

// Navigation functions for main.js compatibility
function showProfilePage() {
    window.location.href = 'profile.html';
}

function showUploadPage() {
    window.location.href = 'upload.html';
}

// Export functions for global access
window.ProfilePage = {
    loadUserProfile,
    updateProfileStats,
    showProfilePage,
    showUploadPage
};
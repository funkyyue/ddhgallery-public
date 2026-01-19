
// Gallery data - This would normally come from a database
const galleryData = [
    {
        id: 1,
        title: "Advanced Neural Processing Unit",
        author: "Dr. Sarah Chen, Prof. Michael Johnson, Dr. Lisa Wang",
        description: "Revolutionary NPU design for edge AI applications with 50% improved efficiency over previous generations.",
        image: "https://via.placeholder.com/400x250/3b82f6/ffffff?text=Neural+Processing+Unit",
        publicationLink: "https://example.com/paper1",
        publicationType: "conference",
        category: "ai",
        status: "featured",
        owner: "sarah.chen@university.edu",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15"
    },
    {
        id: 2,
        title: "High-Performance Memory Controller",
        author: "Prof. Michael Rodriguez, Dr. Anna Smith",
        description: "Next-generation memory controller architecture supporting DDR5 with advanced error correction.",
        image: "https://via.placeholder.com/400x250/10b981/ffffff?text=Memory+Controller",
        publicationLink: "https://example.com/paper2",
        publicationType: "journal",
        category: "memory",
        status: "normal",
        owner: "michael.rodriguez@university.edu",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-10"
    },
    {
        id: 3,
        title: "Multi-Core Processor Architecture",
        author: "Dr. Emily Watson, Prof. John Davis, Dr. Robert Chen",
        description: "Innovative 16-core processor design with dynamic frequency scaling and thermal management.",
        image: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Multi-Core+Processor",
        publicationLink: "https://example.com/paper3",
        publicationType: "conference",
        category: "processor",
        status: "normal",
        owner: "emily.watson@university.edu",
        createdAt: "2024-01-08",
        updatedAt: "2024-01-08"
    },
    {
        id: 4,
        title: "Quantum-Inspired Computing Chip",
        author: "Dr. James Liu, Dr. Maria Garcia",
        description: "Breakthrough quantum-inspired architecture for solving complex optimization problems.",
        image: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Quantum+Chip",
        publicationLink: "https://example.com/paper4",
        publicationType: "arxiv",
        category: "ai",
        status: "featured",
        owner: "james.liu@university.edu",
        createdAt: "2024-01-05",
        updatedAt: "2024-01-05"
    },
    {
        id: 5,
        title: "Low-Power IoT Processor",
        author: "Dr. Anna Kowalski, Prof. David Kim, Dr. Sarah Thompson",
        description: "Ultra-low power consumption processor designed specifically for IoT edge devices.",
        image: "https://via.placeholder.com/400x250/ef4444/ffffff?text=IoT+Processor",
        publicationLink: "https://example.com/paper5",
        publicationType: "journal",
        category: "processor",
        status: "normal",
        owner: "anna.kowalski@university.edu",
        createdAt: "2024-01-03",
        updatedAt: "2024-01-03"
    },
    {
        id: 6,
        title: "3D Stacked Memory Design",
        author: "Prof. David Kim, Dr. Lisa Chen, Dr. Mark Wilson",
        description: "Revolutionary 3D memory stacking technology achieving 10x density improvement.",
        image: "https://via.placeholder.com/400x250/06b6d4/ffffff?text=3D+Memory",
        publicationLink: "https://example.com/paper6",
        publicationType: "arxiv",
        category: "memory",
        status: "hidden",
        owner: "david.kim@university.edu",
        createdAt: "2023-12-28",
        updatedAt: "2023-12-28"
    },
    {
        id: 7,
        title: "Neuromorphic Computing Architecture",
        author: "Dr. Rachel Adams, Prof. Thomas Lee",
        description: "Brain-inspired computing architecture for ultra-low power AI inference applications.",
        image: "https://via.placeholder.com/400x250/9333ea/ffffff?text=Neuromorphic+Chip",
        publicationLink: "https://example.com/paper7",
        publicationType: "conference",
        category: "ai",
        status: "normal",
        owner: "rachel.adams@university.edu",
        createdAt: "2023-12-25",
        updatedAt: "2023-12-25"
    },
    {
        id: 8,
        title: "Secure Cryptographic Processor",
        author: "Prof. Alan Martinez, Dr. Jennifer Brown, Dr. Kevin Zhang",
        description: "Hardware-accelerated cryptographic processor with quantum-resistant security features.",
        image: "https://via.placeholder.com/400x250/f97316/ffffff?text=Crypto+Processor",
        publicationLink: "https://example.com/paper8",
        publicationType: "journal",
        category: "processor",
        status: "normal",
        owner: "alan.martinez@university.edu",
        createdAt: "2023-12-20",
        updatedAt: "2023-12-20"
    }
];

// Admin users list - Note: This is for demo purposes only
// In a real application, authentication should be handled server-side
const adminUsers = ['admin@example.com'];

// User authentication state
let currentUser = null;
let isAuthenticated = false;

// Search and filter state
let currentSearchQuery = '';
let currentFilter = 'all';

// Load gallery data from localStorage if available
function loadGalleryData() {
    const savedData = localStorage.getItem('galleryData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            // Merge with default data, keeping localStorage version
            galleryData.length = 0;
            galleryData.push(...parsedData);
        } catch (error) {
            console.error('Error loading gallery data from localStorage:', error);
        }
    }
}

// DOM elements
let galleryGrid;
let authModal;
let authLink;
let navToggle;
let navMenu;
let userMenu;
let userDropdownBtn;
let userDropdownMenu;
let userName;
let profileLink;
let uploadLink;
let signoutLink;
let uploadNavLink;
let searchInput;
let typeFilter;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryData();
    initializeElements();
    setupEventListeners();
    renderGallery();
    checkAuthState();
    checkURLParameters();
});

function initializeElements() {
    galleryGrid = document.getElementById('gallery-grid');
    authModal = document.getElementById('auth-modal');
    authLink = document.getElementById('auth-link');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    userMenu = document.getElementById('user-menu');
    userDropdownBtn = document.getElementById('user-dropdown-btn');
    userDropdownMenu = document.getElementById('user-dropdown-menu');
    userName = document.getElementById('user-name');
    profileLink = document.getElementById('profile-link');
    uploadLink = document.getElementById('upload-link');
    signoutLink = document.getElementById('signout-link');
    uploadNavLink = document.getElementById('upload-nav-link');
    searchInput = document.getElementById('search-input');
    typeFilter = document.getElementById('type-filter');
}

function setupEventListeners() {
    // Navigation toggle for mobile
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Gallery filters (old filter buttons)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterGallery(filter);
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchQuery = this.value;
            performSearchAndFilter();
        });
    }

    // Type filter dropdown
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            currentFilter = this.value;
            performSearchAndFilter();
        });
    }

    // Auth modal
    if (authLink) {
        authLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (isAuthenticated) {
                logout();
            } else {
                showAuthModal();
            }
        });
    }

    // Modal close
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideAuthModal);
    }

    // Click outside modal to close
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });
    }

    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchAuthTab(tabName);
        });
    });

    // Auth forms
    document.querySelectorAll('.auth-form form').forEach(form => {
        form.addEventListener('submit', handleAuthSubmit);
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // User dropdown menu
    if (userDropdownBtn) {
        userDropdownBtn.addEventListener('click', toggleUserDropdown);
    }

    // Profile link
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            showProfilePage();
        });
    }

    // Upload link
    if (uploadLink) {
        uploadLink.addEventListener('click', function(e) {
            e.preventDefault();
            showUploadPage();
        });
    }

    // Sign out link
    if (signoutLink) {
        signoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    // Upload navigation link
    if (uploadNavLink) {
        uploadNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleUploadNavClick();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdownMenu && !userMenu.contains(e.target)) {
            userDropdownMenu.classList.remove('show');
        }
    });
}

function toggleMobileNav() {
    navMenu.classList.toggle('active');
}

function renderGallery(items = galleryData) {
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';
    
    // Filter out hidden items unless user is admin
    const visibleItems = items.filter(item => {
        if (item.status === 'hidden') {
            return isAdmin();
        }
        return true;
    });
    
    visibleItems.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });

    // Add fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-category', item.category);
    div.setAttribute('data-id', item.id);
    
    // Add status class for styling
    if (item.status === 'featured') {
        div.classList.add('featured-item');
    } else if (item.status === 'hidden') {
        div.classList.add('hidden-item');
    }
    
    // Extract first author from the author list
    const firstAuthor = getFirstAuthor(item.author);
    const authorCount = getAuthorCount(item.author);
    const authorDisplay = authorCount > 1 ? `${firstAuthor} et al.` : firstAuthor;
    
    const canEdit = canUserEditItem(item);
    const editButton = canEdit ? `
        <button class="edit-item-btn" onclick="editGalleryItem(${item.id})">
            <i class="fas fa-edit"></i> Edit
        </button>
    ` : '';
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-content">
            <h3>${item.title}</h3>
            <div class="author">By ${authorDisplay}</div>
            <div class="description">${item.description}</div>
            <a href="${item.publicationLink}" class="publication-link" target="_blank" rel="noopener">
                View Publication <i class="fas fa-external-link-alt"></i>
            </a>
            <div class="publication-info">
                <span class="publication-type">${getPublicationTypeName(item.publicationType)}</span>
                <span class="category">${getCategoryName(item.category)}</span>
                ${item.status === 'featured' ? '<span class="status-badge featured">Featured</span>' : ''}
                ${item.status === 'hidden' ? '<span class="status-badge hidden">Hidden</span>' : ''}
            </div>
            ${editButton}
        </div>
    `;
    
    return div;
}

function getCategoryName(category) {
    // Load categories from localStorage if available
    const savedCategories = localStorage.getItem('categoriesData');
    if (savedCategories) {
        try {
            const categoriesData = JSON.parse(savedCategories);
            const categoryObj = categoriesData.find(cat => cat.key === category);
            if (categoryObj) return categoryObj.name;
        } catch (error) {
            console.error('Error loading categories from localStorage:', error);
        }
    }
    
    // Fallback to default categories
    const categoryNames = {
        'ai': 'AI Chips',
        'processor': 'Processors',
        'memory': 'Memory'
    };
    return categoryNames[category] || category;
}

function getPublicationTypeName(type) {
    // Load publication types from localStorage if available
    const savedTypes = localStorage.getItem('publicationTypesData');
    if (savedTypes) {
        try {
            const typesData = JSON.parse(savedTypes);
            const typeObj = typesData.find(t => t.key === type);
            if (typeObj) return typeObj.name;
        } catch (error) {
            console.error('Error loading publication types from localStorage:', error);
        }
    }
    
    // Fallback to default types
    const typeNames = {
        'conference': 'Conference',
        'journal': 'Journal',
        'arxiv': 'ArXiv'
    };
    return typeNames[type] || type;
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

function filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('fade-in'), 50);
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

function showAuthModal() {
    if (authModal) {
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideAuthModal() {
    if (authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchAuthTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update form visibility
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tabName}-form`).classList.add('active');
}

function handleAuthSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const isSignUp = form.closest('#signup-form') !== null;
    
    // Simulate authentication
    if (isSignUp) {
        simulateSignUp(formData);
    } else {
        simulateSignIn(formData);
    }
}

function simulateSignIn(formData) {
    // Get email and password from form data or directly from the form
    let email = formData.get('email');
    let password = formData.get('password');
    
    if (!email) {
        const emailInput = document.querySelector('#signin-form input[type="email"]');
        email = emailInput ? emailInput.value : '';
    }
    
    if (!password) {
        const passwordInput = document.querySelector('#signin-form input[type="password"]');
        password = passwordInput ? passwordInput.value : '';
    }
    
    // Validate email and password
    if (!email || !password) {
        showNotification('Please enter both email and password', 'error');
        return;
    }
    
    // For demo purposes, accept any valid email format with any password
    // Note: In a real application, this should be handled server-side with proper security
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        simulateSuccessfulLogin(email, email.split('@')[0]);
    } else {
        showNotification('Invalid email format', 'error');
    }
}

function simulateSuccessfulLogin(email, name) {
    // Simulate loading
    showLoading();
    
    setTimeout(() => {
        // Simulate successful login
        currentUser = {
            email: email,
            name: name
        };
        isAuthenticated = true;
        
        // Save to localStorage
        saveUserState();
        
        updateAuthState();
        hideAuthModal();
        hideLoading();
        showNotification('Successfully signed in!', 'success');
    }, 1500);
}

function simulateSignUp(formData) {
    // Get form data
    let email = formData.get('email');
    let name = formData.get('name');
    
    if (!email) {
        const emailInput = document.querySelector('#signup-form input[type="email"]');
        email = emailInput ? emailInput.value : '';
    }
    
    if (!name) {
        const nameInput = document.querySelector('#signup-form input[type="text"]');
        name = nameInput ? nameInput.value : '';
    }
    
    // Validate required fields
    if (!email || !name) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate loading
    showLoading();
    
    setTimeout(() => {
        // Simulate successful signup
        currentUser = {
            email: email,
            name: name
        };
        isAuthenticated = true;
        
        // Save to localStorage
        saveUserState();
        
        updateAuthState();
        hideAuthModal();
        hideLoading();
        showNotification('Account created successfully!', 'success');
    }, 1500);
}

function logout() {
    currentUser = null;
    isAuthenticated = false;
    
    // Clear localStorage
    saveUserState();
    
    updateAuthState();
    showNotification('Successfully signed out!', 'info');
}

function updateAuthState() {
    if (isAuthenticated && currentUser) {
        // Hide sign in link and show user menu
        if (authLink) authLink.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (userName) userName.textContent = `Welcome, ${currentUser.name}`;
        
        // Show/hide admin features
        updateAdminFeatures();
    } else {
        // Show sign in link and hide user menu
        if (authLink) {
            authLink.style.display = 'block';
            authLink.textContent = 'Sign In';
        }
        if (userMenu) userMenu.style.display = 'none';
        
        // Hide admin features
        hideAdminFeatures();
    }
}

function toggleUserDropdown() {
    if (userDropdownMenu) {
        userDropdownMenu.classList.toggle('show');
    }
}

function checkAuthState() {
    // Check if user was previously logged in (in a real app, this would check localStorage or cookies)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isAuthenticated = true;
        updateAuthState();
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
    }, 1500);
}

function showLoading() {
    // Add loading spinner to submit buttons
    document.querySelectorAll('button[type="submit"]').forEach(btn => {
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"></span> Processing...';
    });
}

function hideLoading() {
    // Remove loading spinner from submit buttons
    document.querySelectorAll('button[type="submit"]').forEach(btn => {
        btn.disabled = false;
        if (btn.closest('.auth-form')) {
            btn.textContent = btn.closest('#signin-form') ? 'Sign In' : 'Sign Up';
        } else if (btn.closest('#contact-form')) {
            btn.textContent = 'Send Message';
        }
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Enhanced search and filter functionality
function performSearchAndFilter() {
    let filteredItems = galleryData;

    // Filter out hidden items unless user is admin
    filteredItems = filteredItems.filter(item => {
        if (item.status === 'hidden') {
            return isAdmin();
        }
        return true;
    });

    // Apply type filter first
    if (currentFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.publicationType === currentFilter);
    }

    // Apply search query within filtered results
    if (currentSearchQuery.trim()) {
        const query = currentSearchQuery.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.author.toLowerCase().includes(query) ||
            item.publicationType.toLowerCase().includes(query) ||
            getPublicationTypeName(item.publicationType).toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            getCategoryName(item.category).toLowerCase().includes(query)
        );
    }

    renderGallery(filteredItems);
    updateResultsCount(filteredItems.length);
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const total = galleryData.length;
        if (currentSearchQuery.trim() || currentFilter !== 'all') {
            resultsCount.textContent = `Showing ${count} of ${total} items`;
        } else {
            resultsCount.textContent = `Showing all ${total} items`;
        }
    }
}

// Legacy search function for backward compatibility
function searchGallery(query) {
    currentSearchQuery = query;
    performSearchAndFilter();
}

// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Save user state to localStorage
function saveUserState() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('currentUser');
    }
}

// Update save state when user changes
function updateUserState() {
    saveUserState();
    updateAuthState();
}

// Navigation functions
function showProfilePage() {
    window.location.href = 'profile.html';
}

function showUploadPage() {
    window.location.href = 'upload.html';
}

// Export functions for potential use in other scripts
window.DDHGallery = {
    searchGallery,
    filterGallery,
    performSearchAndFilter,
    showNotification,
    showProfilePage,
    showUploadPage,
    currentUser: () => currentUser,
    isAuthenticated: () => isAuthenticated
};

// Handle upload navigation click
function handleUploadNavClick() {
    if (isAuthenticated) {
        // User is signed in, go to upload page
        window.location.href = 'upload.html';
    } else {
        // User is not signed in, show sign in modal
        showAuthModal();
    }
}

// Check URL parameters for automatic actions
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signin') === 'true') {
        // Auto-show sign-in modal if redirected from upload page
        setTimeout(() => {
            showAuthModal();
        }, 500);
        
        // Clean up URL
        const newURL = window.location.pathname;
        window.history.replaceState({}, document.title, newURL);
    }
}

// Admin and user management functions
function isAdmin() {
    return isAuthenticated && currentUser && adminUsers.includes(currentUser.email);
}

function canUserEditItem(item) {
    if (!isAuthenticated || !currentUser) return false;
    return isAdmin() || item.owner === currentUser.email;
}

function editGalleryItem(itemId) {
    const item = galleryData.find(i => i.id === itemId);
    if (!item || !canUserEditItem(item)) {
        showNotification('You do not have permission to edit this item', 'error');
        return;
    }
    
    // Redirect to edit page with item ID
    window.location.href = `edit-item.html?id=${itemId}`;
}

function showManagePage() {
    if (!isAdmin()) {
        showNotification('Access denied. Admin privileges required.', 'error');
        return;
    }
    window.location.href = 'manage.html';
}

function updateAdminFeatures() {
    const manageLink = document.getElementById('manage-link');
    if (isAdmin()) {
        if (manageLink) {
            manageLink.style.display = 'block';
        } else {
            // Create manage link if it doesn't exist
            createManageLink();
        }
    } else {
        if (manageLink) {
            manageLink.style.display = 'none';
        }
    }
    
    // Re-render gallery to show/hide edit buttons and hidden items
    performSearchAndFilter();
}

function hideAdminFeatures() {
    const manageLink = document.getElementById('manage-link');
    if (manageLink) {
        manageLink.style.display = 'none';
    }
    
    // Re-render gallery to hide admin-only features
    performSearchAndFilter();
}

function createManageLink() {
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    if (userDropdownMenu) {
        const uploadLink = document.getElementById('upload-link');
        const manageLink = document.createElement('a');
        manageLink.href = '#';
        manageLink.className = 'dropdown-item';
        manageLink.id = 'manage-link';
        manageLink.innerHTML = '<i class="fas fa-cog"></i> Manage';
        manageLink.addEventListener('click', function(e) {
            e.preventDefault();
            showManagePage();
        });
        
        // Insert after upload link
        if (uploadLink && uploadLink.nextSibling) {
            userDropdownMenu.insertBefore(manageLink, uploadLink.nextSibling);
        } else {
            userDropdownMenu.appendChild(manageLink);
        }
    }
}
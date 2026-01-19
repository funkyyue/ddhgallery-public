// Admin Panel JavaScript
// This file handles all admin panel functionality

// Sample data for demonstration
let adminData = {
    users: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'User', joined: '2024-01-15', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', joined: '2024-01-20', status: 'active' },
        { id: 3, name: 'Admin User', email: 'admin@ddhgallery.com', role: 'Admin', joined: '2024-01-01', status: 'active' },
        { id: 4, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'User', joined: '2024-02-01', status: 'inactive' }
    ],
    messages: [
        {
            id: 1,
            sender: 'Alice Cooper',
            email: 'alice@example.com',
            subject: 'Question about Neural Processing Unit',
            message: 'Hi, I\'m interested in learning more about the neural processing unit featured in your gallery. Could you provide more technical details?',
            date: '2024-02-15',
            status: 'unread'
        },
        {
            id: 2,
            sender: 'David Wilson',
            email: 'david@example.com',
            subject: 'Collaboration Opportunity',
            message: 'We have some interesting chip designs that might fit well in your gallery. Would you be interested in featuring our work?',
            date: '2024-02-14',
            status: 'read'
        },
        {
            id: 3,
            sender: 'Sarah Chen',
            email: 'sarah@university.edu',
            subject: 'Research Partnership',
            message: 'Our university research lab would like to discuss potential partnerships for showcasing our latest chip innovations.',
            date: '2024-02-13',
            status: 'unread'
        }
    ],
    settings: {
        siteTitle: 'DDH Gallery',
        siteDescription: 'Explore cutting-edge chip research and publications from leading researchers worldwide.',
        contactEmail: 'contact@ddhgallery.com',
        contactPhone: '+1 (555) 123-4567',
        enableComments: true,
        requireApproval: true
    }
};

// Current editing item
let currentEditingItem = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin (in real app, this would be server-side validation)
    if (!isUserAdmin()) {
        redirectToLogin();
        return;
    }

    initializeAdminPanel();
});

function isUserAdmin() {
    // In a real application, this would check server-side authentication
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.email === 'admin@ddhgallery.com' || user.role === 'admin';
}

function redirectToLogin() {
    window.location.href = 'index.html';
}

function initializeAdminPanel() {
    setupAdminEventListeners();
    loadDashboardData();
    loadGalleryTable();
    loadUsersTable();
    loadMessages();
    loadSettings();
}

function setupAdminEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            switchAdminSection(section);
        });
    });

    // Add gallery item button
    const addGalleryBtn = document.getElementById('add-gallery-item');
    if (addGalleryBtn) {
        addGalleryBtn.addEventListener('click', () => openGalleryModal());
    }

    // Gallery form submission
    const galleryForm = document.getElementById('gallery-form');
    if (galleryForm) {
        galleryForm.addEventListener('submit', handleGalleryFormSubmit);
    }

    // Modal close buttons
    document.querySelectorAll('.close, #cancel-gallery').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // User search
    const userSearch = document.getElementById('user-search');
    if (userSearch) {
        userSearch.addEventListener('input', handleUserSearch);
    }

    // Message filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterMessages(filter);
            
            // Update active filter
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Settings save
    const saveSettingsBtn = document.getElementById('save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }

    // Admin logout
    const logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleAdminLogout);
    }
}

function switchAdminSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Load section-specific data
    switch(sectionName) {
        case 'gallery':
            loadGalleryTable();
            break;
        case 'users':
            loadUsersTable();
            break;
        case 'contacts':
            loadMessages();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function loadDashboardData() {
    // Update statistics
    document.getElementById('total-gallery-items').textContent = galleryData.length;
    document.getElementById('total-users').textContent = adminData.users.length;
    document.getElementById('total-messages').textContent = adminData.messages.length;
    document.getElementById('total-views').textContent = '1,234'; // This would come from analytics
}

function loadGalleryTable() {
    const tableBody = document.getElementById('gallery-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    galleryData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.title}"></td>
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td><span class="status-badge active">${getCategoryName(item.category)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editGalleryItem(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteGalleryItem(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadUsersTable() {
    const tableBody = document.getElementById('users-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    adminData.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.role.toLowerCase()}">${user.role}</span></td>
            <td>${formatDate(user.joined)}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadMessages() {
    const container = document.getElementById('messages-container');
    if (!container) return;

    container.innerHTML = '';

    adminData.messages.forEach(message => {
        const messageCard = document.createElement('div');
        messageCard.className = `message-card ${message.status}`;
        messageCard.innerHTML = `
            <div class="message-header">
                <div class="message-sender">${message.sender} (${message.email})</div>
                <div class="message-date">${formatDate(message.date)}</div>
            </div>
            <div class="message-subject">${message.subject}</div>
            <div class="message-content">${message.message}</div>
            <div class="message-actions">
                <button class="action-btn edit" onclick="markAsRead(${message.id})">
                    <i class="fas fa-check"></i> Mark as Read
                </button>
                <button class="action-btn delete" onclick="deleteMessage(${message.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        container.appendChild(messageCard);
    });
}

function loadSettings() {
    const settings = adminData.settings;
    
    document.getElementById('site-title').value = settings.siteTitle;
    document.getElementById('site-description').value = settings.siteDescription;
    document.getElementById('contact-email').value = settings.contactEmail;
    document.getElementById('contact-phone').value = settings.contactPhone;
    document.getElementById('enable-comments').checked = settings.enableComments;
    document.getElementById('require-approval').checked = settings.requireApproval;
}

function openGalleryModal(item = null) {
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('gallery-form');
    
    if (item) {
        // Edit mode
        modalTitle.textContent = 'Edit Gallery Item';
        currentEditingItem = item;
        
        // Populate form
        document.getElementById('item-title').value = item.title;
        document.getElementById('item-author').value = item.author;
        document.getElementById('item-description').value = item.description;
        document.getElementById('item-image').value = item.image;
        document.getElementById('item-category').value = item.category;
        document.getElementById('item-publication').value = item.publicationLink;
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Gallery Item';
        currentEditingItem = null;
        form.reset();
    }
    
    modal.style.display = 'block';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    currentEditingItem = null;
}

function handleGalleryFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const itemData = {
        title: document.getElementById('item-title').value,
        author: document.getElementById('item-author').value,
        description: document.getElementById('item-description').value,
        image: document.getElementById('item-image').value,
        category: document.getElementById('item-category').value,
        publicationLink: document.getElementById('item-publication').value
    };
    
    if (currentEditingItem) {
        // Update existing item
        const index = galleryData.findIndex(item => item.id === currentEditingItem.id);
        if (index !== -1) {
            galleryData[index] = { ...galleryData[index], ...itemData };
        }
        showNotification('Gallery item updated successfully!', 'success');
    } else {
        // Add new item
        const newItem = {
            id: Math.max(...galleryData.map(item => item.id)) + 1,
            ...itemData
        };
        galleryData.push(newItem);
        showNotification('Gallery item added successfully!', 'success');
    }
    
    // Update the gallery display and table
    loadGalleryTable();
    closeModals();
    
    // Save to localStorage (in real app, this would be sent to server)
    localStorage.setItem('galleryData', JSON.stringify(galleryData));
}

function editGalleryItem(id) {
    const item = galleryData.find(item => item.id === id);
    if (item) {
        openGalleryModal(item);
    }
}

function deleteGalleryItem(id) {
    if (confirm('Are you sure you want to delete this gallery item?')) {
        const index = galleryData.findIndex(item => item.id === id);
        if (index !== -1) {
            galleryData.splice(index, 1);
            loadGalleryTable();
            showNotification('Gallery item deleted successfully!', 'success');
            
            // Save to localStorage
            localStorage.setItem('galleryData', JSON.stringify(galleryData));
        }
    }
}

function editUser(id) {
    const user = adminData.users.find(user => user.id === id);
    if (user) {
        // In a real app, this would open a user edit modal
        showNotification('User edit functionality would be implemented here', 'info');
    }
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = adminData.users.findIndex(user => user.id === id);
        if (index !== -1) {
            adminData.users.splice(index, 1);
            loadUsersTable();
            showNotification('User deleted successfully!', 'success');
        }
    }
}

function handleUserSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = adminData.users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    
    // Update table with filtered results
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.role.toLowerCase()}">${user.role}</span></td>
            <td>${formatDate(user.joined)}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterMessages(filter) {
    let filteredMessages = adminData.messages;
    
    if (filter !== 'all') {
        filteredMessages = adminData.messages.filter(message => message.status === filter);
    }
    
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    filteredMessages.forEach(message => {
        const messageCard = document.createElement('div');
        messageCard.className = `message-card ${message.status}`;
        messageCard.innerHTML = `
            <div class="message-header">
                <div class="message-sender">${message.sender} (${message.email})</div>
                <div class="message-date">${formatDate(message.date)}</div>
            </div>
            <div class="message-subject">${message.subject}</div>
            <div class="message-content">${message.message}</div>
            <div class="message-actions">
                <button class="action-btn edit" onclick="markAsRead(${message.id})">
                    <i class="fas fa-check"></i> Mark as Read
                </button>
                <button class="action-btn delete" onclick="deleteMessage(${message.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        container.appendChild(messageCard);
    });
}

function markAsRead(id) {
    const message = adminData.messages.find(msg => msg.id === id);
    if (message) {
        message.status = 'read';
        loadMessages();
        showNotification('Message marked as read!', 'success');
    }
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        const index = adminData.messages.findIndex(msg => msg.id === id);
        if (index !== -1) {
            adminData.messages.splice(index, 1);
            loadMessages();
            showNotification('Message deleted successfully!', 'success');
        }
    }
}

function saveSettings() {
    const settings = {
        siteTitle: document.getElementById('site-title').value,
        siteDescription: document.getElementById('site-description').value,
        contactEmail: document.getElementById('contact-email').value,
        contactPhone: document.getElementById('contact-phone').value,
        enableComments: document.getElementById('enable-comments').checked,
        requireApproval: document.getElementById('require-approval').checked
    };
    
    adminData.settings = settings;
    
    // Save to localStorage (in real app, this would be sent to server)
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    showNotification('Settings saved successfully!', 'success');
}

function handleAdminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getCategoryName(category) {
    const categoryNames = {
        'ai': 'AI Chips',
        'processor': 'Processors',
        'memory': 'Memory'
    };
    return categoryNames[category] || category;
}

// Load saved data on initialization
function loadSavedData() {
    // Load gallery data from localStorage if available
    const savedGalleryData = localStorage.getItem('galleryData');
    if (savedGalleryData) {
        try {
            const parsedData = JSON.parse(savedGalleryData);
            if (Array.isArray(parsedData)) {
                galleryData.length = 0; // Clear existing data
                galleryData.push(...parsedData); // Add saved data
            }
        } catch (e) {
            console.error('Error loading saved gallery data:', e);
        }
    }
    
    // Load admin settings from localStorage if available
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
        try {
            const parsedSettings = JSON.parse(savedSettings);
            adminData.settings = { ...adminData.settings, ...parsedSettings };
        } catch (e) {
            console.error('Error loading saved settings:', e);
        }
    }
}

// Initialize saved data
loadSavedData();

// Export admin functions for global access
window.AdminPanel = {
    editGalleryItem,
    deleteGalleryItem,
    editUser,
    deleteUser,
    markAsRead,
    deleteMessage,
    switchAdminSection
};
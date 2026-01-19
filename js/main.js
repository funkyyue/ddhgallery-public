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
        status: "normal",
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
        createdAt: "2023-12-20",
        updatedAt: "2023-12-20"
    }
];

// Search and filter state
let currentSearchQuery = '';
let currentFilter = 'all';

// DOM elements
let galleryGrid;
let navToggle;
let navMenu;
let searchInput;
let typeFilter;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    renderGallery();
});

function initializeElements() {
    galleryGrid = document.getElementById('gallery-grid');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
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

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Submission form
    const submissionForm = document.getElementById('submission-form');
    if (submissionForm) {
        submissionForm.addEventListener('submit', handleSubmissionSubmit);
    }

    // File upload handling
    const fileInput = document.getElementById('chip-image');
    const fileLabel = document.querySelector('.file-upload-label');
    const fileText = document.getElementById('file-upload-text');
    
    if (fileInput && fileLabel && fileText) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}

function toggleMobileNav() {
    navMenu.classList.toggle('active');
}

function renderGallery(items = galleryData) {
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';
    
    // Only show normal and featured items (no hidden items in public view)
    const visibleItems = items.filter(item => item.status !== 'hidden');
    
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
    }
    
    // Extract first author from the author list
    const firstAuthor = getFirstAuthor(item.author);
    const authorCount = getAuthorCount(item.author);
    const authorDisplay = authorCount > 1 ? `${firstAuthor} et al.` : firstAuthor;
    
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
            </div>
        </div>
    `;
    
    return div;
}

function getCategoryName(category) {
    // Default categories
    const categoryNames = {
        'ai': 'AI Chips',
        'processor': 'Processors',
        'memory': 'Memory'
    };
    return categoryNames[category] || category;
}

function getPublicationTypeName(type) {
    // Default types
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

// Enhanced search and filter functionality
function performSearchAndFilter() {
    let filteredItems = galleryData;

    // Filter out hidden items (public view only shows normal and featured)
    filteredItems = filteredItems.filter(item => item.status !== 'hidden');

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
        const total = galleryData.filter(item => item.status !== 'hidden').length;
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

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate required fields
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Generate automated email content for contact form
    const emailContent = generateContactEmail(formData);
    
    // Simulate form submission
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Show the generated email content for demonstration
        console.log('Generated Contact Email:', emailContent);
        
        form.reset();
    }, 1500);
}

function generateContactEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return {
        to: 'contact@ddhgallery.com', // Admin contact email
        from: email,
        subject: `Contact: ${name} - DDH Gallery Inquiry`,
        body: `
New Contact Message Received

Contact Details:
===============
Date: ${currentDate}
Name: ${name}
Email: ${email}

Message:
========
${message}

Response Required:
=================
Please respond to ${name} at ${email} regarding their inquiry.

Contact ID: CONTACT-${Date.now()}
        `.trim(),
        
        // Metadata for processing
        metadata: {
            contactId: `CONTACT-${Date.now()}`,
            senderName: name,
            senderEmail: email,
            contactDate: new Date().toISOString(),
            messageType: 'general_inquiry',
            status: 'pending_response'
        }
    };
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    const fileLabel = document.querySelector('.file-upload-label');
    const fileText = document.getElementById('file-upload-text');
    
    if (!file) {
        resetFileUpload();
        return;
    }
    
    // Validate file type
    if (!file.type.match(/^image\/jpe?g$/i)) {
        showNotification('Please select a JPEG image file only.', 'error');
        resetFileUpload();
        return;
    }
    
    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showNotification('File size must be less than 10MB.', 'error');
        resetFileUpload();
        return;
    }
    
    // Update UI to show selected file
    fileLabel.classList.add('file-selected');
    fileLabel.classList.remove('file-error');
    fileText.innerHTML = `<i class="fas fa-check-circle"></i> ${file.name} (${formatFileSize(file.size)})`;
}

function resetFileUpload() {
    const fileInput = document.getElementById('chip-image');
    const fileLabel = document.querySelector('.file-upload-label');
    const fileText = document.getElementById('file-upload-text');
    
    if (fileInput) fileInput.value = '';
    if (fileLabel) {
        fileLabel.classList.remove('file-selected', 'file-error');
    }
    if (fileText) {
        fileText.innerHTML = '<i class="fas fa-upload"></i> Upload Chip Image (JPEG, max 10MB)';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function handleSubmissionSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate required fields
    const name = formData.get('name');
    const email = formData.get('email');
    const paperTitle = formData.get('paper_title');
    const authors = formData.get('authors');
    const chipImage = formData.get('chip_image');
    const message = formData.get('message');
    
    if (!name || !email || !paperTitle || !authors || !chipImage || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Validate authors format (should contain at least one comma or be a single name)
    if (authors.trim().length < 3) {
        showNotification('Please provide a valid author list.', 'error');
        return;
    }
    
    // Generate automated email content
    const emailContent = generateSubmissionEmail(formData);
    
    // Simulate form submission
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification('Submission inquiry sent! We\'ll review your work and contact you soon.', 'success');
        
        // Show the generated email content for demonstration
        console.log('Generated Email Content:', emailContent);
        
        // Reset form and file upload
        form.reset();
        resetFileUpload();
    }, 1500);
}

function generateSubmissionEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const paperTitle = formData.get('paper_title');
    const authors = formData.get('authors');
    const chipImage = formData.get('chip_image');
    const message = formData.get('message');
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return {
        to: 'admin@ddhgallery.com', // Admin email address
        from: email,
        subject: `New Gallery Submission: ${paperTitle}`,
        body: `
New Gallery Submission Received

Submission Details:
==================
Date: ${currentDate}
Submitter: ${name}
Email: ${email}

Paper Information:
==================
Title: ${paperTitle}
Authors: ${authors}

Attached Files:
===============
Chip Image: ${chipImage.name} (${formatFileSize(chipImage.size)})

Message from Submitter:
======================
${message}

Next Steps:
===========
1. Review the submission details above
2. Download and examine the attached chip image
3. Verify the publication information
4. Contact the submitter at ${email} with approval/feedback
5. If approved, add the item to the gallery with "featured" or "normal" status

Submission ID: SUB-${Date.now()}
        `.trim(),
        
        // Metadata for processing
        metadata: {
            submissionId: `SUB-${Date.now()}`,
            submitterName: name,
            submitterEmail: email,
            paperTitle: paperTitle,
            authors: authors,
            fileName: chipImage.name,
            fileSize: chipImage.size,
            submissionDate: new Date().toISOString(),
            status: 'pending_review'
        }
    };
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
        if (btn.closest('#contact-form')) {
            btn.textContent = 'Send Message';
        } else if (btn.closest('#submission-form')) {
            btn.textContent = 'Send Submission Inquiry';
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

// Export functions for potential use in other scripts
window.DDHGallery = {
    searchGallery,
    filterGallery,
    performSearchAndFilter,
    showNotification
};
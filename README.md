# DDH Gallery

A modern, responsive gallery website for showcasing chip designs and research publications.

## 🌟 Features

- **Interactive Gallery**: Browse chip designs with search and filter functionality
- **User Authentication**: Sign up/sign in system with user profiles
- **Upload System**: Users can submit their own chip designs for review
- **Admin Management**: Admin approval workflow for submissions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Publication Types**: Support for conferences, journals, and ArXiv papers
- **Category Management**: Organize chips by AI, Processors, Memory, etc.

## 🚀 Live Demo

Visit the live website: [DDH Gallery](https://funkyyue.github.io/ddhgallery-public/)

## 📱 Screenshots

The website features a clean, modern design with:
- Hero section with call-to-action
- Searchable and filterable gallery grid
- User authentication modal
- Upload form for new submissions
- Admin management interface
- Contact page with team information

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **Storage**: LocalStorage for demo data persistence
- **Deployment**: GitHub Pages

## 🏗️ Project Structure

```
├── index.html          # Main gallery page
├── upload.html         # Upload form page
├── profile.html        # User profile page
├── manage.html         # Admin management page
├── admin.html          # Admin dashboard
├── edit-item.html      # Edit gallery item page
├── styles/
│   ├── main.css        # Main stylesheet
│   └── admin.css       # Admin-specific styles
├── js/
│   ├── main.js         # Core functionality
│   ├── upload.js       # Upload form logic
│   ├── profile.js      # Profile management
│   ├── manage.js       # Admin management
│   ├── admin.js        # Admin dashboard
│   └── edit-item.js    # Item editing
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/funkyyue/ddhgallery-public.git
cd ddhgallery-public
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` to view the website.

### GitHub Pages Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## 👥 Usage

### For Visitors
- Browse the gallery of chip designs
- Use search and filters to find specific papers
- View publication details and links

### For Users
- Sign up for an account
- Upload your own chip designs
- Manage your profile and submissions
- Edit or hide your uploaded items

### For Administrators
- Review and approve user submissions
- Manage all gallery items
- Add/remove publication types and categories
- Access admin dashboard for site management

## 🔧 Configuration

The website uses localStorage for data persistence in demo mode. For production use, you would typically integrate with a backend API and database.

### Admin Access
Admin features are available for demonstration purposes. In a production environment, admin authentication should be handled server-side with proper security measures.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please visit the contact page on the website or reach out through the repository issues.

## 🙏 Acknowledgments

- Font Awesome for icons
- Placeholder images from placeholder.com
- Modern CSS techniques and responsive design patterns
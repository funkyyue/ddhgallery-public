# DDH Gallery - Public Website

A secure, view-only gallery website for showcasing chip designs and research publications.

## 🌟 Features

- **Interactive Gallery**: Browse chip designs with search and filter functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Publication Types**: Support for conferences, journals, and ArXiv papers
- **Category Management**: Organize chips by AI, Processors, Memory, etc.
- **Contact System**: Direct contact forms for inquiries and submissions
- **Secure Design**: No user authentication or data storage - completely safe for public deployment

## 🚀 Live Demo

Visit the live website: [DDH Gallery](https://funkyyue.github.io/ddhgallery-public/)

## 📱 Screenshots

The website features a clean, modern design with:
- Hero section with call-to-action
- Searchable and filterable gallery grid
- Submission guidelines and contact forms
- Contact page with team information
- Fully responsive layout

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **Deployment**: GitHub Pages
- **Security**: No authentication, no data storage, view-only design

## 🏗️ Project Structure

```
├── index.html          # Main gallery page (single-page application)
├── styles/
│   ├── main.css        # Main stylesheet
│   └── admin.css       # Legacy admin styles (unused)
├── js/
│   └── main.js         # Core functionality (secure, view-only)
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
- Contact the team for inquiries

### For Researchers
- Submit your work through the contact form
- Follow submission guidelines for inclusion
- All submissions are manually reviewed
- Contact directly for fastest response

## 🔒 Security Features

- **No User Authentication**: Completely eliminates credential security risks
- **No Data Storage**: No localStorage or cookies used for sensitive data
- **View-Only Design**: Users cannot modify or upload content directly
- **Contact-Based Submissions**: All submissions handled through secure contact forms
- **No Admin Interface**: Administrative functions handled separately

## 📋 Submission Process

1. **Contact Us**: Email contact@ddhgallery.com with your research details
2. **Include Information**: Paper title, authors, publication details, chip images
3. **Review Process**: We'll review and add approved submissions to the gallery
4. **Notification**: You'll be notified when your work is live

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, submissions, or support:
- **Email**: contact@ddhgallery.com
- **Website**: Visit the contact page on the live site
- **Issues**: Use GitHub issues for technical problems

## 🙏 Acknowledgments

- Font Awesome for icons
- Placeholder images from placeholder.com
- Modern CSS techniques and responsive design patterns
- Security-first design principles

---

**Note**: This is the public, secure version of the DDH Gallery. For development and administrative functions, a separate private repository is maintained with appropriate security measures.
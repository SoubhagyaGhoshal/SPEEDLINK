# SPEEDLINK - Modern ISP Website

A comprehensive, modern website for an Internet Service Provider (ISP) similar to GTPL.net, built with React and featuring broadband and cable TV services.

## 🚀 Features

### Core Services
- **Broadband Plans**: High-speed internet packages with detailed pricing and features
- **Cable TV**: Channel packs with regional content and HD/SD filtering

### User Experience
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Sticky Navigation**: Easy access to all sections
- **Interactive Elements**: Smooth animations and hover effects
- **Search & Filter**: Advanced filtering for plans and FAQs

### Customer Support
- **AI Chatbot**: 24/7 intelligent customer support
- **Live Chat**: Real-time support with agents
- **Phone Support**: Direct contact options
- **FAQ System**: Comprehensive help section with search



## 🛠️ Technology Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Styled Components, CSS3
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd speedlink-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── Footer.js       # Footer component
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Broadband.js    # Broadband services
│   ├── CableTV.js      # Cable TV services
│   └── Support.js      # Customer support
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#f59e0b` (Orange)
- **Accent**: `#10b981` (Green)
- **Dark**: `#111827` (Dark Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners with shadows
- **Buttons**: Hover effects and transitions
- **Forms**: Modern input styling with validation
- **Navigation**: Sticky header with dropdown menus

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adaptive grid)
- **Mobile**: < 768px (Stacked layout)

## 🔧 Key Features Implementation

### 1. Navigation System
- Sticky navbar with smooth scrolling
- Mobile-responsive hamburger menu
- User authentication status display
- Dropdown menus for logged-in users

### 2. Service Pages
- **Broadband**: Plan comparison, coverage checker
- **Cable TV**: Channel packs, quality filters
- **Genie+**: OTT aggregation, app listings
- **Games**: Cloud gaming, device compatibility

### 3. Customer Support
- Interactive AI chatbot
- Searchable FAQ system
- Multiple contact methods
- 24/7 availability indicators

### 4. User Authentication
- Secure login/registration forms
- Social media integration placeholders
- Form validation and error handling
- Password visibility toggles

### 5. Customer Portal
- Dashboard with service overview
- Bill management interface
- Quick action buttons
- Service status indicators

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🔮 Future Enhancements

### Backend Integration
- **API Development**: Node.js/Express backend
- **Database**: MongoDB/PostgreSQL for user data
- **Authentication**: JWT tokens, OAuth integration
- **Payment Gateway**: Stripe/Razorpay integration

### Advanced Features
- **Real-time Chat**: WebSocket implementation
- **Push Notifications**: Service updates and alerts
- **Mobile App**: React Native companion app
- **Analytics**: User behavior tracking

### Performance Optimization
- **Lazy Loading**: Component and image optimization
- **Caching**: Service worker implementation
- **CDN**: Content delivery network
- **SEO**: Meta tags and structured data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email**: support@splink.com
- **Phone**: 1800-123-4567
- **Documentation**: [Project Wiki](link-to-wiki)

## 🙏 Acknowledgments

- **Design Inspiration**: GTPL.net and modern ISP websites
- **Icons**: React Icons library
- **Animations**: Framer Motion
- **Styling**: Styled Components

---

**Built with ❤️ for better connectivity** 
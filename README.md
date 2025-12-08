# 🚀 Himanshu's Portfolio Website

A modern, responsive portfolio website showcasing AI/ML projects, technical expertise, and professional journey. Built with React, TypeScript, and cutting-edge web technologies. Features comprehensive project management, real-time social stats integration, and optimized Vercel deployment.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-cyan)

## 🌟 Features

### 🎨 **Modern Design & UX**
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Smooth Animations**: Framer Motion powered micro-interactions and page transitions
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Lazy loading, code splitting, and optimized asset delivery

### 📱 **Progressive Web App (PWA)**
- **Service Worker**: Offline functionality and background sync
- **App Manifest**: Installable on mobile devices
- **Push Notifications**: Real-time updates and engagement
- **Caching Strategy**: Intelligent resource caching for fast loading

### 🔍 **Advanced Functionality**
- **Global Search**: Real-time search across projects, articles, and content
- **Dynamic OG Images**: Auto-generated social media previews using Vercel OG
- **Real-time Social Stats**: Live GitHub, CodeChef, and Twitter metrics
- **Analytics Integration**: Comprehensive user behavior tracking with Vercel Analytics
- **Contact Form**: Slack-integrated contact system with spam protection
- **Project Categories**: Auto-updating project counts across different domains
- **Responsive Image Galleries**: Optimized project showcases with lazy loading

### 🛠 **Technical Excellence**
- **TypeScript**: Full type safety across the entire codebase
- **Modern React**: Hooks, Context API, and functional components
- **State Management**: Zustand for efficient state handling
- **Form Handling**: React Hook Form with Zod validation
- **MDX Support**: Rich content authoring with Markdown + JSX

## 🏗 Architecture Overview

### **Frontend Stack**
```
React 18.3.1 + TypeScript 5.8.3
├── Vite 7.1.2 (Build Tool)
├── Tailwind CSS 3.4.17 (Styling)
├── Framer Motion 11.15.0 (Animations)
├── React Router DOM 6.28.0 (Routing)
├── React Hook Form 7.48.2 (Forms)
├── Zod 3.22.4 (Validation)
├── Zustand 5.0.2 (State Management)
└── MDX 3.1.1 (Content)
```

### **Backend & Deployment**
```
Vercel Serverless Functions (Optimized for Hobby Plan)
├── Contact Form API (/api/submit-form)
├── Projects API (/api/projects/*)
├── Consolidated Social Stats API (/api/social-stats)
├── OG Image Generation (/api/og/*)
└── Analytics Integration (Vercel Analytics + Speed Insights)
```

### **Development Tools**
```
Development Environment
├── ESLint 9.35.0 (Linting)
├── Prettier 3.6.2 (Formatting)
├── Husky 9.1.7 (Git Hooks)
├── Commitlint (Commit Messages)
├── Vitest 3.2.4 (Testing)
├── Playwright 1.55.0 (E2E Testing)
└── Concurrently (Dev Server)
```

## 📁 Project Structure

```
himanshu-portfolio-website/
├── 📁 api/                          # Vercel Serverless Functions
│   ├── 📁 og/                       # Open Graph Image Generation
│   ├── 📁 projects/                # Projects API Endpoints
│   ├── 📁 social-stats/             # Consolidated Social Stats API
│   └── 📁 submit-form/              # Contact Form Handler
├── 📁 public/                       # Static Assets
│   ├── 📁 images/                   # Organized Project Images
│   │   └── 📁 projects/             # Project-specific image folders
│   ├── 📄 manifest.json             # PWA Manifest
│   ├── 📄 robots.txt                # SEO Configuration
│   └── 📄 sw.js                     # Service Worker
├── 📁 src/
│   ├── 📁 app/                      # Main Application
│   │   ├── 📄 App.tsx               # Root Component
│   │   └── 📁 pages/                # Page Components
│   ├── 📁 components/               # Reusable Components
│   │   ├── 📁 ui/                   # UI Components
│   │   ├── 📁 home/                 # Home Page Components
│   │   ├── 📁 about/                # About Page Components
│   │   ├── 📁 work/                 # Work Page Components
│   │   ├── 📁 articles/             # Articles Components
│   │   ├── 📁 contact/              # Contact Components
│   │   ├── 📁 developer/             # Developer Page Components
│   │   └── 📁 seo/                 # SEO Components
│   ├── 📁 data/                     # Content Data
│   │   ├── 📁 projects/             # Project MDX Files
│   │   └── 📁 articles/              # Article MDX Files
│   ├── 📁 hooks/                    # Custom React Hooks
│   ├── 📁 utils/                    # Utility Functions
│   ├── 📁 context/                  # React Context Providers
│   └── 📁 config/                   # Configuration Files
├── 📄 vercel.json                   # Vercel Deployment Config
├── 📄 vite.config.ts                # Vite Configuration
├── 📄 tailwind.config.cjs           # Tailwind Configuration
└── 📄 package.json                  # Dependencies & Scripts
```

## 🆕 Recent Updates & Improvements

### **Latest Enhancements (December 2024)**

#### **🔧 Technical Optimizations**
- **API Consolidation**: Reduced Vercel serverless functions from 12+ to stay within Hobby plan limits
- **Social Stats Integration**: Consolidated GitHub, CodeChef, and Twitter APIs into single endpoint
- **Image Organization**: Restructured all project images into organized, project-specific folders
- **File Naming**: Fixed web compatibility issues by replacing spaces with hyphens in filenames

#### **🎨 UI/UX Improvements**
- **Developer Page Enhancement**: Added comprehensive website architecture section
- **Project Categories**: Auto-updating project counts across different domains (Machine Learning, Computer Vision, etc.)
- **Responsive Design**: Enhanced mobile-first approach with proper icon scaling
- **Image Galleries**: Added responsive image galleries for projects with multiple screenshots

#### **📱 Mobile Optimization**
- **Icon Responsiveness**: Fixed fixed-size icons to use responsive Tailwind classes
- **Touch Interactions**: Improved mobile touch targets and interactions
- **Performance**: Optimized bundle sizes and loading times for mobile devices

#### **🛠 Development Workflow**
- **TypeScript Fixes**: Resolved all import errors and type issues
- **Code Quality**: Enhanced error handling and safety checks
- **Testing**: Improved component testing and error boundaries

### **📊 Current Project Portfolio**
- **8 Active Projects**: Including IntelliStock Pro AI-Powered Stock Prediction Analytics
- **5 Categories**: Machine Learning, Computer Vision, Deep Learning, Data Analysis, Data Engineering
- **Real-time Stats**: Live GitHub and social media metrics
- **Responsive Galleries**: Optimized project showcases with lazy loading

## 🚀 Quick Start

### **Prerequisites**
- Node.js 22.x or higher
- npm or yarn package manager
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/HimanshuSalunke/himanshu-portfolio-website.git
   cd himanshu-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create environment file
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
   ```
   
   **To get a Gemini API key:**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key and add it to your `.env.local` file

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Development Server**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:frontend  # Frontend only (port 3000)
   npm run dev:backend    # Backend only (port 5000)
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 🛠 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run generate:sitemap` | Generate sitemap.xml |

## 📊 Content Management

### **Projects**
Projects are managed through MDX files in `src/data/projects/`. Each project includes:

```yaml
---
id: "project-slug"
title: "Project Title"
summary: "Brief description"
category: "Computer Vision"
coverImage: "/images/projects/cover.jpg"
date: "2024-01-15"
techStack: ["React", "TypeScript", "Python"]
   featured: true
   status: "Completed"
   metrics:
  - label: "Accuracy"
    value: "94.2%"
   githubUrl: "https://github.com/username/repo"
liveUrl: "https://project-demo.com"
---
```

### **Articles**
Articles follow a similar MDX structure in `src/data/articles/`:

```yaml
---
id: "article-slug"
title: "Article Title"
summary: "Article description"
category: "Machine Learning"
coverImage: "/images/articles/cover.jpg"
date: "2024-01-15"
   readTime: 5
featured: true
---
```

## 🔧 Configuration

### **Environment Variables**
```bash
# Contact Form (Required for contact functionality)
SLACK_WEBHOOK_URL=your_slack_webhook_url

# Social Stats APIs (Optional - uses fallback data if not provided)
GITHUB_TOKEN=your_github_token
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# Site Configuration
VITE_SITE_URL=https://himanshu-salunke.vercel.app
```

### **Site Configuration**
Update `src/config/site.ts` with your information:

```typescript
export const SITE_CONFIG = {
  name: "Your Portfolio Name",
  author: "Your Name",
  twitterHandle: "@HimanshuSalunke",
  description: "Your portfolio description",
  url: "https://himanshu-salunke.vercel.app",
  themeColor: "#3b82f6",
  language: "en"
}
```

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Configure build settings automatically

2. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Set `SLACK_WEBHOOK_URL` for contact form
   - Optionally add `GITHUB_TOKEN` and `TWITTER_BEARER_TOKEN` for enhanced social stats

3. **Deploy**
   - Push to main branch triggers automatic deployment
   - Preview deployments for pull requests

### **Other Platforms**

The project can be deployed to any static hosting platform:

- **Netlify**: Use `npm run build` and deploy `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3 + CloudFront**: Upload build artifacts to S3 bucket

## 🧪 Testing

### **Unit Tests**
   ```bash
npm run test              # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run test:ui           # UI mode
```

### **End-to-End Tests**
   ```bash
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui      # UI mode
```

## 📈 Performance

### **Core Web Vitals**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Optimization Features**
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: WebP/AVIF with fallbacks
- **Lazy Loading**: Images and components
- **Service Worker**: Intelligent caching
- **Bundle Analysis**: Optimized chunk sizes

## 🔒 Security

### **Implemented Security Measures**
- **Rate Limiting**: Contact form protection
- **Input Validation**: Zod schema validation
- **CORS Configuration**: Proper cross-origin setup
- **Content Security Policy**: XSS protection
- **Environment Variables**: Secure configuration

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commit messages
- Write tests for new features
- Update documentation
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vercel** for seamless deployment experience
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Open Source Community** for inspiration and tools

## 📞 Contact

**Himanshu** - [@HimanshuSalunke](https://twitter.com/HimanshuSalunke)

- **Email**: contact.himanshusalunke@gmail.com
- **LinkedIn**: [Connect with me](https://linkedin.com/in/yourprofile)
- **GitHub**: [@HimanshuSalunke](https://github.com/HimanshuSalunke)
- **Portfolio**: [https://himanshu-salunke.vercel.app](https://himanshu-salunke.vercel.app)

---

⭐ **Star this repository if you found it helpful!**

🔗 **Live Demo**: [https://himanshu-salunke.vercel.app](https://himanshu-salunke.vercel.app)
<!-- Updated: December 2024 -->

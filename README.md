# 🚀 Markdown to HTML Converter

<div align="center">

![Markdown to HTML Converter](https://img.shields.io/badge/Markdown-HTML-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A fast, secure, and beautiful Markdown to HTML converter with live preview, PWA support, and comprehensive export options.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🎨 Core Functionality
- **Live Editor & Preview**: Real-time Markdown to HTML conversion with split-view editor
- **CodeMirror 6 Integration**: Professional markdown editor with syntax highlighting and line numbers
- **HTML Sanitization**: Built-in XSS protection using DOMPurify with customizable security options
- **Multiple Export Options**: Copy HTML, download as HTML/Markdown files with various templates
- **Template System**: Pre-built HTML templates (Minimal, Blog, README, Custom) and Markdown templates

### 🎯 Advanced Features
- **Statistics Panel**: Real-time word count, character count, line count, and reading time estimates
- **Table of Contents**: Auto-generate TOC from headings with smart insertion
- **Keyboard Shortcuts**: Full keyboard support for power users (Ctrl/Cmd + B, I, H, K, E, etc.)
- **Font Size Controls**: Adjustable editor font size (12px - 24px)
- **Fullscreen Mode**: Distraction-free editing experience
- **Local Storage**: Auto-save drafts and conversion history (last 10 conversions)
- **Dark Mode**: Automatic theme detection with manual toggle
- **Responsive Design**: Beautiful UI on desktop, tablet, and mobile devices

### 📱 PWA & SEO
- **Progressive Web App**: Install as standalone app with offline support
- **SEO Optimized**: Full meta tags, Open Graph, Twitter Cards, and structured data
- **Service Worker**: Caching for faster load times and offline functionality
- **Install Prompt**: Automatic PWA install prompt for supported browsers

### 🔒 Security
- **XSS Protection**: All HTML is sanitized by default
- **Configurable Security**: Toggle iframes, scripts, and styles with warnings
- **Safe Export**: All exported HTML is sanitized before download
- **No External Requests**: All processing happens client-side

### ♿ Accessibility
- **ARIA Labels**: Full screen reader support
- **Semantic HTML**: Proper HTML5 semantic elements
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Support for high contrast mode

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/HyderYash/md-to-html.git
cd md-to-html

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
md-to-html/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles & Tailwind CSS
│   ├── manifest.ts         # PWA manifest configuration
│   ├── sitemap.ts         # SEO sitemap generation
│   └── service-worker.ts  # Service worker registration
├── components/
│   ├── Editor.tsx          # CodeMirror editor component
│   ├── Preview.tsx         # HTML preview with sanitization
│   ├── Toolbar.tsx         # Markdown formatting toolbar
│   ├── SettingsPanel.tsx   # Settings modal
│   ├── ExportModal.tsx     # Export options modal
│   ├── StatsPanel.tsx     # Statistics panel
│   ├── TemplatesPanel.tsx # Markdown templates
│   ├── ShortcutsPanel.tsx # Keyboard shortcuts
│   ├── Footer.tsx         # Footer with social links
│   └── PWAInstallPrompt.tsx # PWA install prompt
├── lib/
│   ├── markdown.ts         # Markdown parser (markdown-it)
│   ├── sanitize.ts         # HTML sanitization (DOMPurify)
│   ├── useLocalStorage.ts # LocalStorage hooks
│   ├── templates.ts       # HTML export templates
│   ├── templates-snippets.ts # Markdown templates
│   └── utils.ts            # Utility functions (stats, TOC)
├── public/
│   ├── icons/              # PWA icons (72x72 to 512x512)
│   ├── sw.js               # Service worker
│   ├── robots.txt          # SEO robots file
│   └── .well-known/        # PWA asset links
├── tests/
│   └── markdown.test.ts    # Unit tests
└── package.json
```

---

## 🎨 Usage

### Basic Usage

1. **Type or paste Markdown** in the left editor panel
2. **See live preview** in the right panel (or toggle to single view)
3. **Export** your HTML using the Export button
4. **Customize** settings in the Settings panel

### Markdown Features Supported

- Headings (H1-H6)
- **Bold** and *italic* text
- Links and images
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Blockquotes
- Tables
- Task lists
- Footnotes
- Horizontal rules

### Keyboard Shortcuts

#### Editor Shortcuts (when editor is focused)
- `Ctrl/Cmd + B` - **Bold** text
- `Ctrl/Cmd + I` - *Italic* text
- `Ctrl/Cmd + H` - Insert heading

#### Global Shortcuts
- `Ctrl/Cmd + K` - Show keyboard shortcuts panel
- `Ctrl/Cmd + E` - Open export modal
- `Ctrl/Cmd + S` - Auto-save (shows feedback toast)
- `Ctrl/Cmd + T` - Open templates panel
- `F11` - Toggle fullscreen mode
- `Esc` - Close modals

### Export Options

1. **Copy HTML**: Copy sanitized HTML to clipboard
2. **Download HTML**: Download as `.html` file with:
   - Custom title and meta description
   - Theme color selection
   - Template selection (Minimal, Blog, README, Custom)
   - Syntax highlighting toggle
   - HTML minification option
3. **Download Markdown**: Download original `.md` file
4. **Shareable Snippet**: Generate embed code

### Templates

#### HTML Templates
- **Minimal**: Clean, simple document
- **Blog Post**: Styled article layout with typography
- **README**: GitHub-style documentation
- **Custom**: Fully customizable template

#### Markdown Templates
- Blog Post Template
- README Template
- Documentation Template
- Article Template
- Meeting Notes Template
- Release Notes Template

---

## 🔒 Security

### HTML Sanitization

All rendered HTML is sanitized using [DOMPurify](https://github.com/cure53/DOMPurify) to prevent XSS attacks.

**Default Settings:**
- ✅ **Allowed**: Safe HTML tags (p, h1-h6, strong, em, a, img, code, pre, ul, ol, li, table, etc.)
- ❌ **Blocked**: Scripts, iframes, event handlers, and potentially dangerous attributes

### Security Options

Customize sanitization in Settings:

- **Allow iframes**: Enable iframe embedding (⚠️ not recommended for untrusted content)
- **Allow scripts**: Enable JavaScript execution (⚠️⚠️ dangerous, use with extreme caution)

### Best Practices

1. **Never paste sensitive data** in shared exports
2. **Review sanitization settings** before enabling iframes/scripts
3. **All data is stored locally** - no data is sent to external servers
4. **Export files are safe** - HTML is sanitized before export

---

## 📱 PWA Features

### Installation

The app can be installed as a Progressive Web App:

1. **Automatic Prompt**: Appears after a few seconds of usage
2. **Browser Menu**: Use browser's install option in the address bar
3. **Mobile**: "Add to Home Screen" option on iOS/Android

### PWA Capabilities

- **Offline Support**: Basic offline functionality via service worker
- **App-like Experience**: Standalone mode when installed
- **Fast Loading**: Cached assets for faster load times
- **Install Prompt**: Automatic install prompt on supported browsers

### Icons Setup

To complete PWA setup, add icons to `public/icons/`:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

Use the helper script: `node scripts/generate-icons.js`

---

## 🔍 SEO Features

### Implemented SEO

- ✅ **Meta Tags**: Comprehensive meta tags for search engines
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Twitter Cards**: Twitter sharing optimization
- ✅ **Structured Data**: JSON-LD schema markup (WebApplication)
- ✅ **Sitemap**: Auto-generated `sitemap.xml`
- ✅ **Robots.txt**: Search engine crawling instructions
- ✅ **Canonical URLs**: Proper URL canonicalization

### SEO Setup

1. **Set Environment Variable**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

2. **Update robots.txt**:
   Update `public/robots.txt` with your actual domain

3. **Create OG Image**:
   Create a 1200x630px image and save as `public/og-image.png`

4. **Submit to Search Engines**:
   - Submit sitemap to Google Search Console
   - Verify with Bing Webmaster Tools

### Verification

- **Google Rich Results**: [Test Tool](https://search.google.com/test/rich-results)
- **Facebook Debugger**: [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter Card Validator**: [Card Validator](https://cards-dev.twitter.com/validator)

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm test             # Run tests
npm test -- --watch  # Run tests in watch mode
```

### Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Editor**: [CodeMirror 6](https://codemirror.net/)
- **Markdown**: [markdown-it](https://github.com/markdown-it/markdown-it) with plugins
- **Sanitization**: [DOMPurify](https://github.com/cure53/DOMPurify)
- **Syntax Highlighting**: [highlight.js](https://highlightjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/)

### Environment Variables

Create a `.env.local` file:

```env
# Required for SEO
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Search engine verification
# GOOGLE_VERIFICATION=your-google-verification-code
# YANDEX_VERIFICATION=your-yandex-verification-code
```

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_SITE_URL`
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: [Deploy Guide](https://docs.netlify.com/integrations/frameworks/next-js/)
- **AWS Amplify**: [AWS Amplify](https://aws.amazon.com/amplify/)
- **Railway**: [Railway](https://railway.app/)
- **Self-hosted**: Any Node.js server

### Build Configuration

The app is configured for optimal production builds:

- Automatic code splitting
- Image optimization
- CSS minification
- Tree shaking
- Service worker caching

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

Tests cover:
- Markdown parsing
- HTML sanitization
- Security features
- Utility functions (word count, TOC generation)
- Edge cases and error handling

---

## 🎨 Customization

### Themes

The app uses an Apple-inspired color scheme:

- **Light Mode**: Clean whites and grays with blue accents
- **Dark Mode**: True black with subtle grays and blue accents

### Customizing Colors

Edit `app/globals.css` and `tailwind.config.ts` to customize the color scheme.

### Custom Templates

Add custom HTML templates in `lib/templates.ts`:

```typescript
export const customTemplate = (content: string, options: TemplateOptions) => {
  return `<!DOCTYPE html>
<html>
<head>
  <title>${options.title}</title>
  <!-- Your custom template -->
</head>
<body>
  ${content}
</body>
</html>`
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier (configured)
- Write tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This tool sanitizes HTML output to prevent XSS attacks, but users should still exercise caution when:

- Enabling iframes or scripts in settings
- Sharing exported HTML files
- Using custom CSS that may contain malicious code

Always review exported content before sharing publicly.

---

## 👨‍💻 Author

**Yash Sharma**

- 🌐 Website: [Portfolio](https://github.com/HyderYash)
- 💼 LinkedIn: [yashsh21](https://www.linkedin.com/in/yashsh21/)
- 🐙 GitHub: [@HyderYash](https://github.com/HyderYash)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [CodeMirror](https://codemirror.net/) - The code editor
- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown parser
- [DOMPurify](https://github.com/cure53/DOMPurify) - HTML sanitizer
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/HyderYash/md-to-html?style=social)
![GitHub forks](https://img.shields.io/github/forks/HyderYash/md-to-html?style=social)
![GitHub issues](https://img.shields.io/github/issues/HyderYash/md-to-html)
![GitHub pull requests](https://img.shields.io/github/issues-pr/HyderYash/md-to-html)

---

<div align="center">

**Made with ❤️ by [Yash Sharma](https://github.com/HyderYash)**

⭐ Star this repo if you find it helpful!

</div>

# LegalClarify 🏛️

**AI-Powered Legal Document Analysis Platform**

Transform complex legal jargon into clear, understandable guidance. Upload contracts, agreements, and legal documents to get instant analysis, risk assessment, and actionable insights.

![LegalClarify Demo](https://via.placeholder.com/800x400/6366F1/ffffff?text=LegalClarify+Demo)

## ✨ Features

- **📄 Document Upload** - Drag & drop support for PDF, DOCX, DOC, TXT, RTF
- **🤖 AI Analysis** - Intelligent document parsing and risk assessment
- **⚠️ Risk Detection** - Identify potential legal risks and concerning clauses
- **📊 Dashboard** - Comprehensive document management and analytics
- **🛡️ Security** - Secure file handling and user authentication
- **📱 Responsive** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: Express.js + Node.js
- **Routing**: React Router 6
- **Build Tool**: Vite
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Styling**: TailwindCSS 3 with custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Deeps-G/legal-doc-ai.git
   cd legal-doc-ai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📝 Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm test       # Run tests
pnpm typecheck  # TypeScript validation
```

## 📁 Project Structure

```
legal-clarify/
├── client/                 # React frontend
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI component library
│   │   ├── Layout.tsx     # Main layout
│   │   └── AuthProvider.tsx # Authentication
│   ├── pages/             # Route components
│   │   ├── Homepage.tsx   # Landing page
│   │   ├── Dashboard.tsx  # User dashboard
│   │   ├── Upload.tsx     # Document upload
│   │   ├── Login.tsx      # Authentication
│   │   └── Signup.tsx     # Registration
│   ├── App.tsx            # App routing
│   └── global.css         # Global styles
├── server/                # Express backend
│   ├── routes/            # API routes
│   └── index.ts           # Server setup
├── shared/                # Shared types
└── public/                # Static assets
```

## 🎨 Design System

LegalClarify uses a custom design system built with TailwindCSS:

- **Primary Color**: `#6366F1` (Indigo)
- **Secondary Color**: `#4ADE80` (Green)
- **Font**: Inter
- **Border Radius**: 18px default
- **Shadows**: Custom depth system

## 🔐 Authentication

The app includes a complete authentication system:
- User registration and login
- Protected routes
- Session management
- Context-based auth state

## 📊 Document Analysis Features

- **File Upload**: Drag & drop with progress tracking
- **Format Support**: PDF, DOCX, DOC, TXT, RTF
- **AI Analysis**: Mock intelligent document analysis
- **Risk Assessment**: Low/Medium/High risk categorization
- **Recommendations**: Actionable advice for users
- **Document Management**: Full CRUD operations

## 🚀 Deployment

### Netlify (Recommended)
```bash
pnpm build
# Deploy dist/spa folder to Netlify
```

### Manual Deployment
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Deepanshi Goyal, Akshat Waie**
- GitHub: [@Deeps-G](https://github.com/Deeps-G)
- GitHub: [@WAkshat](https://github.com/WAkshat)

## 🙏 Acknowledgments

- Built with modern React and TypeScript best practices
- UI components powered by Radix UI
- Styled with TailwindCSS
- Icons by Lucide React

---

**Made with ❤️ for making legal documents accessible to everyone**

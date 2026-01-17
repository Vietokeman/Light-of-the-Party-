# Light of the Party - Ánh Sáng Soi Đường

> AI-powered learning platform for Ho Chi Minh Thought using Gemini AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)

## 🌟 Overview

**Light of the Party** is an educational AI chatbot platform designed to teach **Tư tưởng Hồ Chí Minh** (Ho Chi Minh Thought) based on the official textbook from Nhà xuất bản Chính trị quốc gia Sự thật, 2021. The chatbot provides accurate, contextual responses with page references using Google Gemini AI.

## ✨ Features

- 🔐 **Firebase Authentication** - Secure login with Google or Email/Password
- 💬 **AI Chatbot** - Gemini-powered assistant trained on knowledge.txt
- 📖 **Page References** - Answers include specific page numbers from the textbook
- 📊 **Visitor Counter** - Real-time visitor tracking with Firestore
- 📱 **Responsive Design** - Beautiful on all devices
- 🎭 **Party Theme** - Communist Red & Gold color palette
- ⚡ **Fast Responses** - Direct Gemini API integration

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Backend | Firebase (Auth + Firestore) |
| AI | Google Gemini 2.0 Flash API |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/           # Login, Profile modals
│   ├── Chat/           # FloatingChatBot component
│   ├── Intro/          # IntroLoader animation
│   ├── common/         # Button, Card, Badge, StarIcon
│   └── layout/         # Header, Footer, ScrollToTop
├── config/
│   └── firebase.ts     # Firebase configuration
├── context/
│   └── AuthContext.tsx # Authentication state management
├── pages/
│   ├── HomePage.tsx
│   ├── AIUsagePage.tsx
│   ├── AboutPage.tsx
│   └── HangmanPage.tsx
├── services/
│   ├── geminiService.ts    # Gemini API integration
│   └── visitorService.ts   # Visitor counter
├── types/
│   └── index.ts        # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css           # Tailwind + custom styles
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/light-of-the-party.git
cd light-of-the-party

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your environment variables in .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
# Get from: Firebase Console > Project Settings > Your Apps > Web App
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Gemini API Key
# Get free key from: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=paste_your_gemini_key_here
VITE_GEMINI_MODEL=gemini-2.0-flash-exp
```

### Getting API Keys

#### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > Your Apps > Add Web App
4. Copy all configuration values to `.env`
5. Enable Authentication (Google & Email/Password)
6. Create Firestore database

#### 2. Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to `VITE_GEMINI_API_KEY` in `.env`


### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deploy to Vercel

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/light-of-the-party.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite config

3. **Add Environment Variables in Vercel**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env`:
     ```
     VITE_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID
     VITE_FIREBASE_MEASUREMENT_ID
     VITE_GEMINI_API_KEY
     VITE_GEMINI_MODEL
     ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Party Red | `#B22222` | Primary, buttons, accents |
| Vietnam Red | `#ac0705` | Gradients, deep accents |
| Party Gold | `#FFD700` | Highlights, stars, icons |
| Antique Gold | `#C9A227` | Borders, decorations |
| Deep Red | `#8b1a1a` | Hover states, shadows |

## 📖 AI Integration

The chatbot uses **Google Gemini AI** with a system prompt trained on:

- **Giáo trình Tư tưởng Hồ Chí Minh** (2021)
- Focused on textbook pages 12-24 (Introduction, Concepts, Research Methods)
- Provides answers with specific page references
- Formats responses in structured bullet points

### Example Interactions

**User**: "Khái niệm Tư tưởng Hồ Chí Minh là gì?"

**AI**: 
```
Theo giáo trình Tư tưởng Hồ Chí Minh (trang 12):

📌 **Khái niệm Tư tưởng Hồ Chí Minh**

1. **Bản chất**
   - Hệ thống quan điểm toàn diện và sâu sắc
   - Về những vấn đề cơ bản của cách mạng Việt Nam

2. **Nguồn gốc**
   - Vận dụng và phát triển sáng tạo chủ nghĩa Mác-Lênin
   - Kế thừa giá trị truyền thống dân tộc
   - Tiếp thu tinh hoa văn hóa nhân loại

(Trang 12)
```

## 🔧 Troubleshooting

### Common Issues

**1. "VITE_GEMINI_API_KEY not set" error**
- Make sure you've created `.env` file in root directory
- Copy values from `.env.example`
- Restart dev server after adding environment variables

**2. Firebase Auth not working**
- Check Firebase console: Authentication > Sign-in method
- Enable Google and Email/Password providers
- Verify domain is authorized in Firebase console

**3. Chatbot not responding**
- Check Gemini API key is valid
- Check browser console for errors
- Verify API quota is not exceeded at [Google AI Studio](https://makersuite.google.com/app/apikey)

### Firebase Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Analytics counters
    match /analytics/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules for data protection
- API keys stored in environment variables (never commit `.env` to git)
- HTTPS enforced in production
- CORS configured for Gemini API requests

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **VietInnov-Spark** - Inspired UI/UX design and chatbot implementation
- **Nhà xuất bản Chính trị quốc gia Sự thật** - Giáo trình Tư tưởng Hồ Chí Minh
- **Google Gemini AI** - Powerful language model
- **Firebase** - Authentication and database
- **Vercel** - Easy deployment platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for education and learning in Vietnam 🇻🇳

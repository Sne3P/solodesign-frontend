# 🚀 SoloDesign - Portfolio & Agence Web Moderne

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.31-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Description

SoloDesign est une application web moderne construite avec Next.js 14, TypeScript et Tailwind CSS. Cette plateforme présente les services et réalisations d'une agence web spécialisée dans la création de sites internet et d'applications sur mesure.

### ✨ Fonctionnalités Principales

- 🎨 **Design moderne** avec animations fluides (Framer Motion)
- 📱 **100% Responsive** - optimisé mobile-first  
- ⚡ **Performances optimales** - Core Web Vitals AAA
- 🔍 **SEO ultra-optimisé** - structured data, meta tags avancées
- 🛡️ **Sécurisé** - headers de sécurité, protection CSRF
- 📊 **Analytics intégrés** - Google Analytics, Microsoft Clarity, Hotjar
- 🐳 **Docker ready** - déploiement containerisé
- 📝 **Système de logs** centralisé et optimisé
- � **Contact form** avec envoi d'emails via SMTP
- � **Interface admin** sécurisée avec authentification JWT

## 🛠 Stack Technique

- **Framework**: Next.js 14.2.31 (App Router)
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS 3.4.1 + CSS Modules
- **Animations**: Framer Motion 11.11.9
- **Authentification**: JWT + bcrypt
- **Email**: Nodemailer avec SMTP
- **Analytics**: Google Analytics 4, Microsoft Clarity, Hotjar
- **Deployment**: Docker + Docker Compose
- **Icons**: Lucide React + Radix UI

## 📁 Project Structure

```
solodesign/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── about-us/page.tsx    # About us page
│   ├── projects/page.tsx    # Projects portfolio
│   ├── contact/page.tsx     # Contact form
│   ├── api/send-email/      # Email API endpoint
│   └── fonts/               # Custom fonts
├── public/                  # Public assets (favicon, images, etc.)
├── styles/                  # Global styles (globals.css)
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS config
├── package.json             # Project metadata and dependencies
└── ...
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/solodesign.git
cd solodesign
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## ✉️ Contact Form (Serverless)

The contact form sends emails via a serverless API route:
- API Route: `app/api/send-email/route.ts`
- Can be configured for use with Nodemailer, SendGrid, Resend, etc.

---

## 🧪 Testing

> Not configured by default. You can integrate **Jest** or **Playwright** for testing UI and APIs.

---

## 📄 License

MIT License. Use freely, credit appreciated.

---

## 📬 Contact

**bastien.robert97421@gmail.com**  
Let’s build something great together — from UI concepts to full web platforms.


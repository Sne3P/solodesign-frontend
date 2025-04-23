# 🎨 SoloDesign

**SoloDesign** is a professional digital portfolio and service platform for showcasing creative web and software projects. Built with **Next.js 13+ App Router**, **TailwindCSS**, and **TypeScript**, it provides a fast, responsive, and modern user experience.

---



https://github.com/user-attachments/assets/85f7cbb7-797c-4cf0-9ae1-0d807115b6b1





## 🌐 Features

- 🖼 Modern and minimalist design with glassmorphism style
- ⚡ Fast performance with Next.js 13 App Router and optimized build
- 📂 Dynamic sections: Projects, About, Contact, etc.
- 📧 Integrated contact form with serverless email sending
- 📱 Responsive across all devices (desktop, tablet, mobile)
- 🧩 Modular architecture: easy to extend and maintain

---

## 🛠 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: Server Actions (API Route: `/api/send-email`)
- **Deployment Ready**: Vercel, Netlify, or custom VPS
- **Fonts**: Custom web fonts (`GeistVF`, `GeistMonoVF`)

---

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


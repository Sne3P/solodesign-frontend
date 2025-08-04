import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SoloDesign - Portfolio & Projects",
  description: "Portfolio de projets créatifs et modernes",
};

// IMPORTANT :
// Ne jamais modifier la classe du <html> côté client (pas de document.documentElement.classList.add/remove)
// Si besoin d'une classe dynamique (ex: dark mode), la gérer ici côté serveur (SSR) uniquement.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Si besoin d'ajouter une classe dynamique, le faire ici (ex: lire un cookie ou header SSR)
  const htmlClass = `${geistSans.variable} ${geistMono.variable} antialiased`;
  return (
    <html lang="fr" className={htmlClass}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

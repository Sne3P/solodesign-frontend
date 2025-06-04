// app/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { ToastProvider } from "@/lib/hooks/useToast";
import { ToastContainer } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "SoloDesign",
  description: "Plateforme de design professionnel - Moderne et minimaliste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full bg-white antialiased">
        <ToastProvider>
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

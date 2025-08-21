"use client"

import { Toaster } from "../../components/ui/toaster"
import { NotificationProvider } from "../../contexts/NotificationContext"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationProvider>
        {children}
        <Toaster />
      </NotificationProvider>
    </div>
  )
}

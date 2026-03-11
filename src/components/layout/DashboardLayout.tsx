"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-background">

      {sidebarOpen && <Sidebar />}

      <div className="flex flex-col flex-1">

        <Navbar toggleSidebar={toggleSidebar} />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  )
}
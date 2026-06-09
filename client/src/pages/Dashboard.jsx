import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { HiMenu, HiX } from "react-icons/hi"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  console.log(sidebarOpen)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">

      {/* Desktop Sidebar */}
      <div className="lg:block hidden">
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full 
        transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <Sidebar />

        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <HiX size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="lg:hidden mb-4 ml-4 mt-4 text-richblack-5"
        >
          <HiMenu size={28} />
        </button>

        <div className="mx-auto w-11/12 max-w-[1200px] py-6 md:py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
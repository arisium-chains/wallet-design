"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

interface ProfileItem {
  title: string
  description: string
  icon: React.ElementType
  action: () => void
  showChevron?: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "January 2024",
    verified: true,
  })

  const showNotificationMessage = (message: string) => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const profileItems: ProfileItem[] = [
    {
      title: "Account Settings",
      description: "Manage your account preferences",
      icon: CogIcon,
      action: () => router.push("/profile/settings"),
      showChevron: true,
    },
    {
      title: "Notifications",
      description: "Configure notification preferences",
      icon: BellIcon,
      action: () => router.push("/profile/notifications"),
      showChevron: true,
    },
    {
      title: "Help & Support",
      description: "Get help and contact support",
      icon: QuestionMarkCircleIcon,
      action: () => router.push("/profile/support"),
      showChevron: true,
    },
    {
      title: "Sign Out",
      description: "Sign out of your account",
      icon: ArrowRightOnRectangleIcon,
      action: () => showNotificationMessage("Signed out successfully"),
      showChevron: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="font-medium">Signed out successfully</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-6 border-b border-gray-100 animate-slide-down">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Card */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-white" />
                </div>
                {user.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircleIcon className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110">
                    <PencilIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm">Member since {user.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-gray-600 text-sm">Tokens</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-gray-600 text-sm">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-gray-600 text-sm">Security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {profileItems.map((item, index) => (
              <button
                key={item.title}
                onClick={item.action}
                className="w-full p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        item.title === "Sign Out" ? "bg-red-100" : "bg-gray-100 group-hover:bg-blue-100"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          item.title === "Sign Out" ? "text-red-600" : "text-gray-600 group-hover:text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${item.title === "Sign Out" ? "text-red-600" : "text-gray-900"}`}>
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                  {item.showChevron && (
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">PL</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Point Ledger Wallet</h3>
            <p className="text-gray-600 text-sm mb-2">Version 1.0.0</p>
            <p className="text-gray-500 text-xs">Secure, fast, and reliable crypto wallet for Point Ledger Network</p>
          </div>
        </div>
      </div>
    </div>
  )
}

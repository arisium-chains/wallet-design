"use client"

import { useRouter, usePathname } from "next/navigation"
import { HomeIcon, PaperAirplaneIcon, QrCodeIcon, WalletIcon } from "@heroicons/react/24/outline"
import {
  HomeIcon as HomeIconSolid,
  PaperAirplaneIcon as PaperAirplaneIconSolid,
  QrCodeIcon as QrCodeIconSolid,
  WalletIcon as WalletIconSolid,
} from "@heroicons/react/24/solid"

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    {
      label: "Home",
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      path: "/",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Send",
      icon: PaperAirplaneIcon,
      iconSolid: PaperAirplaneIconSolid,
      path: "/send",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Scan",
      icon: QrCodeIcon,
      iconSolid: QrCodeIconSolid,
      path: "/scan",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Tokens",
      icon: WalletIcon,
      iconSolid: WalletIconSolid,
      path: "/tokens",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-white/50 shadow-2xl animate-slide-up">
      <div className="grid grid-cols-4 h-20 px-2">
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.path
          const IconComponent = isActive ? item.iconSolid : item.icon

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-500 hover:scale-110 hover:-translate-y-1 relative group animate-scale-in ${
                isActive ? "text-white" : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`p-3 rounded-3xl transition-all duration-500 shadow-lg ${
                  isActive
                    ? `bg-gradient-to-br ${item.gradient} shadow-xl scale-110`
                    : "group-hover:bg-gray-100 group-hover:scale-105"
                }`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <span
                className={`text-xs font-bold transition-all duration-300 ${
                  isActive ? "text-gray-800" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  className={`absolute -bottom-1 w-16 h-1 bg-gradient-to-r ${item.gradient} rounded-t-full animate-scale-in shadow-lg`}
                ></div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

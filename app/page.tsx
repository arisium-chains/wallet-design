"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserIcon,
  BellIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
} from "@heroicons/react/24/outline"

interface WalletBalance {
  address: string
  balance: string
  usdValue: number
  tokens: TokenBalance[]
}

interface TokenBalance {
  symbol: string
  balance: string
  usdValue: number
  logo: string
  contractAddress: string
}

interface QuickAction {
  title: string
  subtitle: string
  icon: React.ElementType
  gradient: string
  onClick: () => void
}

export default function HomePage() {
  const router = useRouter()
  const [wallet, setWallet] = useState<WalletBalance | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockData = {
        address: "0x682EbA0Fb232E1775687B500F8205",
        balance: "1000.50",
        usdValue: 2450.75,
        tokens: [],
      }
      setWallet(mockData)
    } catch (error) {
      console.error("Failed to fetch wallet data:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const quickActions: QuickAction[] = [
    {
      title: "Portfolio",
      subtitle: "View your assets 💎",
      icon: WalletIcon,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      onClick: () => router.push("/tokens"),
    },
    {
      title: "Security",
      subtitle: "Keep it safe 🔐",
      icon: ShieldCheckIcon,
      gradient: "from-green-400 via-blue-500 to-purple-600",
      onClick: () => router.push("/security"),
    },
    {
      title: "Activity",
      subtitle: "Your history 📊",
      icon: ClockIcon,
      gradient: "from-orange-400 via-red-500 to-pink-500",
      onClick: () => router.push("/activity"),
    },
    {
      title: "Profile",
      subtitle: "Your space 🚀",
      icon: UserIcon,
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      onClick: () => router.push("/profile"),
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 relative overflow-hidden">
      {/* Playful Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-purple-400/30 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-blue-300/30 to-cyan-400/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-green-300/30 to-emerald-400/30 rounded-full blur-xl animate-float-delayed"></div>

        {/* Floating Icons */}
        <div className="absolute top-32 right-16 animate-bounce-slow">
          <SparklesIcon className="h-8 w-8 text-yellow-400/60" />
        </div>
        <div className="absolute bottom-32 left-16 animate-pulse-slow">
          <StarIcon className="h-6 w-6 text-pink-400/60" />
        </div>
        <div className="absolute top-1/2 right-8 animate-bounce-slow" style={{ animationDelay: "1s" }}>
          <FireIcon className="h-7 w-7 text-orange-400/60" />
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm border border-white/20">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <DocumentDuplicateIcon className="h-5 w-5" />
            </div>
            <span className="font-bold">Address copied! 🎉</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-2xl pt-12 pb-6 px-6 border-b border-white/50 animate-fade-in relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="animate-slide-right">
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Hey there! 👋
            </h1>
            <p className="text-gray-600 text-sm mt-1 font-medium">Ready to explore Point Ledger? ✨</p>
          </div>
          <button
            className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl hover:from-purple-600 hover:to-pink-600 transition-all duration-500 hover:scale-110 hover:rotate-12 animate-slide-left shadow-xl hover:shadow-2xl group"
            onClick={() => router.push("/notifications")}
          >
            <BellIcon className="h-6 w-6 text-white group-hover:animate-bounce" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8 relative z-10">
        {/* Balance Card */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] group relative">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 p-8 text-white relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
                <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/20 rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-white/15 rounded-full animate-pulse"></div>
              </div>

              <div className="relative z-10">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-5 bg-white/20 rounded-2xl w-1/3"></div>
                    <div className="h-12 bg-white/20 rounded-2xl w-2/3"></div>
                    <div className="h-4 bg-white/20 rounded-2xl w-1/2"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <p className="text-white/80 text-sm font-bold">Total Balance</p>
                          <SparklesIcon className="h-4 w-4 text-yellow-300 animate-pulse" />
                        </div>
                        <div className="flex items-center space-x-4">
                          <h2 className="text-5xl font-black tracking-tight">
                            {balanceVisible ? `$${wallet?.usdValue?.toLocaleString() || "0.00"}` : "••••••"}
                          </h2>
                          <button
                            onClick={() => setBalanceVisible(!balanceVisible)}
                            className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 group/eye"
                          >
                            {balanceVisible ? (
                              <EyeSlashIcon className="h-6 w-6 group-hover/eye:animate-bounce" />
                            ) : (
                              <EyeIcon className="h-6 w-6 group-hover/eye:animate-bounce" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-400/30 to-green-500/30 backdrop-blur-sm px-5 py-3 rounded-3xl flex items-center space-x-2 animate-bounce-subtle border border-white/20 shadow-lg">
                        <ArrowTrendingUpIcon className="h-5 w-5 animate-pulse" />
                        <span className="text-sm font-black">+2.4% 🚀</span>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-6">
                      <button
                        onClick={copyAddress}
                        className="w-full bg-white/10 backdrop-blur-sm rounded-3xl p-5 flex items-center justify-between hover:bg-white/20 transition-all duration-500 group/address border border-white/10 hover:border-white/30 shadow-lg hover:shadow-xl"
                      >
                        <div className="text-left">
                          <p className="text-white/60 text-xs font-bold">Your Wallet Address 🏠</p>
                          <p className="font-mono text-sm mt-1 font-bold">
                            {wallet?.address ? formatAddress(wallet.address) : "Loading..."}
                          </p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-2xl group-hover/address:scale-110 group-hover/address:rotate-12 transition-all duration-300">
                          <DocumentDuplicateIcon className="h-6 w-6 text-white/80" />
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-2xl font-black text-gray-800">Quick Actions</h3>
            <FireIcon className="h-6 w-6 text-orange-500 animate-bounce" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={action.title}
                onClick={action.onClick}
                className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group animate-scale-in relative overflow-hidden"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>
                <div className="relative z-10">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`p-4 rounded-3xl bg-gradient-to-br ${action.gradient} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                    >
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-800 text-lg">{action.title}</h4>
                      <p className="text-gray-600 text-sm mt-1 font-medium">{action.subtitle}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-black text-gray-800">Recent Activity</h3>
              <ClockIcon className="h-6 w-6 text-blue-500 animate-pulse" />
            </div>
            <button
              onClick={() => router.push("/activity")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All ✨
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-700 group">
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <ClockIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h4 className="font-black text-gray-800 mb-3 text-xl">No transactions yet! 🌟</h4>
              <p className="text-gray-600 text-sm font-medium">Your awesome transaction history will appear here</p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

interface TokenBalance {
  symbol: string
  name: string
  balance: string
  usdValue: number
  priceChange24h: number
  logo: string
  contractAddress: string
  decimals: number
}

export default function TokensPage() {
  const router = useRouter()
  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    setMounted(true)
    fetchTokenBalances()
  }, [])

  const fetchTokenBalances = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockTokens = [
        {
          symbol: "XL3",
          name: "Point Ledger Token",
          balance: "1000000000000000000000",
          usdValue: 1250.5,
          priceChange24h: 5.2,
          logo: "/placeholder.svg?height=40&width=40",
          contractAddress: "0x682EbA0Fb232E1775687B500F8205",
          decimals: 18,
        },
        {
          symbol: "USDT",
          name: "Tether USD",
          balance: "500000000",
          usdValue: 500.0,
          priceChange24h: -0.1,
          logo: "/placeholder.svg?height=40&width=40",
          contractAddress: "0x0987654321098765432109876543210987654321",
          decimals: 6,
        },
        {
          symbol: "WXL3",
          name: "Wrapped XL3",
          balance: "0",
          usdValue: 0,
          priceChange24h: 0,
          logo: "/placeholder.svg?height=40&width=40",
          contractAddress: "0x1111111111111111111111111111111111111111",
          decimals: 18,
        },
        {
          symbol: "SPL",
          name: "Sample Token",
          balance: "0",
          usdValue: 0,
          priceChange24h: 0,
          logo: "/placeholder.svg?height=40&width=40",
          contractAddress: "0x2222222222222222222222222222222222222222",
          decimals: 18,
        },
      ]
      setTokens(mockTokens)
    } catch (error) {
      console.error("Failed to fetch token balances:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = async (address: string, symbol: string) => {
    await navigator.clipboard.writeText(address)
    setNotificationMessage(`${symbol} address copied!`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const formatBalance = (balance: string, decimals = 18) => {
    const num = Number.parseFloat(balance) / Math.pow(10, decimals)
    if (num < 0.0001 && num > 0) return "< 0.0001"
    return num.toLocaleString(undefined, { maximumFractionDigits: 4 })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalUsdValue = tokens.reduce((sum, token) => sum + token.usdValue, 0)

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm">
            <CheckCircleIcon className="h-6 w-6 animate-bounce" />
            <span className="font-semibold">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl pt-12 pb-6 px-6 border-b border-gray-100/50 animate-slide-down relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 hover:-rotate-12"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Token Balances
            </h1>
          </div>
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            {balanceVisible ? (
              <EyeSlashIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 relative z-10">
        {/* Total Value Card */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-8 text-center hover:shadow-3xl transition-all duration-700 group">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <SparklesIcon className="h-6 w-6 text-yellow-500 animate-pulse" />
              <p className="text-gray-600 text-sm font-medium">Total Portfolio Value</p>
              <SparklesIcon className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {balanceVisible ? `$${totalUsdValue.toLocaleString()}` : "••••••"}
            </h2>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-2xl text-sm font-bold animate-bounce-subtle border border-green-200 group-hover:scale-110 transition-transform duration-500">
              <ArrowTrendingUpIcon className="h-5 w-5" />
              <span>+5.2% (24h)</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white/90 backdrop-blur-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
            />
          </div>
        </div>

        {/* Token List */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-500">
            {loading ? (
              <div className="space-y-6 p-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTokens.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
                  <PlusIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No tokens found</h3>
                <p className="text-gray-600 text-sm">
                  {searchQuery ? "Try a different search term" : "Your tokens will appear here"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredTokens.map((token, index) => (
                  <div
                    key={token.contractAddress}
                    className="p-6 hover:bg-gray-50/50 transition-all duration-300 animate-fade-in group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center font-bold text-gray-600 text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        {token.symbol.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{token.symbol}</h4>
                          {Math.abs(token.priceChange24h) > 0 && (
                            <span
                              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-2xl text-xs font-bold transition-all duration-300 hover:scale-105 ${
                                token.priceChange24h > 0
                                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
                                  : "bg-gradient-to-r from-red-100 to-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {token.priceChange24h > 0 ? (
                                <ArrowTrendingUpIcon className="h-3 w-3" />
                              ) : (
                                <ArrowTrendingDownIcon className="h-3 w-3" />
                              )}
                              <span>
                                {token.priceChange24h > 0 ? "+" : ""}
                                {token.priceChange24h.toFixed(2)}%
                              </span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm font-medium mb-1">{token.name}</p>
                        <button
                          onClick={() => copyAddress(token.contractAddress, token.symbol)}
                          className="text-gray-400 text-xs font-mono hover:text-gray-600 transition-all duration-300 hover:scale-105 px-2 py-1 rounded-lg hover:bg-gray-100"
                        >
                          {formatAddress(token.contractAddress)}
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">
                          {balanceVisible ? formatBalance(token.balance, token.decimals) : "••••"}
                        </p>
                        <p className="text-gray-600 text-sm font-medium">
                          {balanceVisible ? `$${token.usdValue.toLocaleString()}` : "••••"}
                        </p>
                      </div>

                      <button
                        onClick={() => copyAddress(token.contractAddress, token.symbol)}
                        className="p-3 hover:bg-gray-200 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl"
                      >
                        <DocumentDuplicateIcon className="h-6 w-6 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Network Info */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="bg-blue-50/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6">
            <p className="text-blue-800 text-sm font-medium">
              <strong>🌐 Network:</strong> Showing balances for Point Ledger Network (Chain ID: 7117). Only ERC-20
              compatible tokens are displayed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

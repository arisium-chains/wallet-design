"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"

interface Transaction {
  id: string
  type: "send" | "receive" | "swap"
  amount: string
  token: string
  address: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  hash: string
  fee: string
}

export default function ActivityPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "send" | "receive" | "swap">("all")

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockTransactions: Transaction[] = [
        {
          id: "1",
          type: "receive",
          amount: "100.50",
          token: "XL3",
          address: "0x1234...5678",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: "completed",
          hash: "0xabcd...efgh",
          fee: "0.001",
        },
        {
          id: "2",
          type: "send",
          amount: "50.00",
          token: "USDT",
          address: "0x9876...5432",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          status: "completed",
          hash: "0xijkl...mnop",
          fee: "0.002",
        },
        {
          id: "3",
          type: "swap",
          amount: "25.75",
          token: "XL3",
          address: "0x5555...6666",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          status: "pending",
          hash: "0xqrst...uvwx",
          fee: "0.003",
        },
      ]
      setTransactions(mockTransactions)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case "pending":
        return <ClockIcon className="h-5 w-5 text-yellow-600" />
      case "failed":
        return <XCircleIcon className="h-5 w-5 text-red-600" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpIcon className="h-5 w-5 text-red-600" />
      case "receive":
        return <ArrowDownIcon className="h-5 w-5 text-green-600" />
      default:
        return <ArrowUpIcon className="h-5 w-5 text-blue-600" />
    }
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.token.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || tx.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-6 border-b border-gray-100 animate-slide-down">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Transaction History</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Search and Filter */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105">
              <FunnelIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex space-x-2 bg-white p-1 rounded-xl border border-gray-200">
            {["all", "send", "receive", "swap"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                  filterType === type
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="space-y-4 p-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600 text-sm">
                  {searchQuery ? "Try a different search term" : "Your transactions will appear here"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredTransactions.map((tx, index) => (
                  <div
                    key={tx.id}
                    className="p-4 hover:bg-gray-50 transition-all duration-300 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => router.push(`/activity/${tx.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center relative">
                        {getTypeIcon(tx.type)}
                        <div className="absolute -bottom-1 -right-1">{getStatusIcon(tx.status)}</div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900 capitalize">{tx.type}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              tx.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : tx.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm font-mono">{tx.address}</p>
                        <p className="text-gray-500 text-xs">{formatTime(tx.timestamp)}</p>
                      </div>

                      <div className="text-right">
                        <p className={`font-semibold ${tx.type === "receive" ? "text-green-600" : "text-gray-900"}`}>
                          {tx.type === "receive" ? "+" : "-"}
                          {tx.amount} {tx.token}
                        </p>
                        <p className="text-gray-500 text-sm">Fee: {tx.fee} XL3</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

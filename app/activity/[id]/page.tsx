"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
} from "@heroicons/react/24/outline"

interface TransactionDetail {
  id: string
  type: "send" | "receive" | "swap"
  amount: string
  token: string
  address: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  hash: string
  fee: string
  blockNumber: string
  confirmations: number
}

export default function TransactionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [transaction, setTransaction] = useState<TransactionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    fetchTransactionDetail()
  }, [params.id])

  const fetchTransactionDetail = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockTransaction: TransactionDetail = {
        id: params.id as string,
        type: "receive",
        amount: "100.50",
        token: "XL3",
        address: "0x1234567890123456789012345678901234567890",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: "completed",
        hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        fee: "0.001",
        blockNumber: "12345678",
        confirmations: 24,
      }
      setTransaction(mockTransaction)
    } catch (error) {
      console.error("Failed to fetch transaction:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-8 w-8 text-green-600" />
      case "pending":
        return <ClockIcon className="h-8 w-8 text-yellow-600" />
      case "failed":
        return <XCircleIcon className="h-8 w-8 text-red-600" />
      default:
        return <ClockIcon className="h-8 w-8 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-emerald-600"
      case "pending":
        return "from-yellow-500 to-orange-600"
      case "failed":
        return "from-red-500 to-red-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-20">
        <div className="bg-white/80 backdrop-blur-xl pt-12 pb-6 px-6 border-b border-gray-100/50">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
            </button>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
        <div className="px-6 py-6 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction not found</h2>
          <button onClick={() => router.back()} className="text-blue-600 hover:text-blue-700 font-semibold">
            Go back
          </button>
        </div>
      </div>
    )
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
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6" />
            <span className="font-semibold">Copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl pt-12 pb-6 px-6 border-b border-gray-100/50 animate-slide-down relative z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 hover:-rotate-12"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Transaction Details
          </h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 relative z-10">
        {/* Status Card */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-8 text-center hover:shadow-3xl transition-all duration-700">
            <div
              className={`w-20 h-20 bg-gradient-to-br ${getStatusColor(transaction.status)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-subtle`}
            >
              {getStatusIcon(transaction.status)}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
              {transaction.type} {transaction.status}
            </h2>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {transaction.type === "receive" ? "+" : "-"}
              {transaction.amount} {transaction.token}
            </p>
            <p className="text-gray-500 font-medium">
              {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-500">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Transaction Information</h3>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-300">
                <span className="text-gray-600 font-medium">Transaction Hash</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm text-gray-900">
                    {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(transaction.hash, "Hash")}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-300">
                <span className="text-gray-600 font-medium">Block Number</span>
                <span className="font-semibold text-gray-900">{transaction.blockNumber}</span>
              </div>
              <div className="p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-300">
                <span className="text-gray-600 font-medium">Confirmations</span>
                <span className="font-semibold text-gray-900">{transaction.confirmations}</span>
              </div>
              <div className="p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-300">
                <span className="text-gray-600 font-medium">Network Fee</span>
                <span className="font-semibold text-gray-900">{transaction.fee} XL3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-500">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {transaction.type === "receive" ? "From" : "To"} Address
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-gray-900 break-all">{transaction.address}</span>
                <button
                  onClick={() => copyToClipboard(transaction.address, "Address")}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110 ml-4"
                >
                  <DocumentDuplicateIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => window.open(`https://explorer.pointledger.com/tx/${transaction.hash}`, "_blank")}
              className="flex items-center justify-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group"
            >
              <ArrowTopRightOnSquareIcon className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-900">View on Explorer</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Transaction Details",
                    text: `Transaction: ${transaction.hash}`,
                    url: window.location.href,
                  })
                }
              }}
              className="flex items-center justify-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group"
            >
              <ShareIcon className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-900">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

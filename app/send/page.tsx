"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  QrCodeIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  RocketLaunchIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"

interface Token {
  symbol: string
  balance: string
  usdValue: number
  logo: string
  contractAddress: string
}

interface SendFormData {
  recipient: string
  amount: string
  selectedToken: Token | null
  memo: string
}

export default function SendPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SendFormData>({
    recipient: "",
    amount: "",
    selectedToken: null,
    memo: "",
  })
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    const mockTokens = [
      {
        symbol: "XL3",
        balance: "1000.50",
        usdValue: 1.25,
        logo: "/placeholder.svg?height=32&width=32",
        contractAddress: "0x1234567890123456789012345678901234567890",
      },
      {
        symbol: "USDT",
        balance: "500.00",
        usdValue: 1.0,
        logo: "/placeholder.svg?height=32&width=32",
        contractAddress: "0x0987654321098765432109876543210987654321",
      },
    ]
    setTokens(mockTokens)
    if (mockTokens.length > 0) {
      setFormData((prev) => ({ ...prev, selectedToken: mockTokens[0] }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.recipient) {
      newErrors.recipient = "Recipient address is required"
    } else if (!formData.recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
      newErrors.recipient = "Invalid Ethereum address format"
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required"
    } else if (Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    } else if (
      formData.selectedToken &&
      Number.parseFloat(formData.amount) > Number.parseFloat(formData.selectedToken.balance)
    ) {
      newErrors.amount = "Insufficient balance"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSend = async () => {
    if (!validateForm()) return
    setShowConfirmDialog(true)
  }

  const confirmSend = async () => {
    try {
      setLoading(true)
      setShowConfirmDialog(false)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Send failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const setMaxAmount = () => {
    if (formData.selectedToken) {
      setFormData((prev) => ({ ...prev, amount: prev.selectedToken?.balance || "0" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 relative overflow-hidden">
      {/* Playful Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-orange-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-pink-300/20 to-purple-400/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-8 animate-bounce-slow">
          <RocketLaunchIcon className="h-8 w-8 text-blue-400/60" />
        </div>
        <div className="absolute bottom-1/3 right-12 animate-pulse-slow">
          <HeartIcon className="h-6 w-6 text-pink-400/60" />
        </div>
      </div>

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-[2rem] p-12 mx-6 text-center animate-scale-in shadow-2xl border border-white/50 max-w-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl">
              <CheckCircleIcon className="h-14 w-14 text-white" />
            </div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SparklesIcon className="h-6 w-6 text-yellow-500 animate-pulse" />
              <h3 className="text-2xl font-black text-gray-800">Transaction Sent!</h3>
              <SparklesIcon className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-gray-600 font-medium">Your transaction is flying through the blockchain! 🚀</p>
            <div className="mt-6 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-2xl pt-12 pb-6 px-6 border-b border-white/50 animate-slide-down relative z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl transition-all duration-300 hover:scale-110 hover:-rotate-12 shadow-lg hover:shadow-xl"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Send Tokens
            </h1>
            <RocketLaunchIcon className="h-6 w-6 text-purple-500 animate-bounce" />
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 relative z-10">
        {/* Token Selection */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="font-black text-gray-800 text-lg">Select Token</h3>
              <SparklesIcon className="h-5 w-5 text-yellow-500 animate-pulse" />
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {tokens.map((token, index) => (
                <button
                  key={token.symbol}
                  onClick={() => setFormData((prev) => ({ ...prev, selectedToken: token }))}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-3xl border-2 transition-all duration-500 whitespace-nowrap hover:scale-105 hover:-translate-y-1 animate-scale-in shadow-lg ${
                    formData.selectedToken?.symbol === token.symbol
                      ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-purple-200"
                      : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-xl"
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {token.symbol.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="font-black">{token.symbol}</span>
                    <p className="text-sm text-gray-500 font-medium">({Number.parseFloat(token.balance).toFixed(2)})</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.token && (
              <p className="text-red-500 text-sm mt-3 flex items-center space-x-2 animate-shake font-medium">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{errors.token}</span>
              </p>
            )}
          </div>
        </div>

        {/* Recipient Address */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="font-black text-gray-800 text-lg">Send To</h3>
              <HeartIcon className="h-5 w-5 text-pink-500 animate-pulse" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="0x... (Paste wallet address here)"
                value={formData.recipient}
                onChange={(e) => setFormData((prev) => ({ ...prev, recipient: e.target.value }))}
                className={`w-full px-6 py-5 pr-16 bg-gray-50/80 border-2 rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg font-mono font-medium placeholder:text-gray-400 ${
                  errors.recipient
                    ? "border-red-300 bg-red-50/80 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
              <button
                onClick={() => router.push("/scan?mode=address")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl"
              >
                <QrCodeIcon className="h-6 w-6" />
              </button>
            </div>
            {errors.recipient && (
              <p className="text-red-500 text-sm mt-3 flex items-center space-x-2 animate-shake font-medium">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{errors.recipient}</span>
              </p>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-gray-800 text-lg">Amount</h3>
                <SparklesIcon className="h-5 w-5 text-yellow-500 animate-pulse" />
              </div>
              {formData.selectedToken && (
                <button
                  onClick={setMaxAmount}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Max: {Number.parseFloat(formData.selectedToken.balance).toFixed(2)} ⚡
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                className={`w-full px-6 py-6 bg-gray-50/80 border-2 rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-3xl font-black placeholder:text-gray-400 ${
                  errors.amount
                    ? "border-red-300 bg-red-50/80 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
            </div>
            {formData.amount && formData.selectedToken && (
              <p className="text-gray-500 text-sm mt-3 font-bold">
                ≈ ${(Number.parseFloat(formData.amount) * formData.selectedToken.usdValue).toFixed(2)} USD 💰
              </p>
            )}
            {errors.amount && (
              <p className="text-red-500 text-sm mt-3 flex items-center space-x-2 animate-shake font-medium">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span>{errors.amount}</span>
              </p>
            )}
          </div>
        </div>

        {/* Send Button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={handleSend}
            disabled={loading || !formData.recipient || !formData.amount || !formData.selectedToken}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 flex items-center justify-center space-x-3 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center space-x-3">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-8 w-8" />
                  <span>Send Tokens 🚀</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-[2rem] p-8 mx-6 max-w-sm w-full animate-scale-in shadow-2xl border border-white/50">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                <CheckCircleIcon className="h-14 w-14 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">Confirm Transaction ✨</h3>
              <div className="space-y-2">
                <p className="text-4xl font-black text-gray-800">
                  {formData.amount} {formData.selectedToken?.symbol}
                </p>
                <p className="text-gray-500 font-bold">
                  ≈ $
                  {formData.selectedToken
                    ? (Number.parseFloat(formData.amount) * formData.selectedToken.usdValue).toFixed(2)
                    : "0.00"}{" "}
                  USD 💰
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-bold">To:</span>
                <span className="font-mono text-sm font-black">
                  {formData.recipient.slice(0, 6)}...{formData.recipient.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-bold">Network Fee:</span>
                <span className="font-black">~$0.50 ⚡</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-3xl font-black text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmSend}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl font-black hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {loading ? "Sending... 🚀" : "Confirm ✨"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

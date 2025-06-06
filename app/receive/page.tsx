"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  WalletIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import { QRCodeSVG } from "qrcode.react"

interface WalletInfo {
  address: string
  qrData: string
}

export default function ReceivePage() {
  const router = useRouter()
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    fetchWalletInfo()
  }, [])

  const fetchWalletInfo = async () => {
    const mockData = {
      address: "0x682EbA0Fb232E1775687B500F8205",
      qrData: "0x682EbA0Fb232E1775687B500F8205",
    }
    setWallet(mockData)
  }

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address)
      showNotificationMessage("Address copied to clipboard!")
    }
  }

  const shareAddress = async () => {
    if (wallet?.address && navigator.share) {
      try {
        await navigator.share({
          title: "My Wallet Address",
          text: `Send tokens to my wallet: ${wallet.address}`,
        })
      } catch (error) {
        copyAddress()
      }
    } else {
      copyAddress()
    }
  }

  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 hover:-rotate-12"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Receive Tokens
          </h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 relative z-10">
        {/* Instructions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-blue-50/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6 flex items-start space-x-4">
            <WalletIcon className="h-8 w-8 text-blue-600 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2 text-lg flex items-center space-x-2">
                <span>How to receive tokens</span>
                <SparklesIcon className="h-5 w-5 animate-pulse" />
              </h3>
              <p className="text-blue-700 text-sm">
                Share your wallet address or QR code to receive tokens on Point Ledger network
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-10 text-center hover:shadow-3xl transition-all duration-700 group">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Your Wallet QR Code</h3>

            {wallet && (
              <div className="inline-block p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 mb-8 hover:scale-105 transition-all duration-500 group-hover:rotate-3">
                <QRCodeSVG
                  value={wallet.qrData || wallet.address}
                  size={220}
                  level="M"
                  includeMargin={true}
                  fgColor="#1f2937"
                />
              </div>
            )}

            <p className="text-gray-600 text-sm mb-8 font-medium">Scan this QR code to get your wallet address</p>

            <div className="flex space-x-4">
              <button
                onClick={copyAddress}
                className="flex-1 flex items-center justify-center space-x-3 py-4 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group/copy"
              >
                <DocumentDuplicateIcon className="h-6 w-6 group-hover/copy:scale-110 group-hover/copy:rotate-12 transition-all duration-300" />
                <span>Copy QR</span>
              </button>
              <button
                onClick={shareAddress}
                className="flex-1 flex items-center justify-center space-x-3 py-4 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group/share"
              >
                <ShareIcon className="h-6 w-6 group-hover/share:scale-110 group-hover/share:rotate-12 transition-all duration-300" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:shadow-xl transition-all duration-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Your Wallet Address</h3>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 border border-gray-200 hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
              <p className="font-mono text-sm text-gray-800 break-all leading-relaxed font-medium">
                {wallet?.address || "Loading..."}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={copyAddress}
                className="flex-1 flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <DocumentDuplicateIcon className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span>Copy Address</span>
              </button>
              <button
                onClick={shareAddress}
                className="flex-1 flex items-center justify-center space-x-3 py-4 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <ShareIcon className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Network Info */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:shadow-xl transition-all duration-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Network Information</h3>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-2xl text-sm font-bold border border-blue-300 hover:scale-105 transition-transform duration-300">
                Point Ledger Network
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-2xl text-sm font-bold border border-purple-300 hover:scale-105 transition-transform duration-300">
                Chain ID: 7117
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-2xl text-sm font-bold border border-green-300 hover:scale-105 transition-transform duration-300">
                Native Token: XL3
              </span>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
              <p className="text-yellow-800 text-sm font-medium">
                <strong>⚠️ Important:</strong> Only send tokens that are compatible with Point Ledger network to this
                address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

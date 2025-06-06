"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeftIcon,
  BoltIcon,
  BoltSlashIcon,
  CameraIcon,
  QrCodeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

interface QRScannerProps {
  onScan: (data: string) => void
  onError: (error: string) => void
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [flashOn, setFlashOn] = useState(false)

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setHasPermission(true)
      }
    } catch (error) {
      console.error("Camera access denied:", error)
      setHasPermission(false)
      onError("Camera access denied. Please enable camera permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const toggleFlash = async () => {
    try {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const track = stream.getVideoTracks()[0]
        const capabilities = track.getCapabilities()

        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{ torch: !flashOn } as any],
          })
          setFlashOn(!flashOn)
        }
      }
    } catch (error) {
      console.error("Flash toggle failed:", error)
    }
  }

  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (hasPermission === false) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start space-x-4">
        <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mt-1" />
        <div>
          <h3 className="font-bold text-red-900 mb-2 text-lg">Camera Access Required</h3>
          <p className="text-red-700 text-sm">
            Camera access is required to scan QR codes. Please enable camera permissions and refresh the page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-80 object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 flex items-center justify-center">
        <div className="relative w-56 h-56 border-4 border-white rounded-3xl shadow-2xl">
          {/* Corner indicators */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-white rounded-tl-2xl animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-white rounded-tr-2xl animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-white rounded-bl-2xl animate-pulse"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-white rounded-br-2xl animate-pulse"></div>

          {/* Scanning line animation */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-scan-line shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Flash button */}
      <button
        onClick={toggleFlash}
        className="absolute top-6 right-6 p-4 bg-black/50 backdrop-blur-sm rounded-2xl text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg"
      >
        {flashOn ? <BoltSlashIcon className="h-7 w-7" /> : <BoltIcon className="h-7 w-7" />}
      </button>
    </div>
  )
}

export default function ScanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  const [scanning, setScanning] = useState(true)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleScan = (data: string) => {
    try {
      setScanning(false)

      if (mode === "address") {
        if (data.match(/^0x[a-fA-F0-9]{40}$/)) {
          router.push(`/send?address=${data}`)
        } else {
          throw new Error("Invalid address format")
        }
      } else {
        const paymentData = JSON.parse(data)
        router.push(`/send?recipient=${paymentData.address}&amount=${paymentData.amount}&token=${paymentData.token}`)
      }
    } catch (error) {
      console.error("QR scan error:", error)
      setErrorMessage("Invalid QR code format. Please try again.")
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      setScanning(true)
    }
  }

  const handleError = (error: string) => {
    setErrorMessage(error)
    setShowError(true)
    setTimeout(() => setShowError(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm">
            <ExclamationTriangleIcon className="h-6 w-6 animate-bounce" />
            <span className="font-semibold">{errorMessage}</span>
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
            Scan QR Code
          </h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 relative z-10">
        {/* Instructions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-blue-50/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6 flex items-start space-x-4">
            <QrCodeIcon className="h-8 w-8 text-blue-600 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2 text-lg">Scan Instructions</h3>
              <p className="text-blue-700 text-sm">
                {mode === "address"
                  ? "Scan a wallet address QR code to auto-fill the recipient field"
                  : "Scan a payment request QR code to process the transaction"}
              </p>
            </div>
          </div>
        </div>

        {/* Scanner Card */}
        <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden hover:shadow-3xl transition-all duration-700">
            {scanning && <QRScanner onScan={handleScan} onError={handleError} />}
          </div>
        </div>

        {!scanning && (
          <div className="text-center py-12 animate-fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 font-bold text-lg">Processing QR code...</p>
          </div>
        )}

        {/* Manual Input Option */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-8 text-center hover:shadow-xl transition-all duration-500 group">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <CameraIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Having trouble scanning?</h3>
            <p className="text-gray-600 text-sm mb-6">Make sure the QR code is well-lit and within the frame</p>
            <button
              onClick={() => router.push(mode === "address" ? "/send" : "/")}
              className="px-8 py-4 border-2 border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Enter Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  LockClosedIcon,
  FingerprintIcon,
} from "@heroicons/react/24/outline"

interface SecuritySetting {
  id: string
  title: string
  description: string
  icon: React.ElementType
  enabled: boolean
  action: () => void
}

export default function SecurityPage() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [settings, setSettings] = useState({
    biometric: true,
    twoFactor: false,
    autoLock: true,
    notifications: true,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    setNotificationMessage(`${key} ${settings[key] ? "disabled" : "enabled"}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const securitySettings: SecuritySetting[] = [
    {
      id: "biometric",
      title: "Biometric Authentication",
      description: "Use fingerprint or face ID to unlock",
      icon: FingerprintIcon,
      enabled: settings.biometric,
      action: () => toggleSetting("biometric"),
    },
    {
      id: "twoFactor",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      icon: ShieldCheckIcon,
      enabled: settings.twoFactor,
      action: () => toggleSetting("twoFactor"),
    },
    {
      id: "autoLock",
      title: "Auto Lock",
      description: "Automatically lock after 5 minutes",
      icon: LockClosedIcon,
      enabled: settings.autoLock,
      action: () => toggleSetting("autoLock"),
    },
    {
      id: "notifications",
      title: "Security Notifications",
      description: "Get alerts for security events",
      icon: DevicePhoneMobileIcon,
      enabled: settings.notifications,
      action: () => toggleSetting("notifications"),
    },
  ]

  const securityActions = [
    {
      title: "Change PIN",
      description: "Update your wallet PIN",
      icon: KeyIcon,
      action: () => router.push("/security/pin"),
    },
    {
      title: "Recovery Phrase",
      description: "View or backup your seed phrase",
      icon: EyeIcon,
      action: () => router.push("/security/recovery"),
    },
    {
      title: "Connected Apps",
      description: "Manage connected applications",
      icon: DevicePhoneMobileIcon,
      action: () => router.push("/security/apps"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="font-medium">{notificationMessage}</span>
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
          <h1 className="text-xl font-bold text-gray-900">Security Settings</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Security Status */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Wallet Secured</h2>
                <p className="text-green-100">Your wallet is protected</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Security Score</span>
                <span className="font-bold">85/100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full w-4/5 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Security Features</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {securitySettings.map((setting, index) => (
              <div
                key={setting.id}
                className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <setting.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{setting.title}</h4>
                      <p className="text-gray-600 text-sm">{setting.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={setting.action}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                      setting.enabled ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        setting.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Actions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Security Actions</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {securityActions.map((action, index) => (
              <button
                key={action.title}
                onClick={action.action}
                className="w-full p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <action.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{action.title}</h4>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Lost Device?</h4>
              <p className="text-gray-600 text-sm mb-4">
                If your device is lost or stolen, you can remotely disable wallet access
              </p>
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105">
                Emergency Lock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

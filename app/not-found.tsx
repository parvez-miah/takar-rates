"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Globe, Calculator } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-pulse">
            ৪০৪
          </div>
          <div className="text-6xl mb-4 animate-bounce">😕</div>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl shadow-blue-500/10">
          <CardContent className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">পৃষ্ঠা পাওয়া যায়নি</h1>
            <p className="text-xl text-gray-600 mb-6">দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি আমাদের কাছে নেই।</p>
            <p className="text-gray-500 mb-8">হয়তো লিংকটি ভুল অথবা পৃষ্ঠাটি সরানো হয়েছে। নিচের বিকল্পগুলো দেখুন:</p>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <Home className="w-5 h-5 mr-2" />
                  হোম পেজে যান
                </Button>
              </Link>
              <Link href="/#converter">
                <Button
                  variant="outline"
                  className="w-full border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Currency Converter
                </Button>
              </Link>
            </div>

            {/* Popular Links */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Globe className="w-5 h-5" />
                জনপ্রিয় মুদ্রার রেট
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  href="/usd-to-bdt"
                  className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-300 text-center group"
                >
                  <div className="text-2xl mb-1">🇺🇸</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700">USD to BDT</div>
                </Link>
                <Link
                  href="/eur-to-bdt"
                  className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-300 text-center group"
                >
                  <div className="text-2xl mb-1">🇪🇺</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700">EUR to BDT</div>
                </Link>
                <Link
                  href="/gbp-to-bdt"
                  className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-300 text-center group"
                >
                  <div className="text-2xl mb-1">🇬🇧</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700">GBP to BDT</div>
                </Link>
                <Link
                  href="/inr-to-bdt"
                  className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-300 text-center group"
                >
                  <div className="text-2xl mb-1">🇮🇳</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700">INR to BDT</div>
                </Link>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>সাহায্য প্রয়োজন?</strong> আমাদের হোম পেজে গিয়ে সব ধরনের মুদ্রার রেট এবং currency converter ব্যবহার করুন।
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            পূর্বের পৃষ্ঠায় ফিরে যান
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft, Loader2, Calculator, TrendingUp, Globe } from "lucide-react"
import Link from "next/link"

interface CurrencyPairConverterProps {
  fromCurrency: string
  toCurrency: string
  pairName: string
}

// Function to convert English numbers to Bengali
const toBengaliNumber = (num: string | number): string => {
  const englishToBengali: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
  }

  return num.toString().replace(/[0-9.]/g, (match) => englishToBengali[match] || match)
}

// Function to convert Bengali numbers to English for calculations
const toEnglishNumber = (bengaliNum: string): string => {
  const bengaliToEnglish: { [key: string]: string } = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  }

  return bengaliNum.replace(/[০-৯]/g, (match) => bengaliToEnglish[match] || match)
}

const getCurrencyFlag = (currency: string): string => {
  const flags: { [key: string]: string } = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    AUD: "🇦🇺",
    CAD: "🇨🇦",
    CHF: "🇨🇭",
    CNY: "🇨🇳",
    INR: "🇮🇳",
    BDT: "🇧🇩",
    SAR: "🇸🇦",
    AED: "🇦🇪",
  }
  return flags[currency] || "💱"
}

export default function CurrencyPairConverter({ fromCurrency, toCurrency, pairName }: CurrencyPairConverterProps) {
  const [amount, setAmount] = useState<string>("১")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const convertCurrency = async () => {
    const englishAmount = toEnglishNumber(amount)
    if (!englishAmount || isNaN(Number(englishAmount))) {
      setError("অনুগ্রহ করে একটি বৈধ পরিমাণ লিখুন")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }

      const data = await response.json()
      const rate = data.rates[toCurrency]

      if (!rate) {
        throw new Error("Currency not supported")
      }

      const convertedAmount = Number(englishAmount) * rate
      setResult(convertedAmount)
      setExchangeRate(rate)
      setLastUpdated(new Date().toLocaleString("bn-BD"))
    } catch (err) {
      setError("মুদ্রা রূপান্তর করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।")
      console.error("Conversion error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[০-৯0-9.]*$/.test(value)) {
      setAmount(value)
    }
  }

  useEffect(() => {
    const englishAmount = toEnglishNumber(amount)
    if (englishAmount) {
      const timeoutId = setTimeout(() => {
        convertCurrency()
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [amount])

  useEffect(() => {
    convertCurrency()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                হোম
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                আজকের টাকার রেট
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">{pairName}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto pt-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
            <Globe className="w-5 h-5" />
            <span>লাইভ এক্সচেঞ্জ রেট</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            {pairName}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {fromCurrency} to {toCurrency} - Live Exchange Rate
          </p>
          <div className="flex items-center justify-center gap-4 text-3xl mb-4">
            <span>{getCurrencyFlag(fromCurrency)}</span>
            <ArrowRightLeft className="w-6 h-6 text-gray-400" />
            <span>{getCurrencyFlag(toCurrency)}</span>
          </div>
        </div>

        {/* Current Rate Display */}
        {exchangeRate && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-sm text-green-600 mb-2">বর্তমান রেট</div>
                <div className="text-3xl font-bold text-green-800 mb-2">
                  ১ {fromCurrency} = {toBengaliNumber(exchangeRate.toFixed(4))} {toCurrency}
                </div>
                <div className="text-sm text-green-600">সর্বশেষ আপডেট: {toBengaliNumber(lastUpdated)}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Currency Converter */}
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl shadow-blue-500/10 mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
              <Calculator className="w-7 h-7" />
              {fromCurrency} থেকে {toCurrency} রূপান্তরকারী
            </CardTitle>
            <CardDescription className="text-blue-100 text-center">
              সর্বশেষ এক্সচেঞ্জ রেট দিয়ে {pairName} রূপান্তর করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="amount" className="text-gray-700 font-semibold text-lg flex items-center gap-2">
                  <span>{getCurrencyFlag(fromCurrency)}</span>
                  {fromCurrency} পরিমাণ
                </Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="পরিমাণ লিখুন"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-xl font-bold border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl h-14"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-semibold text-lg flex items-center gap-2">
                  <span>{getCurrencyFlag(toCurrency)}</span>
                  {toCurrency} ফলাফল
                </Label>
                <div className="h-14 bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center px-4">
                  {loading ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      গণনা করা হচ্ছে...
                    </div>
                  ) : result !== null ? (
                    <div className="text-xl font-bold text-green-700">
                      {toBengaliNumber(
                        result.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }),
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400">ফলাফল এখানে দেখাবে</div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 text-sm text-red-700 bg-red-50 border-l-4 border-red-400 rounded-lg" role="alert">
                {error}
              </div>
            )}

            {/* Add Credit Section after error handling */}
            {result !== null && !error && (
              <div className="relative mt-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 rounded-xl shadow-2xl border-2 border-white/20">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-white font-bold text-lg">এক্সচেঞ্জ রেট প্রদানকারী:</div>
                    </div>
                    <a
                      href="https://ajkertakarrate.com/"
                      target="_blank"
                      className="inline-block bg-white text-blue-600 font-bold text-xl px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      আজকের টাকার রেট
                    </a>
                    <div className="mt-3 text-white/90 text-sm">বিশ্বস্ত ও নির্ভরযোগ্য মুদ্রার হার</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              {pairName} সম্পর্কে
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              {pairName} এর রেট প্রতিদিন পরিবর্তিত হয় আন্তর্জাতিক বাজারের অবস্থার উপর ভিত্তি করে। আমাদের ওয়েবসাইটে আপনি পাবেন সবচেয়ে
              আপডেট এবং নির্ভরযোগ্য {fromCurrency} থেকে {toCurrency} এর রেট।
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">রিয়েল-টাইম রেট</h4>
                <p className="text-blue-700 text-sm">
                  আমাদের {fromCurrency} to {toCurrency} রেট প্রতি মিনিটে আপডেট হয় আন্তর্জাতিক বাজার থেকে।
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">নির্ভরযোগ্য তথ্য</h4>
                <p className="text-green-700 text-sm">আমরা বিশ্বস্ত আন্তর্জাতিক API থেকে {pairName} এর তথ্য সংগ্রহ করি।</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
          >
            ← সব মুদ্রার রেট দেখুন
          </Link>
        </div>
      </div>
    </div>
  )
}

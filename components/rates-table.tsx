"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ExchangeRate {
  currency: string
  name: string
  flag: string
  rate: number
  change?: number
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
    "-": "-",
    "+": "+",
  }

  return num.toString().replace(/[0-9.\-+]/g, (match) => englishToBengali[match] || match)
}

const popularCurrencies = [
  { code: "USD", name: "মার্কিন ডলার", flag: "🇺🇸" },
  { code: "EUR", name: "ইউরো", flag: "🇪🇺" },
  { code: "GBP", name: "ব্রিটিশ পাউন্ড", flag: "🇬🇧" },
  { code: "JPY", name: "জাপানি ইয়েন", flag: "🇯🇵" },
  { code: "AUD", name: "অস্ট্রেলিয়ান ডলার", flag: "🇦🇺" },
  { code: "CAD", name: "কানাডিয়ান ডলার", flag: "🇨🇦" },
  { code: "CHF", name: "সুইস ফ্রাঙ্ক", flag: "🇨🇭" },
  { code: "CNY", name: "চীনা ইউয়ান", flag: "🇨🇳" },
  { code: "INR", name: "ভারতীয় রুপি", flag: "🇮🇳" },
  { code: "SGD", name: "সিঙ্গাপুর ডলার", flag: "🇸🇬" },
]

export default function RatesTable() {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/BDT")
        const data = await response.json()

        const exchangeRates: ExchangeRate[] = popularCurrencies.map((currency) => ({
          currency: currency.code,
          name: currency.name,
          flag: currency.flag,
          rate: 1 / data.rates[currency.code], // Convert to BDT base
          change: Math.random() * 4 - 2, // Mock change data
        }))

        setRates(exchangeRates)
        setLastUpdated(new Date().toLocaleString("bn-BD"))
      } catch (error) {
        console.error("Error fetching rates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3 text-green-600" />
    if (change < 0) return <TrendingDown className="w-3 h-3 text-red-600" />
    return <Minus className="w-3 h-3 text-gray-400" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600 bg-green-50"
    if (change < 0) return "text-red-600 bg-red-50"
    return "text-gray-600 bg-gray-50"
  }

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-gray-800">আজকের এক্সচেঞ্জ রেট</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold text-center">আজকের এক্সচেঞ্জ রেট</CardTitle>
        <p className="text-emerald-100 text-sm text-center">১ টাকার বিনিময়ে</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {rates.map((rate, index) => (
            <div
              key={rate.currency}
              className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{rate.flag}</div>
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {rate.currency}
                    </div>
                    <div className="text-sm text-gray-600">{rate.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800">{toBengaliNumber(rate.rate.toFixed(4))}</div>
                  {rate.change !== undefined && (
                    <Badge variant="outline" className={`text-xs ${getTrendColor(rate.change)}`}>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(rate.change)}
                        <span>{toBengaliNumber(Math.abs(rate.change).toFixed(2))}%</span>
                      </div>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">সর্বশেষ আপডেট: {toBengaliNumber(lastUpdated)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

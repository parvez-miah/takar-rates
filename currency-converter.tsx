"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, Loader2, Globe, Calculator } from "lucide-react"
import RatesTable from "./components/rates-table"

const currencies = [
  { code: "USD", name: "মার্কিন ডলার", flag: "🇺🇸" },
  { code: "EUR", name: "ইউরো", flag: "🇪🇺" },
  { code: "GBP", name: "ব্রিটিশ পাউন্ড", flag: "🇬🇧" },
  { code: "JPY", name: "জাপানি ইয়েন", flag: "🇯🇵" },
  { code: "AUD", name: "অস্ট্রেলিয়ান ডলার", flag: "🇦🇺" },
  { code: "CAD", name: "কানাডিয়ান ডলার", flag: "🇨🇦" },
  { code: "CHF", name: "সুইস ফ্রাঙ্ক", flag: "🇨🇭" },
  { code: "CNY", name: "চীনা ইউয়ান", flag: "🇨🇳" },
  { code: "INR", name: "ভারতীয় রুপি", flag: "🇮🇳" },
  { code: "BDT", name: "বাংলাদেশি টাকা", flag: "🇧🇩" },
  { code: "KRW", name: "দক্ষিণ কোরিয়ান ওন", flag: "🇰🇷" },
  { code: "MXN", name: "মেক্সিকান পেসো", flag: "🇲🇽" },
  { code: "SGD", name: "সিঙ্গাপুর ডলার", flag: "🇸🇬" },
  { code: "NZD", name: "নিউজিল্যান্ড ডলার", flag: "🇳🇿" },
  { code: "NOK", name: "নরওয়েজিয়ান ক্রোন", flag: "🇳🇴" },
  { code: "SEK", name: "সুইডিশ ক্রোনা", flag: "🇸🇪" },
]

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

export default function Component() {
  const [amount, setAmount] = useState<string>("১")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("BDT")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)

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
    } catch (err) {
      setError("মুদ্রা রূপান্তর করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।")
      console.error("Conversion error:", err)
    } finally {
      setLoading(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
    setExchangeRate(null)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow Bengali and English numbers
    if (/^[০-৯0-9.]*$/.test(value)) {
      setAmount(value)
    }
  }

  useEffect(() => {
    const englishAmount = toEnglishNumber(amount)
    if (englishAmount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      const timeoutId = setTimeout(() => {
        convertCurrency()
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <Globe className="w-5 h-5" />
            <span>লাইভ এক্সচেঞ্জ রেট</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            আজকের টাকার রেট – সকল দেশের
          </h1>
          <p className="text-xl text-gray-600 mb-2">Ajker Takar Rate</p>
          <p className="text-gray-500">সবচেয়ে সঠিক ও আপডেট মুদ্রার হার</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Currency Converter */}
          <div>
            <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                  <Calculator className="w-7 h-7" />
                  মুদ্রা রূপান্তরকারী
                </CardTitle>
                <CardDescription className="text-blue-100 text-center">
                  রিয়েল-টাইম এক্সচেঞ্জ রেট সহ বিভিন্ন মুদ্রার মধ্যে রূপান্তর করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-gray-700 font-semibold text-lg">
                    পরিমাণ
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="text"
                      placeholder="পরিমাণ লিখুন"
                      value={amount}
                      onChange={handleAmountChange}
                      className="text-xl font-bold border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl h-14 pl-4 pr-12"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">৳</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="from-currency" className="text-gray-700 font-semibold text-lg">
                      থেকে
                    </Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger
                        id="from-currency"
                        className="border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl h-14"
                      >
                        <SelectValue placeholder="মুদ্রা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{currency.flag}</span>
                              <span className="font-semibold">{currency.code}</span>
                              <span className="text-gray-600">- {currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapCurrencies}
                      className="rounded-full border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 shadow-lg w-12 h-12"
                    >
                      <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                      <span className="sr-only">মুদ্রা অদলবদল করুন</span>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="to-currency" className="text-gray-700 font-semibold text-lg">
                      এ
                    </Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger
                        id="to-currency"
                        className="border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl h-14"
                      >
                        <SelectValue placeholder="মুদ্রা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{currency.flag}</span>
                              <span className="font-semibold">{currency.code}</span>
                              <span className="text-gray-600">- {currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={convertCurrency}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                  disabled={loading || !amount || fromCurrency === toCurrency}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      রূপান্তর করা হচ্ছে...
                    </>
                  ) : (
                    "রূপান্তর করুন"
                  )}
                </Button>

                {error && (
                  <div className="p-4 text-sm text-red-700 bg-red-50 border-l-4 border-red-400 rounded-lg animate-pulse">
                    {error}
                  </div>
                )}

                {result !== null && !error && (
                  <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 rounded-xl shadow-inner">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-800 mb-3">
                        {toBengaliNumber(
                          result.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }),
                        )}{" "}
                        {toCurrency}
                      </div>
                      {exchangeRate && (
                        <div className="text-sm text-green-600 bg-green-100 px-4 py-2 rounded-full inline-block">
                          ১ {fromCurrency} = {toBengaliNumber(exchangeRate.toFixed(4))} {toCurrency}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Exchange Rates Table */}
          <div>
            <RatesTable />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-600 mb-2">
              সর্বশেষ আপডেট: {toBengaliNumber(new Date().toLocaleDateString("bn-BD"))}
            </p>
            <p className="text-sm text-gray-500">
              এক্সচেঞ্জ রেট প্রদানকারী:{" "}
              <a
                href="https://ajkertakarrate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-300"
              >
                আজকের টাকার রেট
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

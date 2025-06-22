"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, Loader2 } from "lucide-react"

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "SEK", name: "Swedish Krona" },
]

export default function Component() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)

  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid amount")
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

      const convertedAmount = Number(amount) * rate
      setResult(convertedAmount)
      setExchangeRate(rate)
    } catch (err) {
      setError("Failed to convert currency. Please try again.")
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

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      const timeoutId = setTimeout(() => {
        convertCurrency()
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Currency Converter</CardTitle>
          <CardDescription className="text-center">
            Convert between different currencies with real-time exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-currency">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="from-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={swapCurrencies} className="rounded-full">
                <ArrowRightLeft className="h-4 w-4" />
                <span className="sr-only">Swap currencies</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-currency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="to-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={convertCurrency}
            className="w-full"
            disabled={loading || !amount || fromCurrency === toCurrency}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert"
            )}
          </Button>

          {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}

          {result !== null && !error && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">
                  {result.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {toCurrency}
                </div>
                {exchangeRate && (
                  <div className="text-sm text-green-600 mt-1">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center">
            Exchange rates provided by exchangerate-api.com
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

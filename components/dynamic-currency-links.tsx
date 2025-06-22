"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface CurrencyPair {
  from: string
  to: string
  name: string
  slug: string
}

const popularPairs: CurrencyPair[] = [
  { from: "USD", to: "BDT", name: "ডলার থেকে টাকা", slug: "usd-to-bdt" },
  { from: "EUR", to: "BDT", name: "ইউরো থেকে টাকা", slug: "eur-to-bdt" },
  { from: "GBP", to: "BDT", name: "পাউন্ড থেকে টাকা", slug: "gbp-to-bdt" },
  { from: "INR", to: "BDT", name: "রুপি থেকে টাকা", slug: "inr-to-bdt" },
  { from: "SAR", to: "BDT", name: "রিয়াল থেকে টাকা", slug: "sar-to-bdt" },
  { from: "AED", to: "BDT", name: "দিরহাম থেকে টাকা", slug: "aed-to-bdt" },
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

export default function DynamicCurrencyLinks() {
  const [rates, setRates] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/BDT")
        const data = await response.json()

        const rateData: { [key: string]: number } = {}
        popularPairs.forEach((pair) => {
          if (data.rates[pair.from]) {
            rateData[pair.from] = 1 / data.rates[pair.from]
          }
        })

        setRates(rateData)
      } catch (error) {
        console.error("Error fetching rates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  if (loading) {
    return (
      <ul className="space-y-2 text-gray-300">
        {popularPairs.slice(0, 4).map((pair, index) => (
          <li key={index} className="animate-pulse">
            <div className="h-4 bg-gray-600 rounded w-24"></div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="space-y-2 text-gray-300">
      {popularPairs.slice(0, 4).map((pair) => (
        <li key={pair.slug}>
          <Link
            href={`/${pair.slug}`}
            className="hover:text-white transition-colors duration-300 flex justify-between items-center group"
          >
            <span className="group-hover:underline">{pair.name}</span>
            {rates[pair.from] && (
              <span className="text-xs text-gray-400 group-hover:text-gray-200">
                ৳{toBengaliNumber(rates[pair.from].toFixed(2))}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

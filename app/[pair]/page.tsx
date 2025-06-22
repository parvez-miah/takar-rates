import { notFound } from "next/navigation"
import type { Metadata } from "next"
import CurrencyPairConverter from "../../components/currency-pair-converter"

interface CurrencyPairPageProps {
  params: Promise<{ pair: string }>
}

const validPairs = [
  { slug: "usd-to-bdt", from: "USD", to: "BDT", name: "মার্কিন ডলার থেকে বাংলাদেশি টাকা" },
  { slug: "eur-to-bdt", from: "EUR", to: "BDT", name: "ইউরো থেকে বাংলাদেশি টাকা" },
  { slug: "gbp-to-bdt", from: "GBP", to: "BDT", name: "ব্রিটিশ পাউন্ড থেকে বাংলাদেশি টাকা" },
  { slug: "inr-to-bdt", from: "INR", to: "BDT", name: "ভারতীয় রুপি থেকে বাংলাদেশি টাকা" },
  { slug: "sar-to-bdt", from: "SAR", to: "BDT", name: "সৌদি রিয়াল থেকে বাংলাদেশি টাকা" },
  { slug: "aed-to-bdt", from: "AED", to: "BDT", name: "সংযুক্ত আরব আমিরাতের দিরহাম থেকে বাংলাদেশি টাকা" },
  { slug: "jpy-to-bdt", from: "JPY", to: "BDT", name: "জাপানি ইয়েন থেকে বাংলাদেশি টাকা" },
  { slug: "cad-to-bdt", from: "CAD", to: "BDT", name: "কানাডিয়ান ডলার থেকে বাংলাদেশি টাকা" },
  { slug: "aud-to-bdt", from: "AUD", to: "BDT", name: "অস্ট্রেলিয়ান ডলার থেকে বাংলাদেশি টাকা" },
  { slug: "chf-to-bdt", from: "CHF", to: "BDT", name: "সুইস ফ্রাঙ্ক থেকে বাংলাদেশি টাকা" },
]

export async function generateStaticParams() {
  return validPairs.map((pair) => ({
    pair: pair.slug,
  }))
}

export async function generateMetadata({ params }: CurrencyPairPageProps): Promise<Metadata> {
  const { pair } = await params
  const pairData = validPairs.find((p) => p.slug === pair)

  if (!pairData) {
    return {
      title: "পৃষ্ঠা পাওয়া যায়নি - আজকের টাকার রেট",
    }
  }

  return {
    title: `${pairData.name} - আজকের রেট | ${pairData.from} to ${pairData.to}`,
    description: `আজকের ${pairData.name} এর সর্বশেষ রেট দেখুন। লাইভ ${pairData.from} to ${pairData.to} এক্সচেঞ্জ রেট এবং currency converter।`,
    keywords: `${pairData.from} to ${pairData.to}, ${pairData.name}, আজকের ${pairData.from} রেট, ${pairData.to} রেট, এক্সচেঞ্জ রেট`,
  }
}

export default async function CurrencyPairPage({ params }: CurrencyPairPageProps) {
  const { pair } = await params
  const pairData = validPairs.find((p) => p.slug === pair)

  if (!pairData) {
    notFound()
  }

  return <CurrencyPairConverter fromCurrency={pairData.from} toCurrency={pairData.to} pairName={pairData.name} />
}

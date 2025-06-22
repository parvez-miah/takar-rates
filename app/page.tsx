import CurrencyConverter from "../currency-converter"
import type { Metadata } from "next"
import DynamicCurrencyLinks from "../components/dynamic-currency-links"

export const metadata: Metadata = {
  title: "আজকের টাকার রেট - সকল দেশের মুদ্রার হার | Ajker Takar Rate",
  description:
    "আজকের টাকার রেট দেখুন সকল দেশের মুদ্রার সাথে। ডলার, ইউরো, পাউন্ড, রুপি সহ সব মুদ্রার লাইভ এক্সচেঞ্জ রেট। ফ্রি currency converter এবং exchange rate calculator।",
}

export default function HomePage() {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "আজকের টাকার রেট",
    description: "বাংলাদেশের সবচেয়ে নির্ভরযোগ্য মুদ্রার হার এবং এক্সচেঞ্জ রেট সেবা",
    url: "https://ajkertakarrate.com",
    serviceType: "Currency Exchange Rate",
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
    offers: {
      "@type": "Offer",
      description: "ফ্রি লাইভ এক্সচেঞ্জ রেট এবং currency converter",
      price: "0",
      priceCurrency: "BDT",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  হোম
                </a>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700 font-medium">আজকের টাকার রেট</li>
            </ol>
          </div>
        </nav>

        {/* Header Section */}
        <header className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-8 pb-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
                আজকের টাকার রেট – সকল দেশের মুদ্রার হার
              </h1>
              <p className="text-xl text-gray-600 mb-2">Ajker Takar Rate - Live Exchange Rates</p>
              <p className="text-gray-500 mb-4">{currentDate} তারিখের সর্বশেষ আপডেট মুদ্রার হার</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-medium shadow-lg">
                <span>🔴 লাইভ</span>
                <span>রিয়েল-টাইম এক্সচেঞ্জ রেট</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <CurrencyConverter />
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <article>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">আজকের টাকার রেট - সম্পূর্ণ গাইড</h2>

              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">কেন আজকের টাকার রেট জানা গুরুত্বপূর্ণ?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  আজকের টাকার রেট জানা আমাদের দৈনন্দিন জীবনে অত্যন্ত গুরুত্বপূর্ণ। বিশেষ করে যারা বিদেশে কাজ করেন, ব্যবসা করেন বা রেমিট্যান্স
                  পাঠান তাদের জন্য সঠিক এক্সচেঞ্জ রেট জানা অপরিহার্য। আমাদের ওয়েবসাইটে আপনি পাবেন সবচেয়ে আপডেট এবং নির্ভরযোগ্য মুদ্রার হার।
                </p>

                <h3 className="text-2xl font-semibold text-gray-700 mb-4">প্রধান মুদ্রাসমূহের আজকের রেট</h3>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>
                    <strong>মার্কিন ডলারের রেট:</strong> USD থেকে BDT রূপান্তর
                  </li>
                  <li>
                    <strong>ইউরোর রেট:</strong> EUR থেকে BDT রূপান্তর
                  </li>
                  <li>
                    <strong>ব্রিটিশ পাউন্ডের রেট:</strong> GBP থেকে BDT রূপান্তর
                  </li>
                  <li>
                    <strong>ভারতীয় রুপির রেট:</strong> INR থেকে BDT রূপান্তর
                  </li>
                  <li>
                    <strong>সৌদি রিয়ালের রেট:</strong> SAR থেকে BDT রূপান্তর
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                  কিভাবে ব্যবহার করবেন আমাদের Currency Converter?
                </h3>
                <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
                  <li>প্রথমে আপনার পছন্দের পরিমাণ লিখুন</li>
                  <li>যে মুদ্রা থেকে রূপান্তর করতে চান তা নির্বাচন করুন</li>
                  <li>যে মুদ্রায় রূপান্তর করতে চান তা নির্বাচন করুন</li>
                  <li>তাৎক্ষণিক ফলাফল দেখুন</li>
                </ol>

                <h3 className="text-2xl font-semibold text-gray-700 mb-4">আমাদের সেবার বিশেষত্ব</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">রিয়েল-টাইম আপডেট</h4>
                    <p className="text-blue-700">প্রতি মিনিটে আপডেট হওয়া লাইভ এক্সচেঞ্জ রেট</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">নির্ভরযোগ্য তথ্য</h4>
                    <p className="text-green-700">আন্তর্জাতিক মানের API থেকে সংগৃহীত তথ্য</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">সহজ ব্যবহার</h4>
                    <p className="text-purple-700">বাংলা ভাষায় সহজ এবং দ্রুত currency converter</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">সম্পূর্ণ ফ্রি</h4>
                    <p className="text-orange-700">কোনো চার্জ ছাড়াই সব সেবা ব্যবহার করুন</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)</h2>

            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="font-semibold text-gray-800 cursor-pointer">আজকের ডলারের রেট কত?</summary>
                <p className="mt-3 text-gray-600">
                  আজকের ডলারের রেট আমাদের ওয়েবসাইটের উপরে দেখানো হয়েছে। এটি প্রতি মিনিটে আপডেট হয় এবং আন্তর্জাতিক বাজারের সাথে
                  সামঞ্জস্যপূর্ণ।
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  এক্সচেঞ্জ রেট কতক্ষণ পর পর আপডেট হয়?
                </summary>
                <p className="mt-3 text-gray-600">
                  আমাদের এক্সচেঞ্জ রেট প্রতি ১ মিনিট পর পর আপডেট হয়। এটি নিশ্চিত করে যে আপনি সবসময় সর্বশেষ এবং সঠিক তথ্য পাচ্ছেন।
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="font-semibold text-gray-800 cursor-pointer">কোন মুদ্রাগুলো সাপোর্ট করে?</summary>
                <p className="mt-3 text-gray-600">
                  আমরা ১৬টি প্রধান আন্তর্জাতিক মুদ্রা সাপোর্ট করি যার মধ্যে রয়েছে USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, INR, BDT,
                  KRW, MXN, SGD, NZD, NOK, SEK।
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <a
                  href="https://ajkertakarrate.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors duration-300"
                >
                  আজকের টাকার রেট
                </a>
              </h3>
              <p className="text-gray-300">বাংলাদেশের সবচেয়ে নির্ভরযোগ্য মুদ্রার হার এবং এক্সচেঞ্জ রেট সেবা।</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#converter" className="hover:text-white transition-colors duration-300">
                    Currency Converter
                  </a>
                </li>
                <li>
                  <a href="#rates" className="hover:text-white transition-colors duration-300">
                    Exchange Rates
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors duration-300">
                    আমাদের সম্পর্কে
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors duration-300">
                    যোগাযোগ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">জনপ্রিয় মুদ্রা</h4>
              <DynamicCurrencyLinks />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
              <div className="text-gray-300 space-y-2">
                <p>📧 info@ajkertakarrate.com</p>
                <p>📱 +৮৮০ ১XXX-XXXXXX</p>
                <p>🌐 www.ajkertakarrate.com</p>
                <div className="mt-4">
                  <p className="text-sm">
                    এক্সচেঞ্জ রেট প্রদানকারী:{" "}
                    <a
                      href="https://ajkertakarrate.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-300"
                    >
                      আজকের টাকার রেট
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} আজকের টাকার রেট। সকল অধিকার সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </>
  )
}

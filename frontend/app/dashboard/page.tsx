'use client'

import { ArrowUpRight, History, Search, Send } from 'lucide-react'
import { Bricolage_Grotesque } from "next/font/google"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Header from '@/components/Header'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] })

export default function Component() {
    const [balance] = useState("1.85")
    const [percentageChange] = useState("+8.2%")
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [userName] = useState("Juminstock")
    const [transactions] = useState([
        { type: "Mint", date: "Nov 15", description: "ETHGlobal Bangkok", chain: "Optimism", amount: "$30.34" },
        { type: "Mint", date: "Nov 15", description: "ETHGlobal Bangkok I 1inch", chain: "Arbitrum", amount: "$29.85" },
        { type: "Mint", date: "Nov 15", description: "SEA | ETHGlobal Bangkok", chain: "Solana", amount: "$28.60" },
    ])
    
    const [assets] = useState([
        { name: "Bitcoin", symbol: "BTC", amount: "0.5", value: "$15,000" },
        { name: "Ethereum", symbol: "ETH", amount: "2.3", value: "$4,140" },
        { name: "Cardano", symbol: "ADA", amount: "1000", value: "$450" },
        { name: "Polkadot", symbol: "DOT", amount: "100", value: "$2,500" },
        { name: "Solana", symbol: "SOL", amount: "50", value: "$3,750" },
    ])

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

    return (
        <div className={`min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'} ${bricolage.className}`}>
            {/* Navbar */}
            <nav className="p-4 flex justify-between items-center bg-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <Image src="/meta-logo-blue.png" alt="Logo" width={180} height={180} />
                </div>
            </nav>
            <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#2E01DB]">Hello, {userName}!</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Total Amount Card */}
                <Card className={`col-span-2 ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-md`}>
                <CardHeader>
                    <CardTitle className="text-lg font-normal mb-2 text-[#2E01DB]">Total amount →</CardTitle>
                    <CardTitle className="text-4xl font-bold">
                        {balance} ETH
                        <span className="text-sm text-[#2E01DB] ml-2">{percentageChange}</span>
                    </CardTitle>
                </CardHeader>
        </Card>
          <div className="space-y-6">
            {/* Search Bar */}
            <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-md`}>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-black`} />
                  <Input
                    className={`w-full pl-10 ${isDarkMode ? 'bg-gray-700/50 border-gray-600/50 text-white' : 'bg-white/50 border-gray-300/50 text-black'}`}
                    placeholder="Search assets..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Historical Transactions */}
            <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-md`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-normal text-[#2E01DB]">History →</CardTitle>
                <History className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                          M
                        </div>
                        <div>
                          <div className="text-sm">{tx.description}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx.date}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx.chain}</div>
                        </div>
                      </div>
                      <div className="text-sm text-[#2E01DB]">{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset List */}
          <Card className={`col-span-2 ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-md`}>
            <CardHeader>
              <CardTitle className="text-xl font-normal text-[#2E01DB]">Your Assets →</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center font-bold`}>
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold">{asset.name}</div>
                        <div className={`text-sm text-[#2E01DB]`}>{asset.amount} {asset.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#2E01DB]">{asset.value}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {(parseFloat(asset.value.replace('$', '').replace(',', '')) / parseFloat(asset.amount)).toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} backdrop-blur-md`}>
            <CardHeader>
              <CardTitle className="text-xl font-normal text-[#2E01DB]">Actions →</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button
                  className="w-full bg-[#2E01DB] hover:bg-[#5439c0] text-white"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
                <Button
                  className="w-full bg-[#000000] hover:bg-[#1b1a23] text-white"
                  size="lg"
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Lend
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-12 py-6 backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div></div>
          <div className="text-center">
            <p>Created with 💜 for ETH Global Bangkok</p>
          </div>
          <Image src="/meta-logo-blue.png" alt="Logo" width={180} height={180} />
        </div>
      </footer>
    </div>
  )
}
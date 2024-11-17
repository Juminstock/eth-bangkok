'use client'

import { useState } from "react"
import { Send } from 'lucide-react'
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWriteContract } from 'wagmi'
import { BASE_SEPOLIA_MODULE, MODULE_ABI } from "@/constants"
import { encodeFunctionData, parseEther } from "viem"

function SupplyFlow() {
  const { writeContract } = useWriteContract()
  const [token, setToken] = useState("")
  const [amount, setAmount] = useState("")

  const handleSendTokens = () => {
    const orders = [{
      tokenIn: "0x4200000000000000000000000000000000000006",
      tokenOut: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      amount: 100000000000000 + 900000000000,
      eid: 40161,
      chainId: 84532
    }]
    const supplyCalldata = encodeFunctionData({
      abi: [
        {
          name: 'supply',
          type: 'function',
          inputs: [
            { name: 'asset', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'onBehalfOf', type: 'address' },
            { name: 'referralCode', type: 'uint16' }
          ],
          outputs: [],
          stateMutability: 'nonpayable'
        }
      ],
      functionName: 'supply',
      args: [
        '0x4200000000000000000000000000000000000006',        
        BigInt(100000000000000),    
        "0x37d9Bcb63118cbD2cdE1d0E24379a876d687738A",    
          0        
      ]                         
    });
    
    writeContract({
      address: BASE_SEPOLIA_MODULE,
      abi: MODULE_ABI,
      functionName: "createTransaction",
      args: [
        "0x07eA79F68B2B3df564D0A34F8e19D9B1e339814b",
        0,
        supplyCalldata,
        "0x37d9Bcb63118cbD2cdE1d0E24379a876d687738A",
        orders 


      ]
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-[#2E01DB] hover:bg-[#5439c0] text-white"
          size="lg"
        >
          <Send className="mr-2 h-4 w-4" />
          Supply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Supply to Aave Pools</DialogTitle>
          <DialogDescription>
            Supply with global balance
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="token" className="text-right">
              Token
            </Label>
            <Select value={token} onValueChange={setToken}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="dai">DAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSendTokens}>
            Send Tokens
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SupplyFlow
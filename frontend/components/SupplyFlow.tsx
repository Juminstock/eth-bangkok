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

function SupplyFlow() {
  const [token, setToken] = useState("")
  const [amount, setAmount] = useState("")

  const handleSendTokens = () => {
    console.log("Sending tokens:", { token, amount, address })
    setToken("")
    setAmount("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-[#2E01DB] hover:bg-[#5439c0] text-white"
          size="lg"
        >
          <Send className="mr-2 h-4 w-4" />
          Transfer
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
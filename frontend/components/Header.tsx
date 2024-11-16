'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  

function Header() {
  const [address, setAddress] = useState('')
  const [savedAddress, setSavedAddress] = useState('')

  useEffect(() => {
    const storedAddress = localStorage.getItem('userAddress')
    if (storedAddress) {
      setSavedAddress(storedAddress)
    }
  }, [])

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userAddress', address)
    setSavedAddress(address)
    setAddress('')
  }

  return (
    <nav className='p-4 flex justify-between items-center bg-white/10 backdrop-blur-md'>
      <div className='flex items-center gap-2'>
        <Image src='/meta-logo-blue.png' alt='Logo' width={180} height={180} />
      </div>
      <div>
      <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {savedAddress ? `Address: ${savedAddress.slice(0, 6)}...${savedAddress.slice(-4)}` : 'Set Smart Account'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Smart Account Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Save Address</Button>
            </form>
          </PopoverContent>
        </Popover>
        <DynamicWidget />
      </div>
    </nav>
  );
}

export default Header;

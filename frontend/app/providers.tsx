'use client'
import React, { ReactNode } from 'react'
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';


function Providers({children}:{children: ReactNode}) {
  return (
    <DynamicContextProvider
    settings={{
      // Find your environment id at https://app.dynamic.xyz/dashboard/developer
      environmentId: "1950d097-0c06-4589-af21-f02e3f165c10",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    {children}

  </DynamicContextProvider>
  )
}

export default Providers
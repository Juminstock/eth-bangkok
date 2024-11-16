import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import React, { FormEventHandler, useState } from 'react'
import { parseEther } from 'viem';

function useCreateTransaction() {
    const { primaryWallet } = useDynamicContext();

    const [txnHash, setTxnHash] = useState("");

    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;
  
    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
  
      const address = formData.get("address") as string;
      const amount = formData.get("amount") as string;
      const data = formData.get("data") as string;
  
      const publicClient = await primaryWallet.getPublicClient();
      const walletClient = await primaryWallet.getWalletClient();
  
      const transaction = {
        to: address as `0x${string}`,
        value: amount ? parseEther(amount),
        data: data as string
      };
  
      const hash = await walletClient.sendTransaction(transaction);
      setTxnHash(hash);
  
      const receipt = await publicClient.getTransactionReceipt({
        hash,
      });
  
      console.log(receipt);
    };

    return {onSubmit, txnHash}
}

export default useCreateTransaction
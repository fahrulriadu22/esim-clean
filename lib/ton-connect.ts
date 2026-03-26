/**
 * TON Connect utility functions for wallet integration
 */

import { beginCell } from "@ton/core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// Recipient TON address from environment variable
export const RECIPIENT_ADDRESS =
   process.env.NEXT_PUBLIC_TON_RECIPIENT_ADDRESS ||
   "kQBM0TlTk3-lhW4cjbRrGxzufUc_gaJOAQt-LdlmKudcGod0";

/**
 * Custom hook for TON Connect functionality
 */
export function useTonConnect() {
   const [tonConnectUI] = useTonConnectUI();
   const wallet = useTonWallet();

   const connectWallet = async () => {
      try {
         await tonConnectUI.openModal();
         return true;
      } catch (error) {
         return false;
      }
   };

   const disconnectWallet = async () => {
      try {
         await tonConnectUI.disconnect();
      } catch (error) {
         // Silent error handling
      }
   };

   const sendTransaction = async (
      toAddress: string,
      amount: string,
      comment?: string
   ) => {
      try {
         if (!wallet || !comment) {
            throw new Error("Wallet not connected");
         }

         const body = beginCell()
            .storeUint(0, 32)
            .storeStringTail(comment)
            .endCell();

         const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
            messages: [
               {
                  address: toAddress,
                  amount: amount,
                  payload: body.toBoc().toString("base64"),
               },
            ],
         };

         const result = await tonConnectUI.sendTransaction(transaction);
         return result.boc;
      } catch (error) {
         throw error;
      }
   };

   return {
      connectWallet,
      disconnectWallet,
      sendTransaction,
      isConnected: !!wallet,
      wallet,
      tonConnectUI,
   };
}

/**
 * Format TON address for display
 */
export function formatTonAddress(address: string): string {
   if (address.length <= 10) return address;
   return `${address.slice(0, 25)}...${address.slice(-10)}`;
}

/**
 * Validate TON address format
 */
export function isValidTonAddress(address: string): boolean {
   // Basic TON address validation
   return /^[A-Za-z0-9_-]{48}$/.test(address);
}

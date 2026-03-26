"use client";

import { XCircle, RefreshCw, MessageCircle, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function PayPalCancel() {
   const [isClosing, setIsClosing] = useState(false);

   useEffect(() => {
      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
         handleClose();
      }, 8000);

      return () => clearTimeout(timer);
   }, []);

   const handleClose = () => {
      setIsClosing(true);
      // Try to close the tab/window
      if (window.opener) {
         window.close();
      } else {
         // Fallback: redirect to a close message or back to the app
         window.location.href = "about:blank";
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8">
            <div className="text-center">
               <XCircle className="mx-auto h-20 w-20 text-red-500" />
               <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Payment Cancelled
               </h2>
               <p className="mt-2 text-sm text-gray-600">
                  Your eSIM package purchase was cancelled or failed to process.
               </p>
            </div>

            <div className="bg-white shadow-xl rounded-lg p-6 border border-red-200">
               <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                     Don't worry!
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span>No charges were made to your account</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <RefreshCw className="w-5 h-5 text-blue-500" />
                        <span>You can try again anytime</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <MessageCircle className="w-5 h-5 text-purple-500" />
                        <span>Contact support if you need help</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
               <div className="text-center">
                  <p className="text-sm text-yellow-800">
                     <strong>💡 Tip:</strong> You can also use your account
                     balance or try other payment methods.
                  </p>
               </div>
            </div>

            <div className="text-center space-y-3">
               <button
                  onClick={handleClose}
                  disabled={isClosing}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {isClosing ? "Closing..." : "Close Page"}
               </button>
               <p className="text-xs text-gray-500">
                  This page will auto-close in a few seconds
               </p>
            </div>
         </div>
      </div>
   );
}

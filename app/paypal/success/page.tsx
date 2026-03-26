"use client";

import { CheckCircle, Smartphone, Clock, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function PayPalSuccess() {
   const [isClosing, setIsClosing] = useState(false);

   useEffect(() => {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
         handleClose();
      }, 5000);

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8">
            <div className="text-center">
               <div className="relative">
                  <CheckCircle className="mx-auto h-20 w-20 text-green-500 animate-pulse" />
                  <div className="absolute inset-0 mx-auto h-20 w-20 bg-green-500 rounded-full opacity-20 animate-ping"></div>
               </div>
               <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Payment Successful!
               </h2>
               <p className="mt-2 text-sm text-gray-600">
                  Your eSIM package purchase has been processed successfully.
               </p>
            </div>

            <div className="bg-white shadow-xl rounded-lg p-6 border border-green-200">
               <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                     What happens next?
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Smartphone className="w-5 h-5 text-blue-500" />
                        <span>Your eSIM package is being prepared</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span>Activation usually takes 1-5 minutes</span>
                     </div>
                     <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        <span>Check your Telegram bot for eSIM details</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
               <div className="text-center">
                  <p className="text-sm text-blue-800">
                     <strong>💡 Pro Tip:</strong> Keep this window open until
                     you receive your eSIM details in Telegram.
                  </p>
               </div>
            </div>

            <div className="text-center space-y-3">
               <button
                  onClick={handleClose}
                  disabled={isClosing}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   ArrowLeft,
   MessageCircle,
   Mail,
   Phone,
   Clock,
   User,
   Send,
   CheckCircle,
} from "lucide-react";

interface ContactSupportPageProps {
   onBack: () => void;
}

export function ContactSupportPage({ onBack }: ContactSupportPageProps) {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "normal",
   });

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
         setIsSubmitting(false);
         setIsSubmitted(true);
      }, 2000);
   };

   const handleInputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   if (isSubmitted) {
      return (
         <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4 py-4">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
               >
                  <ArrowLeft className="w-5 h-5" />
               </Button>
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                     <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                     <h1 className="text-xl font-bold text-foreground">
                        Message Sent
                     </h1>
                     <p className="text-sm text-muted-foreground">
                        We'll get back to you soon
                     </p>
                  </div>
               </div>
            </div>

            {/* Success Message */}
            <Card className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
               <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                     Thank You!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                     Your support request has been submitted successfully. Our
                     team will review your message and respond within 24 hours.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4">
                     <p className="text-sm text-muted-foreground">
                        Ticket ID: #SUP-{Date.now().toString().slice(-6)}
                     </p>
                  </div>
                  <Button onClick={onBack} className="w-full">
                     Back to Help
                  </Button>
               </CardContent>
            </Card>
         </div>
      );
   }

   return (
      <div className="p-4 space-y-6">
         {/* Header */}
         <div className="flex items-center space-x-4 py-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary-foreground" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-foreground">
                     Contact Support
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     Get help from our team
                  </p>
               </div>
            </div>
         </div>

         {/* Support Status */}
         <Card className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
            <CardContent className="p-4">
               <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                     <p className="font-semibold text-foreground">
                        Support Team Online
                     </p>
                     <p className="text-sm text-muted-foreground">
                        Average response time: 2 hours
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Quick Contact Options */}
         <div className="grid grid-cols-1 gap-3">
            <Card
               className="cursor-pointer hover:shadow-md transition-all"
               onClick={() => window.open("https://t.me/roamwii", "_blank")}
            >
               <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                     </div>
                     <div className="flex-1">
                        <p className="font-medium text-foreground">Live Chat</p>
                        <p className="text-sm text-muted-foreground">
                           Chat with @roamwii on Telegram
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                           Online
                        </p>
                        <p className="text-xs text-muted-foreground">
                           ~2 min wait
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card
               className="cursor-pointer hover:shadow-md transition-all"
               onClick={() => window.open("mailto:business@roamwi.com")}
            >
               <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                     </div>
                     <div className="flex-1">
                        <p className="font-medium text-foreground">
                           Email Support
                        </p>
                        <p className="text-sm text-muted-foreground">
                           business@roamwi.com
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                           24/7
                        </p>
                        <p className="text-xs text-muted-foreground">
                           ~2 hour response
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Contact Form */}
         {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Send us a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              >
                <option value="low">Low - General question</option>
                <option value="normal">Normal - Need assistance</option>
                <option value="high">High - Service not working</option>
                <option value="urgent">Urgent - Critical issue</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                placeholder="Please describe your issue in detail. Include any error messages, device model, and steps you've already tried."
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card> */}

         {/* Support Hours */}
         <Card className="bg-muted/30">
            <CardContent className="p-4">
               <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Support Hours
               </h3>
               <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                     <span>Live Chat</span>
                     <span>24/7</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Email Support</span>
                     <span>24/7</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Phone Support</span>
                     <span>9 AM - 6 PM (Mon-Fri)</span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

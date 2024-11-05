"use client"

import { useState } from 'react'
import { ChevronLeft, Search, Book, HelpCircle, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      question: "How do I submit an incident report?",
      answer: "To submit an incident report, go to the dashboard and click on the 'Incidents Form' card. Fill in all required fields including incident ID, date, actor, target, type, description, location, and casualties. Click submit when done."
    },
    {
      question: "What's the difference between Reports and Information forms?",
      answer: "Reports are used for detailed documentation of events that require investigation, while Information forms are for sharing general updates or intelligence that doesn't constitute an incident."
    },
    {
      question: "How can I view my submitted reports?",
      answer: "You can view all your submitted reports in the Records section. Use the filters on the left to narrow down by date range or status."
    },
    {
      question: "Can I edit a submitted report?",
      answer: "Once a report is submitted, it cannot be edited to maintain data integrity. If you need to make corrections, please contact your supervisor."
    },
    {
      question: "How do I change my password?",
      answer: "Go to your Profile page, click on the Security tab, and use the Change Password form. You'll need to enter your current password and the new password twice."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">How can we help you?</h1>
            <p className="text-gray-600 mb-6">Search our help center or browse frequently asked questions</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Book className="h-5 w-5 mr-2 text-blue-500" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Browse our detailed documentation for in-depth information about all features.
                </p>
                <Button variant="link" className="mt-2 p-0">Learn more →</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-500" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Chat with our support team for immediate assistance during business hours.
                </p>
                <Button variant="link" className="mt-2 p-0">Start chat →</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Phone className="h-5 w-5 mr-2 text-purple-500" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get in touch with our support team via email or phone.
                </p>
                <Button variant="link" className="mt-2 p-0">Contact us →</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <HelpCircle className="h-5 w-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Still need help?</h3>
                  <p className="text-gray-600 mb-4">
                    Our support team is available 24/7 to assist you with any questions or concerns.
                  </p>
                  <Button>Contact Support</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
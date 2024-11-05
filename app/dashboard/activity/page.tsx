"use client"

import { useState } from 'react'
import { ChevronLeft, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

export default function ActivityPage() {
  const [dateFilter, setDateFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Activity Log</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label>Date:</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label>User:</Label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">User Action {i + 1}</p>
                        <p className="text-sm text-gray-500">
                          {i === 0 ? "Just now" : 
                           i === 1 ? "2 hours ago" :
                           i === 2 ? "Yesterday" :
                           i === 3 ? "2 days ago" :
                           "Last week"}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {i % 2 === 0 ? "Success" : "Info"}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">
                      {i % 2 === 0 
                        ? "Created a new incident report with ID #12345"
                        : "Updated user profile information and security settings"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Filter, Download, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

export default function RecordsPage() {
  const router = useRouter()
  const [dateFilter, setDateFilter] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const toggleStatus = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search records..."
                className="pl-8"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Records per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Save Filter
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[250px,1fr] gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">Quick Filters</h2>
              <RadioGroup
                defaultValue="all"
                onValueChange={setDateFilter}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="today" id="today" />
                  <Label htmlFor="today">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yesterday" id="yesterday" />
                  <Label htmlFor="yesterday">Yesterday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last7days" id="last7days" />
                  <Label htmlFor="last7days">Last 7 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last30days" id="last30days" />
                  <Label htmlFor="last30days">Last 30 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thisMonth" id="thisMonth" />
                  <Label htmlFor="thisMonth">This Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lastMonth" id="lastMonth" />
                  <Label htmlFor="lastMonth">Last Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specificRange" id="specificRange" />
                  <Label htmlFor="specificRange">Specific Range</Label>
                </div>
              </RadioGroup>

              {dateFilter === 'specificRange' && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="startDate">From</Label>
                    <Input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">To</Label>
                    <Input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">Status</h2>
              <div className="space-y-2">
                {['SPF', 'SNA', 'MoiS', 'MoD', 'NISA'].map((status) => (
                  <label key={status} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(status)}
                      onChange={() => toggleStatus(status)}
                      className="rounded border-gray-300"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Updated By</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Actor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      SPF
                    </span>
                  </TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>10/26/2024, 2:44:03 PM</TableCell>
                  <TableCell>Abdihalim Saalax</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>October 25, 2024</TableCell>
                  <TableCell>Saldhiga Howlwadaag</TableCell>
                  <TableCell>AS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      SPF
                    </span>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>10/26/2024, 1:50:35 PM</TableCell>
                  <TableCell>Abdihalim Saalax</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>October 25, 2024</TableCell>
                  <TableCell>Saldhiga Howlwadaag</TableCell>
                  <TableCell>AS</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useSession } from 'next-auth/react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search incidents..."
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Welcome, {session?.user?.username}!
          </span>
        </div>
      </div>
    </header>
  )
}
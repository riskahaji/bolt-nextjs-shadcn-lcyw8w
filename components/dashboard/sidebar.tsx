"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  Home, 
  Activity, 
  Clock, 
  User, 
  LogOut, 
  HelpCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  const links = [
    { href: '/dashboard', label: 'Home', icon: Home },
    ...(isAdmin ? [
      { href: '/dashboard/activity', label: 'Activity', icon: Activity },
      { href: '/dashboard/records', label: 'Records', icon: Clock }
    ] : []),
    { href: '/dashboard/profile', label: 'My Profile', icon: User },
    { href: '/dashboard/help', label: 'Help', icon: HelpCircle }
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="p-6">
        <Image
          src="/logo.png"
          alt="Somalia Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100",
                pathname === link.href && "bg-blue-50 text-blue-600"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}
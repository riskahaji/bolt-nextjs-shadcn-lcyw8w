import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import DashboardHeader from '@/components/dashboard/header'
import DashboardSidebar from '@/components/dashboard/sidebar'
import DashboardStats from '@/components/dashboard/stats'
import FormSelector from '@/components/dashboard/form-selector'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <DashboardHeader />
        <div className="p-6">
          <DashboardStats />
          <FormSelector />
        </div>
      </main>
    </div>
  )
}
"use client"

import Link from 'next/link'
import { Lock, Radio, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function FormSelector() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link href="/dashboard/forms/incidents">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Lock className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold">Incidents Form</h3>
                <p className="text-sm text-gray-600">Data Collection Form</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-blue-600 text-sm">Select →</span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/forms/report">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Radio className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold">Report Form</h3>
                <p className="text-sm text-gray-600">Data Collection Form</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-purple-600 text-sm">Select →</span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/forms/information">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Lightbulb className="h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold">Information Form</h3>
                <p className="text-sm text-gray-600">Data Collection Form</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-yellow-600 text-sm">Select →</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
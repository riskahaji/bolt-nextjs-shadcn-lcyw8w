"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

const formSchema = z.object({
  infoId: z.string().min(1, "Info ID is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  institute: z.string().min(1, "Institute is required"),
})

type FormData = z.infer<typeof formSchema>

export default function InformationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/information', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit information')

      toast({
        title: "Success",
        description: "Information submitted successfully",
      })
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit information",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Information Form</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="institute">Institute</Label>
                <Select onValueChange={(value) => register("institute").onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SPF">SPF</SelectItem>
                    <SelectItem value="SNA">SNA</SelectItem>
                    <SelectItem value="NISA">NISA</SelectItem>
                  </SelectContent>
                </Select>
                {errors.institute && (
                  <p className="text-sm text-red-500">{errors.institute.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="infoId">Info ID</Label>
                <Input {...register("infoId")} />
                {errors.infoId && (
                  <p className="text-sm text-red-500">{errors.infoId.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => register("status").onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="LOW">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input {...register("location")} />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea {...register("description")} rows={4} />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Information"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
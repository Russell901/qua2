'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

export default function GuestDetailsPage() {
  const params = useParams()
  const id = params?.id as Id<"guests">

  const guest = useQuery(api.guests.getGuest, { id })

  if (!guest) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Guest Not Found</h1>
        <p>Sorry, we couldn&apos;t find the guest you&apos;re looking for.</p>
        <Link href="/dashboard/guests" className="text-blue-500 hover:underline mt-4 inline-block">
          <ArrowLeft className="inline mr-2 h-4 w-4" />
          Back to Guest List
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5">
        <Link href="/dashboard/guests" className="text-blue-500 hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guest List
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-5">Guest Details</h1>
      <Card className='bg-white/5 border-none text-foreground'>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-xl font-semibold">{guest.firstName} {guest.lastName}</p>
            <p className="flex items-center text-gray-600">
              <Mail className="mr-2 h-4 w-4" />
              {guest.email}
            </p>
            <p className="flex items-center text-gray-600">
              <Phone className="mr-2 h-4 w-4" />
              {guest.phoneNumber}
            </p>
            <p className="text-gray-600">
              Gender: {guest.gender}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, Edit, Trash2 } from 'lucide-react'

const guests = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    hostel: "Backpackers Paradise", 
    room: "Dorm 3, Bed 2",
    checkIn: "2023-07-01",
    checkOut: "2023-07-07",
    status: "paid",
    amountPaid: 210,
    totalAmount: 210
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    hostel: "Urban Oasis", 
    room: "Private Room 5",
    checkIn: "2023-07-03",
    checkOut: "2023-07-10",
    status: "partial",
    amountPaid: 150,
    totalAmount: 280
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike.johnson@example.com",
    phone: "+1 (555) 246-8135",
    hostel: "Sunshine Hostels", 
    room: "Dorm 2, Bed 4",
    checkIn: "2023-07-05",
    checkOut: "2023-07-12",
    status: "unpaid",
    amountPaid: 0,
    totalAmount: 175
  },
]

const statusColors = {
  paid: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  unpaid: "bg-red-100 text-red-800",
}

function isValidStatus(status: string): status is keyof typeof statusColors {
  return status in statusColors
}

export default function GuestDetailsPage() {
  const [mounted, setMounted] = useState(false)
  const params = useParams()
  const id = params?.id

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const guestId = id ? Number(id) : null
  const guest = guests.find(guest => guest.id === guestId)

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
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Guest Details</h1>
        <Button>
          <Edit className="mr-2 h-4 w-4" /> Edit Guest
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-xl font-semibold">{guest.name}</p>
              <p className="flex items-center text-gray-600">
                <Mail className="mr-2 h-4 w-4" />
                {guest.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="mr-2 h-4 w-4" />
                {guest.phone}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-4 w-4" />
                {guest.hostel} - {guest.room}
              </p>
              <p className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                Check-in: {guest.checkIn}
              </p>
              <p className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                Check-out: {guest.checkOut}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isValidStatus(guest.status) ? (
                <Badge className={statusColors[guest.status]}>
                  {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
              )}
              <p className="flex items-center text-gray-600">
                <CreditCard className="mr-2 h-4 w-4" />
                Amount Paid: ${guest.amountPaid}
              </p>
              <p className="flex items-center text-gray-600">
                <CreditCard className="mr-2 h-4 w-4" />
                Total Amount: ${guest.totalAmount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full">Update Payment Status</Button>
              <Button className="w-full" variant="outline">Extend Stay</Button>
              <Button className="w-full" variant="outline">Send Message</Button>
              <Button className="w-full" variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Guest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
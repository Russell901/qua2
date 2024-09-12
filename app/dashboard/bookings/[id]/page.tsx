"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, User, Calendar as CalendarIcon, Home, CreditCard } from "lucide-react";

export default function BookingDetails() {
  const { id } = useParams();
  const router = useRouter();
  const bookingId = id as unknown as Id<"bookings">;
  const booking = useQuery(api.bookings.getBookingById, { id: bookingId });
  const guest = useQuery(api.guests.getGuestById, {
    id: booking?.guestId ?? ("" as Id<"guests">),
  });
  const hostel = useQuery(api.hostels.getHostelById, {
    id: booking?.hostelId ?? ("" as Id<"hostels">),
  });

  if (!booking || !guest || !hostel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (booking === null || guest === null || hostel === null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-lg text-gray-500">
              Booking, Guest, or Hostel not found
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const nights = Math.ceil(
    (new Date(booking.checkOutDate).getTime() -
      new Date(booking.checkInDate).getTime()) /
      (1000 * 3600 * 24)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Bookings
      </Button>
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Name</p>
                <p>{`${guest.firstName} ${guest.lastName}`}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="break-all">{guest.email}</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p>{guest.phoneNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Booking Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Hostel
                </p>
                <p>{hostel.name}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Check-in
                </p>
                <p>{new Date(booking.checkInDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Check-out
                </p>
                <p>{new Date(booking.checkOutDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">Nights</p>
                <p>{nights}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Total Price
                </p>
                <p>${booking.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-semibold">Status</p>
                <Badge
                  variant={
                    booking.status === "completed" ? "default" : "secondary"
                  }
                  className="mt-1"
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Booking Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="range"
              selected={{
                from: new Date(booking.checkInDate),
                to: new Date(booking.checkOutDate),
              }}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

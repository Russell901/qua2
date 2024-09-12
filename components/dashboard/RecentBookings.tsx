import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Booking {
  _id: string;
  guestId: string;
  guestName: string; // Add this line
  hostelId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  createdAt: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
  return (
    <Card className='bg-white/5 border-none'>
      <CardHeader>
        <CardTitle className='text-primary-foreground'>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent className='text-primary-foreground'>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{booking.guestName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{booking.guestName}</p>
                <p className="text-sm text-muted-foreground">{booking.hostelId}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Check-in: {booking.checkInDate}
              </div>
              <div className="text-sm font-medium">
                {new Date(booking.checkOutDate).getDate() - new Date(booking.checkInDate).getDate()} nights
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
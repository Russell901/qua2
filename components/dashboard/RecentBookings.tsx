import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Booking {
  id: number;
  name: string;
  hostel: string;
  checkIn: string;
  nights: number;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
  return (
    <Card className=' bg-white/5 border-none'>
      <CardHeader>
        <CardTitle className='text-primary-foreground'>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent  className='text-primary-foreground'>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{booking.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{booking.name}</p>
                <p className="text-sm text-muted-foreground">{booking.hostel}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Check-in: {booking.checkIn}
              </div>
              <div className="text-sm font-medium">
                {booking.nights} nights
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
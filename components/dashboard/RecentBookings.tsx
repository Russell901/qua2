import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon, HomeIcon } from "lucide-react";

interface Booking {
  _id: string;
  guestId: string;
  guestName: string;
  hostelId: string;
  hostelName: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  createdAt: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 3600 * 24)
    );
    return nights === 1 ? "1 night" : `${nights} nights`;
  };

  return (
    <Card className="bg-white/5 border-none">
      <CardHeader>
        <CardTitle className="text-primary-foreground">
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="text-primary-foreground">
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white/10 rounded-lg transition-all duration-300 hover:bg-white/15"
            >
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {booking.guestName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <p className="text-base font-medium leading-none">
                  {booking.guestName}
                </p>
                <div className="flex flex-row space-x-4">                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>{booking.hostelName}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Booked on: {formatDate(booking.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-4">              
                <div className="text-sm text-muted-foreground">
                  {formatDate(booking.checkInDate)} -{" "}
                  {formatDate(booking.checkOutDate)}
                </div>
                <div className="text-sm font-medium bg-primary/20 px-2 py-1 rounded-full">
                  {calculateNights(booking.checkInDate, booking.checkOutDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;

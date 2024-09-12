"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import StatCard from "@/components/Shared/StatCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import BookingForm from "@/components/dashboard/BookingForm"; // Add this import

export default function Dashboard() {
  const totalHostels = useQuery(api.hostels.getTotalHostels);
  const averageOccupancy = useQuery(api.hostels.getAverageOccupancy);
  const monthlyRevenue = useQuery(api.bookings.getMonthlyRevenue);
  const occupancyData = useQuery(api.hostels.getOccupancyData);
  const recentBookings = useQuery(api.bookings.getRecentBookings);

  if (totalHostels === undefined || averageOccupancy === undefined || 
      monthlyRevenue === undefined || occupancyData === undefined || 
      recentBookings === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <h1 className="text-2xl font-semibold">Hostel Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <StatCard
          title="Total Hostels"
          description="Number of hostels you manage"
          value={totalHostels.toString()}
        />
        <StatCard
          title="Average Occupancy"
          description="Across all hostels"
          value={`${averageOccupancy.toFixed(1)}%`}
        />
        <StatCard
          title="Monthly Revenue"
          description="Total revenue this month"
          value={`$${monthlyRevenue.toLocaleString()}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <OccupancyChart data={occupancyData} />
        <RecentBookings
          bookings={recentBookings.map(booking => ({
            ...booking,
            name: booking.guestId,
            hostel: booking.hostelId,
            checkIn: booking.checkInDate,
            checkOut: booking.checkOutDate,
            nights: Math.ceil((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 3600 * 24)),
          }))}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Make a Booking</h2>
        <BookingForm />
      </div>
    </main>
  );
}

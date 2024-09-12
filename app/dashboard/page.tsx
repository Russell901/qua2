"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import StatCard from "@/components/Shared/StatCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import BookingForm from "@/components/dashboard/BookingForm";

export default function Dashboard() {
  const totalHostels = useQuery(api.hostels.getTotalHostels);
  const averageOccupancy = useQuery(api.hostels.getAverageOccupancy);
  const monthlyRevenue = useQuery(api.bookings.getMonthlyRevenue);
  const occupancyData = useQuery(api.hostels.getOccupancyData);
  const recentBookings = useQuery(api.bookings.getRecentBookings);
  const hostels = useQuery(api.hostels.list);

  if (
    totalHostels === undefined ||
    averageOccupancy === undefined ||
    monthlyRevenue === undefined ||
    occupancyData === undefined ||
    recentBookings === undefined ||
    hostels === undefined
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Hostel Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          value={`${monthlyRevenue.toLocaleString("en-US", {
            style: "currency",
            currency: "MWK",
          })}`}
        />
      </div>

      <div className="grid grid-cols-1 mb-8">
        <div className="bg-white/5 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Occupancy Trends</h2>
          <OccupancyChart data={occupancyData} />
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-lg shadow-md flex flex-col gap-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
        <RecentBookings
          bookings={recentBookings.map((booking) => ({
            ...booking,
            guestName: booking.guestName,
            hostelName:
              hostels.find((h) => h._id === booking.hostelId)?.name ||
              "Unknown Hostel",
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            totalPrice: booking.totalPrice,
            createdAt: new Date(booking._creationTime).toISOString(),
          }))}
        />
        <BookingForm />
      </div>
    </main>
  );
}

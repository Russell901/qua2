"use client";

import StatCard from "@/components/Shared/StatCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import { occupancyData, recentBookings } from "@/data/dummyData";

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <h1 className="text-2xl font-semibold">Hostel Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <StatCard
          title="Total Hostels"
          description="Number of hostels you manage"
          value="5"
        />
        <StatCard
          title="Average Occupancy"
          description="Across all hostels"
          value="78.6%"
        />
        <StatCard
          title="Monthly Revenue"
          description="Total revenue this month"
          value="$42,350"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <OccupancyChart data={occupancyData} />
        <RecentBookings bookings={recentBookings} />
      </div>
    </main>
  );
}

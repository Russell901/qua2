'use client'
import React from 'react';
import HostelCard from '@/components/dashboard/HostelCard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AddHostelDialog } from '@/components/dashboard/AddHostelDialog';

export default function HostelsPage() {
  const hostels = useQuery(api.hostels.list);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Hostels</h1>
        <AddHostelDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels?.map((hostel) => (
          <HostelCard 
            key={hostel._id} 
            {...hostel}
            currentOccupancy={hostel.currentOccupancy ?? 0}
            availability={hostel.availability}
          />
        ))}
      </div>
    </div>
  )
}
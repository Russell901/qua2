import React from 'react';
import HostelCard from '@/components/dashboard/HostelCard';
import { hostels } from '@/data/dummyData';

// Mock data for hostels (replace with actual data from PayloadCMS)


export default function HostelsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Hostels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((hostel) => (
          <HostelCard key={hostel.id} {...hostel} />
        ))}
      </div>
    </div>
  )
}
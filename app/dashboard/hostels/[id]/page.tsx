'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { hostels } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AvailabilityBadge from '@/components/dashboard/AvailabilityBadge';


export default function HostelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Find the hostel by id
  const hostel = hostels.find((hostel) => hostel.id === id);

  if (!hostel) {
    return <p>Hostel not found</p>;
  }

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="container mx-auto py-8">
      <button
        onClick={handleBackClick}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        &larr; Back to Hostels
      </button>
      <h1 className="text-3xl font-bold mb-8">{hostel.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About this Hostel</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{hostel.description}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex justify-between'>
            <CardTitle>Occupancy</CardTitle>
            <AvailabilityBadge availability={hostel.availability}/>
          </CardHeader>
          <CardContent>
            
            <p className="text-sm text-muted-foreground mb-2">
              {hostel.currentOccupancy} / {hostel.capacity} beds occupied
            </p>
          </CardContent>
        </Card>

        {hostel.amenities?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {hostel.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {hostel.nearbyAttractions?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Nearby Attractions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {hostel.nearbyAttractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

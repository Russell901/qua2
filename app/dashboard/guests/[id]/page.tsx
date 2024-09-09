'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const guests = [
  { id: 1, name: "John Doe", hostel: "Backpackers Paradise", status: "paid" },
  { id: 2, name: "Jane Smith", hostel: "Urban Oasis", status: "partial" },
  { id: 3, name: "Mike Johnson", hostel: "Sunshine Hostels", status: "unpaid" },
];

const statusColors = {
  paid: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  unpaid: "bg-red-100 text-red-800",
};

function isValidStatus(status: string): status is keyof typeof statusColors {
  return status in statusColors;
}

const GuestDetailsPage = () => {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('ID from query:', id);
  }, [id]);

  if (!mounted) {
    return null; // Prevent server-side rendering issues
  }

  // Check if `id` is null or not a valid number
  const guestId = id ? Number(id) : null;
  const guest = guests.find(guest => guest.id === guestId);

  if (!guest) {
    return <div>Guest not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Guest Details</h1>
      <div className="border p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">{guest.name}</h2>
        <p className="mb-2"><strong>Hostel:</strong> {guest.hostel}</p>
        <p className="mb-4">
          <strong>Status:</strong>
          {isValidStatus(guest.status) ? (
            <Badge className={statusColors[guest.status]}>
              {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
          )}
        </p>
        <div className="flex space-x-2">
          <Button variant="outline">Update Status</Button>
          <Button variant="outline" color="red">Delete Guest</Button>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/dashboard/guests">
          <Button variant="link">Back to Guests List</Button>
        </Link>
      </div>
    </div>
  );
};

export default GuestDetailsPage;
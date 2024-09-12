import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActionsMenu } from "@/components/dashboard/ActionsMenu"; // Assuming you'll also extract ActionsMenu
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";

// Types
interface Guest {
  _id?: string;
  name: string;
  hostel: string;
  status: string;
  depositPaid?: boolean;
}

interface GuestRowProps {
  guest: Guest;
  onGuestDeleted: (id: string) => void;
}

const statusColors: { [key in Guest["status"]]: string } = {
  paid: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  unpaid: "bg-red-100 text-red-800",
};

export const GuestRow: React.FC<GuestRowProps> = ({ guest, onGuestDeleted }) => {
  const router = useRouter();
  const [status, setStatus] = useState(guest.status);
  const updateGuest = useMutation(api.guests.updateGuest);
  const deleteGuest = useMutation(api.guests.deleteGuest);

  const handleViewDetails = () => {
    router.push(`/dashboard/guests/${guest._id}`);
  };

  const handleUpdateStatus = async () => {
    const newStatus = status === 'paid' ? 'unpaid' : 'paid';
    try {
      await updateGuest({ id: guest._id as Id<"guests">, status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <TableRow key={guest._id}>
      <TableCell>
        <Link href={`/dashboard/guests/${guest._id}`} className="hover:underline">
          {guest.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/dashboard/guests/${guest._id}`} className="hover:underline">
          {guest.hostel}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/dashboard/guests/${guest._id}`}>
          <Badge className={statusColors[guest.status]}>
            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
          </Badge>
        </Link>
      </TableCell>
      <TableCell>
        {guest.depositPaid !== undefined
          ? guest.depositPaid
            ? "Yes"
            : "No"
          : "N/A"}
      </TableCell>
      <TableCell className="text-right">
        <ActionsMenu
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
          onDeleteGuest={async () => {
            try {
              await deleteGuest({ id: guest._id as Id<"guests"> });
              onGuestDeleted(guest._id as string);
            } catch (error) {
              console.error('Failed to delete guest:', error);
              // Handle error (e.g., show an error message to the user)
            }
          }}
        />
      </TableCell>
    </TableRow>
  );
};

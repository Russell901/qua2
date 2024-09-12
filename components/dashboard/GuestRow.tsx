import React from "react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActionsMenu } from "@/components/dashboard/ActionsMenu"; // Assuming you'll also extract ActionsMenu
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";

// Types
interface Guest {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
}

interface GuestRowProps {
  guest: Guest;
  onGuestDeleted: (id: string) => void;
}



export const GuestRow: React.FC<GuestRowProps> = ({ guest, onGuestDeleted }) => {
  const router = useRouter();
  const deleteGuest = useMutation(api.guests.deleteGuest);

  const handleViewDetails = () => {
    router.push(`/dashboard/guests/${guest._id}`);
  };

  return (
    <TableRow key={guest._id}>
      <TableCell>
        <Link href={`/dashboard/guests/${guest._id}`} className="hover:underline">
          {guest.firstName} {guest.lastName}
        </Link>
      </TableCell>
     
      <TableCell>
        <p>{guest.gender}</p>
      </TableCell>
      <TableCell>
        {guest.email}
      </TableCell>
      <TableCell>
        {guest.phoneNumber}
      </TableCell>
      <TableCell className="text-right">
        <ActionsMenu
          onViewDetails={handleViewDetails}
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

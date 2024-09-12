"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search } from "lucide-react";
import AddGuestFormDialog from "@/components/dashboard/AddGuestFormDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GuestRow } from "@/components/dashboard/GuestRow";
import { toast } from "@/hooks/use-toast";

import { Id } from "@/convex/_generated/dataModel";

// Update the Guest interface
interface Guest {
  _id?: Id<"guests">;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

const GuestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAddingGuestFormOpen, setIsAddingGuestFormOpen] = useState(false);

  // Fetch guests from Convex
  const guests = useQuery(api.guests.list) || [];

  const itemsPerPage = 10;

  // Update the filtering logic
  const filteredGuests = guests.filter(
    (guest) =>
      `${guest.firstName} ${guest.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addGuest = useMutation(api.guests.addGuest);

  const handleAddGuest = async (guest: Guest) => {
    try {
      console.log("Attempting to add guest:", guest); // Log the guest object
      const result = await addGuest(guest);
      console.log("Add guest result:", result); // Log the result from Convex

      setIsAddingGuestFormOpen(false);
      toast({
        title: "Guest added successfully",
        description: `${guest.firstName} ${guest.lastName} has been added to the system.`,
      });
    } catch (error) {
      console.error("Error adding guest:", error);
      toast({
        title: "Error adding guest",
        description: "An error occurred while adding the guest. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteGuest = useMutation(api.guests.deleteGuest);

  const handleGuestDeleted = async (guestId: Id<"guests">) => {
    try {
      const guestToDelete = guests.find(g => g._id === guestId);
      if (!guestToDelete) {
        throw new Error("Guest not found");
      }

      await deleteGuest({ id: guestId });

      toast({
        title: "Guest deleted successfully",
        description: `${guestToDelete.firstName} ${guestToDelete.lastName} has been removed from the system.`,
      });
    } catch (error) {
      console.error("Error deleting guest:", error);
      toast({
        title: "Error deleting guest",
        description: "An error occurred while deleting the guest. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Paginated guests for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGuests = filteredGuests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Guest Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests"
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAddingGuestFormOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          Add Guest
        </button>
        <AddGuestFormDialog
          isOpen={isAddingGuestFormOpen}
          onClose={() => setIsAddingGuestFormOpen(false)}
          onSubmit={handleAddGuest}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentGuests.map((guest) => (
              <GuestRow 
                key={guest._id} 
                guest={guest}
                onGuestDeleted={() => handleGuestDeleted(guest._id)} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default GuestsPage;

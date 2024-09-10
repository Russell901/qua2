'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Plus } from 'lucide-react';
import { recentBookings } from '@/data/dummyData';

// Types
interface Guest {
  id: number;
  name: string;
  hostel: string;
  status: string;
}

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface GuestRowProps {
  guest: Guest;
}


const statusColors: { [key in Guest['status']]: string } = {
  paid: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  unpaid: "bg-red-100 text-red-800",
};

// Pagination Component
const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-end space-x-2 mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>{currentPage} of {totalPages}</span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

// Guest Row Component
const GuestRow: React.FC<GuestRowProps> = ({ guest }) => (
  <TableRow key={guest.id}>
    <TableCell >
      <Link href={`/dashboard/guests/${guest.id}`} className="hover:underline">
        {guest.name}
      </Link>
    </TableCell>
    <TableCell>
      <Link href={`/dashboard/guests/${guest.id}`} className="hover:underline">
        {guest.hostel}
      </Link>
    </TableCell>
    <TableCell>
      <Link href={`/dashboard/guests/${guest.id}`}>
        <Badge className={statusColors[guest.status]}>
          {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
        </Badge>
      </Link>
    </TableCell>
    <TableCell className="text-right">
      <ActionsMenu />
    </TableCell>
  </TableRow>
);

// Actions Menu Component
const ActionsMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>View details</DropdownMenuItem>
      <DropdownMenuItem>Update status</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Delete guest</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const GuestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [guests] = useState<Guest[]>(recentBookings);

  const itemsPerPage = 10;

  // Filtering guests based on the search term
  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.hostel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginated guests for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGuests = filteredGuests.slice(startIndex, startIndex + itemsPerPage);

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
        <Button className="hover:bg-gray-100 focus:ring focus:ring-blue-300 transition-all" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add New Guest
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Hostel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentGuests.map(guest => (
              <GuestRow key={guest.id} guest={guest} />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        totalItems={filteredGuests.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GuestsPage;

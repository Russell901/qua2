"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import AddGuestFormDialog from "@/components/dashboard/AddGuestFormDialog";

const bookingSchema = z
  .object({
    guestId: z.string().min(1, "Guest is required"),
    hostelId: z.string().min(1, "Hostel is required"),
    checkInDate: z.string().min(1, "Check-in date is required"),
    checkOutDate: z.string().min(1, "Check-out date is required"),
  })
  .refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingGuestFormOpen, setIsAddingGuestFormOpen] = useState(false);
  const router = useRouter();
  const addBooking = useMutation(api.bookings.addBooking);
  const updateHostelOccupancy = useMutation(api.hostels.updateOccupancy);
  const guests = useQuery(api.guests.list) || [];
  const hostels = useQuery(api.hostels.list) || [];

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestId: "",
      hostelId: "",
      checkInDate: "",
      checkOutDate: "",
    },
  });

  useEffect(() => {
    if (!isAddingGuestFormOpen) {
      form.trigger();
    }
  }, [isAddingGuestFormOpen, form]);

  interface GuestData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: "male" | "female";
  }

  const addGuest = useMutation(api.guests.addGuest);

  const handleAddGuest = async (guestData: GuestData) => {
    try {
      const newGuestId = await addGuest({
        firstName: guestData.firstName,
        lastName: guestData.lastName,
        email: guestData.email,
        phoneNumber: guestData.phoneNumber,
        gender: guestData.gender,
      });

      form.setValue("guestId", newGuestId);

      toast({
        title: "Guest added successfully",
        description: `${guestData.firstName} ${guestData.lastName} has been added to the system.`,
      });
    } catch (error) {
      console.error("Error adding guest:", error);
      toast({
        title: "Error adding guest",
        description:
          "An error occurred while adding the guest. Please try again.",
        variant: "destructive",
      });
    }
    setIsAddingGuestFormOpen(false);
  };

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const selectedGuest = guests.find(
        (guest) => guest._id === values.guestId
      );
      if (!selectedGuest) {
        throw new Error("Selected guest not found");
      }

      const bookingId = await addBooking({
        guestId: values.guestId as Id<"guests">,
        hostelId: values.hostelId as Id<"hostels">,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        totalPrice: 0,
        status: "pending",
      });

      await updateHostelOccupancy({
        hostelName:
          hostels.find((hostel) => hostel._id === values.hostelId)?.name || "",
        increment: 1,
      });

      form.reset();
      setIsOpen(false);
      toast({
        title: "Booking created",
        description: "Your booking has been successfully created.",
      });

      router.push(`/dashboard/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create New Booking</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create a New Booking</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="guestId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a guest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {guests.map((guest) => (
                          <SelectItem key={guest._id} value={guest._id}>
                            {guest.firstName} {guest.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingGuestFormOpen(true)}
              >
                Add New Guest
              </Button>
              <AddGuestFormDialog
                isOpen={isAddingGuestFormOpen}
                onClose={() => setIsAddingGuestFormOpen(false)}
                onSubmit={handleAddGuest}
              />
              <FormField
                control={form.control}
                name="hostelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hostel</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a hostel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hostels.map((hostel) => (
                          <SelectItem key={hostel._id} value={hostel._id}>
                            {hostel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-in Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOutDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-out Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">Create Booking</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

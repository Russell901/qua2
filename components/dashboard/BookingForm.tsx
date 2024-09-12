"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

const bookingSchema = z.object({
  guestId: z.string().min(1, "Guest is required"),
  hostelId: z.string().min(1, "Hostel is required"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
}).refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
  message: "Check-out date must be after check-in date",
  path: ["checkOutDate"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isNewGuest, setIsNewGuest] = useState(false);
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

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const selectedGuest = guests.find(guest => guest._id === values.guestId);
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

      // Increment the currentOccupancy of the hostel
      await updateHostelOccupancy({
        hostelName: hostels.find(hostel => hostel._id === values.hostelId)?.name || '',
        increment: 1,
      });

      form.reset();
      toast({
        title: "Booking created",
        description: "Your booking has been successfully created.",
      });
      
      // Redirect to a booking details page or list
      router.push(`/bookings/${bookingId}`);
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
    <Card>
      <CardHeader>
        <CardTitle>Create a New Booking</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="guestId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a guest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {guests.map((guest) => (
                        <SelectItem key={guest._id} value={guest._id}>
                          {guest.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isNewGuest && (
              <Button variant="link" onClick={() => setIsNewGuest(true)}>
                Add New Guest
              </Button>
            )}
            {isNewGuest && (
              <Link href="/add-guest">
                <Button variant="secondary">Create New Guest</Button>
              </Link>
            )}
            <FormField
              control={form.control}
              name="hostelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
                    <Input type="date" {...field} />
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
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Booking</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
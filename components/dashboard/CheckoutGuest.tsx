import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";

export function CheckoutGuest({ bookingId, hostelId }: { bookingId: Id<"bookings">, hostelId: Id<"hostels"> }) {
  const updateHostelOccupancy = useMutation(api.hostels.updateOccupancy);
  const completeBooking = useMutation(api.bookings.completeBooking);

  const handleCheckout = async () => {
    try {
      await completeBooking({ bookingId });
      await updateHostelOccupancy({
        hostelName: hostelId, // Assuming hostelId is actually the hostel name
        increment: -1, // Decrease occupancy by 1
      });
      toast({
        title: "Checkout complete",
        description: "The guest has been checked out successfully.",
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({
        title: "Error",
        description: "Failed to complete checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleCheckout}>Check Out Guest</Button>;
}

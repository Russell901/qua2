import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Guest, guestSchema } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddGuestsFormDialogProps {
  isOpen: (boolean);
  onClose: () => void;
  onSubmit: (guest: Guest) => Promise<void>;
  hostels: string[];
}

const AddGuestsFormDialog: React.FC<AddGuestsFormDialogProps> = ({
  hostels,
  isOpen,
  onClose,
}) => {
  const addGuest = useMutation(api.guests.addGuest);

  const form = useForm<Guest>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      name: "",
      hostel: "",
      status: "unpaid",
    },
  });

  async function onSubmit(data: Guest) {
    try {
      await addGuest({ ...data });
      form.reset();
      onClose();
      toast({ title: "Success", description: "New guest added successfully." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new guest.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>
            Enter the details of the new guest.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hostel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hostel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hostels.map((hostel) => (
                        <SelectItem key={hostel} value={hostel}>
                          {hostel}
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<FormField
              control={form.control}
              name="depositPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Paid</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      checked={field.value}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />*/}
            <Button type="submit">Add Guest</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestsFormDialog;

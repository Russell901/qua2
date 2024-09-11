import { z } from "zod";

export interface Transaction {
  date: Date;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

export interface ErrorMessages {
  [key: string]: string;
}

//Form schemas
export const transactionSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category is required"),
});

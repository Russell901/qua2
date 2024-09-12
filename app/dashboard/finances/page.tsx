"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { z } from "zod";
import FinancialOverview from "@/components/dashboard/FinancialOverview";
import TransactionActions from "@/components/dashboard/TransactionActions";
import TransactionTable from "@/components/dashboard/TransactionTable";
import { Transaction, ErrorMessages } from "@/types/types";
import TransactionFormDialog from "@/components/dashboard/TransactionFormDialog";

// Define Zod schema for transaction validation
const transactionSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, { message: "Category is required" }),
});

export default function FinancesPage() {
  const transactions = useQuery(api.transactions.list) || [];
  const categories = useQuery(api.categories.list) || [];
  const addTransaction = useMutation(api.transactions.add);
  const addCategory = useMutation(api.categories.add);

  const [filter, setFilter] = useState<string>("all");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  const filteredTransactions = transactions.filter(
    (t) => filter === "all" || t.type === filter
  );

  const handleAddTransaction = async (transaction: Transaction) => {
    const result = transactionSchema.safeParse(transaction);
    if (!result.success) {
      const fieldErrors: ErrorMessages = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof Transaction] = issue.message;
      });
      return; // Return early without adding the transaction
    }

    const updatedTransaction = {
      ...transaction,
      date: transaction.date.toISOString(), // Convert Date to string
      amount:
        transaction.type === "expense"
          ? -Math.abs(transaction.amount)
          : Math.abs(transaction.amount),
    };

    await addTransaction(updatedTransaction);
    setIsTransactionFormOpen(false);
  };

  const handleAddCategory = async () => {
    if (newCategory && !categories.some((cat) => cat.name === newCategory)) {
      await addCategory({ name: newCategory });
      setNewCategory("");
    } else {
      alert("Category already exists or empty.");
    }
  };

  const financialSummary = filteredTransactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.totalIncome += t.amount;
      else acc.totalExpenses += Math.abs(t.amount);
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );
  const netIncome =
    financialSummary.totalIncome - financialSummary.totalExpenses;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Finances</h1>

      <FinancialOverview
        totalIncome={financialSummary.totalIncome}
        totalExpenses={financialSummary.totalExpenses}
        netIncome={netIncome}
      />

      <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Transactions</h1>
        <div className="w-full sm:w-auto">
          <TransactionActions
            filter={filter}
            setFilter={setFilter}
            isAddingCategory={isAddingCategory}
            setIsAddingCategory={setIsAddingCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleAddCategory={handleAddCategory}
            categories={categories.map((category) => category.name)}
            onAddTransactionClick={() => setIsTransactionFormOpen(true)}
          />
        </div>
      </div>

      <TransactionFormDialog
        isOpen={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleAddTransaction}
        categories={categories.map((category) => category.name)}
      />

      <TransactionTable
        transactions={filteredTransactions.map((transaction) => ({
          ...transaction,
          id: transaction._id.toString(),
        }))}
      />
    </div>
  );
}

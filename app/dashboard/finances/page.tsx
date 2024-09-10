"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from "lucide-react";
import TransactionTable from "@/components/dashboard/TransactionTable";

// Mock data for transactions and categories
const initialTransactions = [
  {
    id: 1,
    date: "2023-07-01",
    description: "Room booking",
    amount: 150,
    type: "income",
    category: "Bookings",
  },
  {
    id: 2,
    date: "2023-07-02",
    description: "Cleaning supplies",
    amount: -50,
    type: "expense",
    category: "Supplies",
  },
];

const initialCategories = [
  "Bookings",
  "Supplies",
  "Food",
  "Utilities",
  "Maintenance",
];

// Define Zod schema for transaction validation
const transactionSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, { message: "Category is required" }),
});

type Transaction = z.infer<typeof transactionSchema>;
type ErrorMessages = Partial<Record<keyof Transaction, string[]>>;

// Define types for props and state
type TransactionActionsProps = {
  filter: string;
  setFilter: (filter: string) => void;
  isAddingTransaction: boolean;
  setIsAddingTransaction: (isAdding: boolean) => void;
  isAddingCategory: boolean;
  setIsAddingCategory: (isAdding: boolean) => void;
  newCategory: string;
  setNewCategory: (category: string) => void;
  handleAddCategory: () => void;
  newTransaction: Transaction;
  setNewTransaction: (transaction: Transaction) => void;
  handleAddTransaction: () => void;
  categories: string[];
  errors: ErrorMessages;
};

type TransactionFormDialogProps = {
  newTransaction: Transaction;
  setNewTransaction: (transaction: Transaction) => void;
  categories: string[];
  errors: ErrorMessages;
  onSave: () => void;
};

type FormFieldProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string[];
};

type FormSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string[];
};

export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions.map((transaction) => ({
      ...transaction,
      type: transaction.type as "income" | "expense",
    }))
  );
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [filter, setFilter] = useState<string>("all");
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    date: "",
    description: "",
    amount: 0,
    type: "income",
    category: "",
  });
  const [errors, setErrors] = useState<ErrorMessages>({});

  const filteredTransactions = transactions.filter(
    (t) => filter === "all" || t.type === filter
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netIncome = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    const result = transactionSchema.safeParse(newTransaction);
    if (!result.success) {
      const fieldErrors: ErrorMessages = {};
      Object.entries(result.error.format()).forEach(([key, value]) => {
        if (
          key !== "_errors" &&
          "errors" in value &&
          Array.isArray(value.errors)
        ) {
          fieldErrors[key as keyof Transaction] = value.errors;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const updatedTransaction = {
      ...newTransaction,
      id: transactions.length + 1,
      amount:
        newTransaction.type === "expense"
          ? -Math.abs(newTransaction.amount)
          : Math.abs(newTransaction.amount),
    };

    setTransactions([...transactions, updatedTransaction]);
    resetTransactionForm();
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    } else {
      alert("Category already exists or empty.");
    }
  };

  const resetTransactionForm = () => {
    setNewTransaction({
      date: "",
      description: "",
      amount: 0,
      type: "income",
      category: categories[0],
    });
    setErrors({});
    setIsAddingTransaction(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Finances</h1>

      <FinancialOverview
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netIncome={netIncome}
      />

      <TransactionActions
        filter={filter}
        setFilter={setFilter}
        isAddingTransaction={isAddingTransaction}
        setIsAddingTransaction={setIsAddingTransaction}
        isAddingCategory={isAddingCategory}
        setIsAddingCategory={setIsAddingCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
        handleAddTransaction={handleAddTransaction}
        categories={categories}
        errors={errors}
      />

      <TransactionTable transactions={filteredTransactions.map(transaction => ({
        ...transaction,
        id: parseInt(transaction.date.replace(/-/g, '') + transaction.description.length.toString().padStart(3, '0'))
      }))} />
    </div>
  );
}

// Component for financial overview (Total Income, Expenses, Net Income)
function FinancialOverview({
  totalIncome,
  totalExpenses,
  netIncome,
}: {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <OverviewCard
        title="Total Income"
        amount={totalIncome}
        icon={<TrendingUp className="text-green-500 h-4 w-4" />}
      />
      <OverviewCard
        title="Total Expenses"
        amount={totalExpenses}
        icon={<TrendingDown className="text-red-500 h-4 w-4" />}
      />
      <OverviewCard
        title="Net Income"
        amount={netIncome}
        icon={
          netIncome >= 0 ? (
            <ArrowUpRight className="text-green-500 h-4 w-4" />
          ) : (
            <ArrowDownRight className="text-red-500 h-4 w-4" />
          )
        }
      />
    </div>
  );
}

// Reusable component for overview cards
function OverviewCard({
  title,
  amount,
  icon,
}: {
  title: string;
  amount: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
      </CardContent>
    </Card>
  );
}

// Transaction actions for filtering and adding new transactions and categories
function TransactionActions({
  filter,
  setFilter,
  isAddingTransaction,
  setIsAddingTransaction,
  isAddingCategory,
  setIsAddingCategory,
  newCategory,
  setNewCategory,
  handleAddCategory,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  categories,
  errors,
}: TransactionActionsProps) {
  const handleRemoveCategory = (category: string) => {
    // Implement category removal logic here
    console.log(`Removing category: ${category}`);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Recent Transactions</h2>
      <div className="space-x-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter transactions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expenses</SelectItem>
          </SelectContent>
        </Select>
        {/* Add Transaction Dialog */}
        <Dialog
          open={isAddingTransaction}
          onOpenChange={setIsAddingTransaction}
        >
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <TransactionFormDialog
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
            categories={categories}
            errors={errors}
            onSave={handleAddTransaction}
          />
        </Dialog>
        {/* Add Category Dialog */}
        <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
          <DialogTrigger asChild>
            <Button variant="outline">Manage Categories</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Enter a new category or remove existing ones.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {" "}
              <div className="flex gap-4 items-center">
                {" "}
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                />{" "}
                <Button onClick={handleAddCategory}>Add</Button>{" "}
              </div>{" "}
              <div>
                {" "}
                <h4 className="font-semibold mb-2">Existing Categories</h4>{" "}
                <ul className="list-disc pl-5 space-y-1">
                  {" "}
                  {categories.map((category) => (
                    <li key={category} className="flex justify-between">
                      {" "}
                      <span>{category}</span>{" "}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCategory(category)}
                      >
                        {" "}
                        <X className="h-4 w-4" />{" "}
                      </Button>{" "}
                    </li>
                  ))}{" "}
                </ul>{" "}
              </div>{" "}
            </div>{" "}
          </DialogContent>{" "}
        </Dialog>{" "}
      </div>{" "}
    </div>
  );
}

// Component for the transaction form dialog
function TransactionFormDialog({
  newTransaction,
  setNewTransaction,
  categories,
  errors,
  onSave,
}: TransactionFormDialogProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogDescription>
          Enter the details of the new transaction.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <FormField
          id="date"
          label="Date"
          value={newTransaction.date}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, date: e.target.value })
          }
          error={errors?.date}
        />
        <FormField
          id="description"
          label="Description"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              description: e.target.value,
            })
          }
          error={errors?.description}
        />
        <FormField
          id="amount"
          label="Amount"
          value={newTransaction.amount.toString()}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              amount: parseFloat(e.target.value),
            })
          }
          error={errors?.amount}
        />
        <FormSelect
          id="type"
          label="Type"
          value={newTransaction.type}
          onChange={(value) =>
            setNewTransaction({
              ...newTransaction,
              type: value as "income" | "expense",
            })
          }
          options={[
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
          error={errors?.type}
        />
        <FormSelect
          id="category"
          label="Category"
          value={newTransaction.category || categories[0]}
          onChange={(value) =>
            setNewTransaction({ ...newTransaction, category: value })
          }
          options={categories.map((cat) => ({ value: cat, label: cat }))}
          error={errors?.category}
        />
      </div>
      <DialogFooter>
        <Button onClick={onSave}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Reusable form field component
function FormField({ id, label, value, onChange, error }: FormFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input id={id} className="col-span-3" value={value} onChange={onChange} />
      {error && (
        <p className="text-red-500 col-span-3 col-start-2">{error[0]}</p>
      )}
    </div>
  );
}

// Reusable form select component
function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: FormSelectProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 col-span-3 col-start-2">{error[0]}</p>
      )}
    </div>
  );
}

// Component for displaying the transaction table


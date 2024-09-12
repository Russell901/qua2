import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";

type TransactionActionsProps = {
  filter: string;
  setFilter: (filter: string) => void;
  isAddingCategory: boolean;
  setIsAddingCategory: (isAdding: boolean) => void;
  newCategory: string;
  setNewCategory: (category: string) => void;
  handleAddCategory: () => void;
  categories: string[];
  onAddTransactionClick: () => void;
};

export default function TransactionActions({
  filter,
  setFilter,
  isAddingCategory,
  setIsAddingCategory,
  newCategory,
  setNewCategory,
  handleAddCategory,
  categories,
  onAddTransactionClick,
}: TransactionActionsProps) {
  const handleRemoveCategory = (category: string) => {
    // Implement category removal logic here
    console.log(`Removing category: ${category}`);
  };

  return (
    <div className="flex items-center align-end mb-4">
      <div className="  w-1/2 space-x-3 flex flex-row justify-between items-center ">
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
        <Button onClick={onAddTransactionClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
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
              <div className="flex gap-4 items-center">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                />
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Existing Categories</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {categories.map((category) => (
                    <li key={category} className="flex justify-between">
                      <span>{category}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCategory(category)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

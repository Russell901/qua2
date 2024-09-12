import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpCircle, ArrowDownCircle, Calendar, Tag } from "lucide-react";

// Define the Transaction type locally since the import is not working
type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  category: string;
};

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto bg-white/5 rounded-lg shadow-lg p-4">
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold text-primary">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-primary/5 transition-colors duration-200">
                <TableCell className="flex flex-row items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </TableCell>
                <TableCell>
                  
                  {transaction.description}
                </TableCell>
                <TableCell className={`font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === 'income' ? <ArrowUpCircle className="inline mr-1 h-4 w-4" /> : <ArrowDownCircle className="inline mr-1 h-4 w-4" />}
                  MWK {Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className="flex flex-row items-center">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                  {transaction.category}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

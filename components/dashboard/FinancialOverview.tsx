import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

type OverviewCardProps = {
  title: string;
  amount: number;
  icon: React.ReactNode;
};

function OverviewCard({ title, amount, icon }: OverviewCardProps) {
  return (
    <Card className=" border-none text-foreground">
      <CardHeader className="flex justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">MWK&nbsp;{amount.toFixed(2)}</div>
      </CardContent>
    </Card>
  );
}

export default function FinancialOverview({
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
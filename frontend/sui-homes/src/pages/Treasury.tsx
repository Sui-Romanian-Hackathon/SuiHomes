import { useMemo } from "react";
import tailwind from "tailwindcss/tailwind.css";
interface Expense {
  description: string;
  amount: number;
  date: number; // unix ms
}

interface Treasury {
  balance: number;
  expenses: Expense[];
}

// Mock data – replace with API / on-chain fetch
const treasury: Treasury = {
  balance: 75000,
  expenses: [
    {
      description: "Elevator maintenance",
      amount: 5000,
      date: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      description: "Rooftop solar panels",
      amount: 40000,
      date: Date.now() - 1000 * 60 * 60 * 24 * 10,
    },
    {
      description: "Garden landscaping",
      amount: 10000,
      date: Date.now() - 1000 * 60 * 60 * 24 * 15,
    },
  ],
};

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString();
}

export default function TreasuryPage() {
  const sortedExpenses = useMemo(() => {
    return [...treasury.expenses].sort((a, b) => b.date - a.date);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Treasury Balance */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Current Treasury Balance</h2>
          <p className="text-3xl font-bold text-green-400">${treasury.balance.toLocaleString()}</p>
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {sortedExpenses.length === 0 ? (
            <div className="text-neutral-400 text-center py-10">No expenses recorded</div>
          ) : (
            sortedExpenses.map((expense, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-neutral-700 transition"
              >
                <div>
                  <p className="font-medium text-base">{expense.description}</p>
                  <p className="text-sm text-neutral-400">{formatDate(expense.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-400">-${expense.amount.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

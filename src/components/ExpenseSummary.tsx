import React from 'react';
import { IndianRupee, TrendingUp, Calendar } from 'lucide-react';
import { Expense, EXPENSE_CATEGORIES } from '../types';
import { formatCurrency, getTotalExpenses, getExpensesByCategory } from '../utils/helpers';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalExpenses = getTotalExpenses(expenses);
  const expensesByCategory = getExpensesByCategory(expenses);
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    return expenseDate.getMonth() === currentDate.getMonth() && 
           expenseDate.getFullYear() === currentDate.getFullYear();
  });
  
  const monthlyTotal = getTotalExpenses(currentMonthExpenses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Expenses */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium">Total Expenses</p>
            <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
          </div>
         <div className="bg-white bg-opacity-20 rounded-full p-3">
  <IndianRupee className="w-6 h-6" />
</div>

        </div>
      </div>

      {/* Monthly Expenses */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">This Month</p>
            <p className="text-2xl font-bold">{formatCurrency(monthlyTotal)}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-3">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Number of Transactions */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Transactions</p>
            <p className="text-2xl font-bold">{expenses.length}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full p-3">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(expensesByCategory).length > 0 && (
        <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h3>
          <div className="space-y-3">
            {Object.entries(expensesByCategory)
              .sort(([,a], [,b]) => b - a)
              .map(([categoryId, amount]) => {
                const categoryInfo = EXPENSE_CATEGORIES.find(cat => cat.id === categoryId);
                const percentage = (amount / totalExpenses) * 100;
                
                return (
                  <div key={categoryId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${categoryInfo?.color || 'bg-gray-500'}`} />
                      <span className="text-sm font-medium text-gray-700">
                        {categoryInfo?.name || 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${categoryInfo?.color || 'bg-gray-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 w-20 text-right">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;
import React from 'react';
import { Edit3, Trash2, Calendar, Tag } from 'lucide-react';
import { Expense, EXPENSE_CATEGORIES } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';

interface ExpenseListProps {
  expenses: Expense[];
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEditExpense,
  onDeleteExpense
}) => {
  const getCategoryInfo = (categoryId: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.id === categoryId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Tag className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-medium">No expenses yet</p>
          <p className="text-sm">Add your first expense to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map(expense => {
        const categoryInfo = getCategoryInfo(expense.category);
        
        return (
          <div
            key={expense.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${categoryInfo.color}`} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {expense.description}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{categoryInfo.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(expense.amount)}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onEditExpense(expense)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit expense"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
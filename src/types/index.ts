export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  date: string;
}

export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', color: 'bg-orange-500' },
  { id: 'transport', name: 'Transportation', color: 'bg-blue-500' },
  { id: 'rent', name: 'Rent & Utilities', color: 'bg-purple-500' },
  { id: 'shopping', name: 'Shopping', color: 'bg-pink-500' },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-indigo-500' },
  { id: 'healthcare', name: 'Healthcare', color: 'bg-red-500' },
  { id: 'education', name: 'Education', color: 'bg-yellow-500' },
  { id: 'other', name: 'Other', color: 'bg-gray-500' }
] as const;
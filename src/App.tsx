import React, { useState, useEffect } from 'react';
import { Wallet, Plus, BarChart3 } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseFilters from './components/ExpenseFilters';
import { Expense } from './types';
import { loadExpenses, saveExpenses, exportExpenses } from './utils/storage';
import { filterExpenses } from './utils/helpers';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedExpenses = loadExpenses();
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
    setShowForm(false);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    ));
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleExport = () => {
    const filtered = filterExpenses(expenses, selectedCategory, searchTerm);
    exportExpenses(filtered);
  };

  const filteredExpenses = filterExpenses(expenses, selectedCategory, searchTerm);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 rounded-lg p-2">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
                <p className="text-sm text-gray-500">Track your daily expenses</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
          </div>
        </div>
      </header>

    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        <ExpenseSummary expenses={expenses} />

       
        {showForm && (
          <ExpenseForm
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
          />
        )}

        {/* Filters */}
        <ExpenseFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onExport={handleExport}
          expenseCount={filteredExpenses.length}
        />

        {/* Expense List */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Recent Expenses</h2>
          </div>
          <ExpenseList
            expenses={filteredExpenses}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 ExpenseTracker. Built with React & TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
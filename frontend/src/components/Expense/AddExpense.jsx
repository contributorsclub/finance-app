import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../services/expense";
import {
  Tag,
  Calendar,
  Repeat,
  FileText,
  ArrowRight,
  X,
} from "lucide-react";
import { MdCurrencyRupee } from "react-icons/md";

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    type: "",
    isRecurring: false,
    recurringInterval: "",
    nextRecurringDate: "",
    notes: "",
    transactionType: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "Groceries",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Dining Out",
    "Shopping",
    "Rent/Mortgage",
    "Savings",
    "Other",
  ];
  const transactionTypes = ["Cash", "Gpay", "PhonePay", "CreditCard"];
  const type = ["Income", "Expense"];

  // Function to calculate the next recurring date
  const calculateNextRecurringDate = (date, frequency) => {
    if (!date || !frequency) return null;
    let nextDate = new Date(date);

    switch (frequency) {
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "monthly":
        const currentMonth = nextDate.getMonth();
        nextDate.setMonth(currentMonth + 1);

        // Handle month-end overflow (e.g., Jan 31 → Feb 28)
        if (nextDate.getDate() !== new Date(date).getDate()) {
          nextDate.setDate(0);
        }
        break;
      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        return null;
    }
    return nextDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Calculate next recurring date before sending data
      let nextRecurringDate = null;
      if (formData.isRecurring) {
        nextRecurringDate = calculateNextRecurringDate(
          formData.date,
          formData.recurringInterval
        );
      }

      // Prepare expense object
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        nextRecurringDate, // Include nextRecurringDate
      };
      console.log(expenseData);
      await addExpense(expenseData);

      navigate("/");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError(error.message || "Failed to add expense");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="bg-blue-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdCurrencyRupee className="mr-3 text-blue-600" />
            Add New Transaction
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Record your income or expense to track your financial activities
          </p>
        </div>

        <form onSubmit={handleAddExpense} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <MdCurrencyRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="amount"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Transaction Type</option>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                {type.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-900">
              Mark as recurring transaction
            </label>
          </div>

          {formData.isRecurring && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recurring Interval
              </label>
              <select
                name="recurringInterval"
                value={formData.recurringInterval}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              >
                <option value="">Select Frequency</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional details"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
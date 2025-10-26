import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../services/expense";
import { MdCurrencyRupee } from "react-icons/md";
import { X, Repeat, Calendar } from "lucide-react";

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

  const transactionTypes = ["Cash", "GPay", "PhonePe", "CreditCard"];
  const types = ["Income", "Expense"];

  // ✅ Function to calculate next recurring date
  const calculateNextRecurringDate = (date, frequency) => {
    if (!date || !frequency) return "";
    let nextDate = new Date(date);

    switch (frequency) {
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "monthly":
        const month = nextDate.getMonth();
        nextDate.setMonth(month + 1);
        // Adjust for month-end overflow
        if (nextDate.getDate() !== new Date(date).getDate()) {
          nextDate.setDate(0);
        }
        break;
      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        return "";
    }

    return nextDate.toISOString().split("T")[0];
  };

  // 🔁 Auto-update nextRecurringDate when frequency or date changes
  useEffect(() => {
    if (formData.isRecurring && formData.date && formData.recurringInterval) {
      const nextDate = calculateNextRecurringDate(
        formData.date,
        formData.recurringInterval
      );
      setFormData((prev) => ({ ...prev, nextRecurringDate: nextDate }));
    }
  }, [formData.date, formData.recurringInterval, formData.isRecurring]);

  // 🖊 Input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🚀 Form submission
  const handleAddExpense = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (formData.isRecurring && !formData.recurringInterval) {
        setError("Please select a recurring frequency.");
        setIsLoading(false);
        return;
      }

      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      await addExpense(expenseData);
      navigate("/");
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.message || "Failed to add expense.");
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="bg-blue-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdCurrencyRupee className="mr-2 text-blue-600" />
            Add New Transaction
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Record your income or expense and manage recurring payments easily
          </p>
        </div>

        <form onSubmit={handleAddExpense} className="p-6 space-y-5">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <MdCurrencyRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Transaction Type</option>
              {transactionTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Recurring Section */}
          <div className="border-t pt-4">
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-900">
                Mark as recurring transaction
              </span>
            </label>

            {formData.isRecurring && (
              <div className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
                  <Repeat size={18} /> <span>Recurring Settings</span>
                </div>

                <select
                  name="recurringInterval"
                  value={formData.recurringInterval}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Frequency</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>

                {formData.nextRecurringDate && (
                  <div className="flex items-center text-sm text-gray-700 mt-2">
                    <Calendar size={16} className="mr-2 text-blue-600" />
                    Next recurring on:{" "}
                    <span className="font-semibold ml-1">
                      {formData.nextRecurringDate}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>d
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
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

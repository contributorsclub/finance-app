import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpenseById } from "../../services/expense";
import {
  Calendar,
  DollarSign,
  Tag,
  Repeat,
  FileText,
  ArrowLeft,
} from "lucide-react";

const ExpenseDetail = () => {
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateNextRecurringDate = (expense) => {
    // First, check if nextRecurringDate is already in the database
    if (expense.nextRecurringDate) {
      return formatDate(expense.nextRecurringDate);
    }

    // Fallback calculation if nextRecurringDate is not in the database
    if (!expense.isRecurring) return null;

    const currentDate = new Date(expense.date);
    let nextDate = new Date(currentDate);

    switch (expense.recurringInterval) {
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        return null;
    }

    return formatDate(nextDate);
  };

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await getExpenseById(id);
        console.log("Expense Details:", response); // Log the full response for debugging
        setExpense(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch expense details");
        setLoading(false);
      }
    };

    fetchExpenseDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (!expense)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No expense found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <button
          onClick={() => navigate("/expenses")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Expenses
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Expense Details
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <DollarSign className="mr-2 text-gray-600" />
            <span
              className={`font-semibold ${
                expense.type === "Income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatCurrency(expense.amount)}
            </span>
          </div>

          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-600" />
            <span>{formatDate(expense.date)}</span>
          </div>

          <div className="flex items-center">
            <Tag className="mr-2 text-gray-600" />
            <span>{expense.category}</span>
          </div>

          <div className="flex items-center">
            <Repeat className="mr-2 text-gray-600" />
            <span>
              {expense.isRecurring
                ? `${
                    expense.recurringInterval || expense.recurringFrequency
                  } (Next: ${calculateNextRecurringDate(expense)})`
                : "Not Recurring"}
            </span>
          </div>
        </div>

        {expense.notes && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FileText className="mr-2 text-gray-600" />
              <h2 className="text-xl font-semibold">Notes</h2>
            </div>
            <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">
              {expense.notes}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(`/updateExpense/${expense._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;
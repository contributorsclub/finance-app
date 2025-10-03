import React from "react";
import { Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/Expense/ExpenseTracker";
import AddExpense from "./components/Expense/AddExpense";
import UpdateExpense from "./components/Expense/UpdateExpense";
import Login from "./components/Authentication/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Authentication/Signup";
import Navbar from "./components/SharedComponents/Navbar";
import Footer from "./components/SharedComponents/Footer";
import RetirementGoalsPage from "./Pages/Retire/RetirementGoalsPage";
import PortfolioOptionsPage from "./Pages/Invest/PortfolioOptionsPage";
import ExpenseDetail from "./components/Expense/ExpenseDetail";

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ExpenseTracker />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/retire/goals" element={<RetirementGoalsPage />} />
        <Route path="/invest/portfolio-options" element={<PortfolioOptionsPage />} />
        <Route path="/updateExpense/:id" element={<UpdateExpense />} />
        <Route path="/expense/:id" element={<ExpenseDetail />} />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
      <Footer/>
    </>
  );
};

export default App;

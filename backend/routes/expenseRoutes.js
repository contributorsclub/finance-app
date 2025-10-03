const express = require("express");
const Expense = require("../models/expense.js");
const authMiddleware = require("../middlewares/auth.js");
const router = express.Router();


router.post("/add", authMiddleware , async (req, res) => {
  try {
    const { amount, category, isRecurring,recurringInterval,type,nextRecurringDate,transactionType, date, notes } = req.body;
    console.log("Print: ", req.userId);
    const userId = req.userId;
    
    const newExpense = new Expense({
      userId,
      // accountId: req.account.id,
      amount,
      category,
      transactionType,
      type,
      isRecurring,
      recurringInterval,
      nextRecurringDate,
      date,
      notes,
    });
    console.log("Hello",newExpense);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/",authMiddleware, async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const expenses = await Expense.find({userId});
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    const {id} = req.params;
    const expense = await Expense.findById(id);
    if (expense.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden: You can't delete this expense" });
    }

    const expenseD = await Expense.findByIdAndDelete(id);
    res.status(200).json(expenseD);

  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id",authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log("ID",id);

  if (!id) {
    return res.status(400).json({ message: "Expense ID is required" });
  }

  try {
    const expense = await Expense.findById(id);
    // console.log(expense);
    console.log("Expense Id: ", expense.userId.toString());
    console.log(req.userId);

    if (expense.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden: You can't delete this expense" });
    }

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
    return expense;
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id",authMiddleware, async (req, res) => {
  try {
    const {id} = req.params;
    // console.log("ID:", id);
    // console.log("Req.Body: ", req.body);
    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(expense);

    if (expense.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden: You can't delete this expense" });
    }

    res.status(200).json({message: "Changes done"});
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const RetirementGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentAge: { type: Number, required: true },
    retirementAge: { type: Number, required: true },
    currentSavings: { type: Number, required: true, default: 0 },
    monthlyContribution: { type: Number, required: true },
    expectedAnnualReturn: { type: Number, default: 7 }, // Default 7% return
    inflationRate: { type: Number, default: 4 }, // Default 3% inflation
    desiredMonthlyIncome: { type: Number, required: true },
    lifeExpectancy: { type: Number, default: 85 }, // Default life expectancy 85 years
  },
  { timestamps: true }
);

module.exports = mongoose.model("RetirementGoal", RetirementGoalSchema);

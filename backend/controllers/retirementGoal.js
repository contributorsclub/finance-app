const RetirementGoal = require("../models/retirementGoal");

// ✅ Create or Update Retirement Goal
exports.setRetirementGoal = async (req, res) => {
    try {
        const userId = req.userId; // Extract userId from authMiddleware

        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const {
            currentAge = 25,
            retirementAge = 60,
            currentSavings = 0,
            monthlyContribution = 5000,
            desiredMonthlyIncome = 40000,
        } = req.body;

        let retirementGoal = await RetirementGoal.findOne({ userId });

        if (retirementGoal) {
            retirementGoal.currentAge = currentAge;
            retirementGoal.retirementAge = retirementAge;
            retirementGoal.currentSavings = currentSavings;
            retirementGoal.monthlyContribution = monthlyContribution;
            retirementGoal.desiredMonthlyIncome = desiredMonthlyIncome;
            await retirementGoal.save();
            return res.status(200).json({ message: "Retirement goal updated successfully", retirementGoal });
        }

        retirementGoal = new RetirementGoal({
            userId,
            currentAge,
            retirementAge,
            currentSavings,
            monthlyContribution,
            desiredMonthlyIncome,
        });

        await retirementGoal.save();
        res.status(201).json({ message: "Retirement goal set successfully", retirementGoal });
    } catch (error) {
        console.error("Error setting retirement goal:", error);
        res.status(500).json({ message: "Error setting retirement goal", error: error.message });
    }
};

// ✅ Fetch Retirement Goal
exports.getRetirementGoal = async (req, res) => {
    try {
        const userId = req.userId; // Extract userId from authMiddleware
        // console.log("Retirement Id", userId)
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const retirementGoal = await RetirementGoal.findOne({ userId });
        // console.log("Retirement Goal Data",retirementGoal);

        if (!retirementGoal) return res.status(404).json({ message: "No retirement goal found" });

        res.status(200).json(retirementGoal);
    } catch (error) {
        console.error("Error fetching retirement goal:", error);
        res.status(500).json({ message: "Error fetching retirement goal", error: error.message });
    }
};

// ✅ Delete Retirement Goal
exports.deleteRetirementGoal = async (req, res) => {
    try {
        const userId = req.userId; // Extract userId from authMiddleware
        console.log("Delete", userId)
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const deletedGoal = await RetirementGoal.findOneAndDelete({ userId });

        if (!deletedGoal) {
            return res.status(404).json({ message: "No retirement goal found" });
        }

        res.status(200).json({ message: "Retirement goal deleted successfully" });
    } catch (error) {
        console.error("Error deleting retirement goal:", error);
        res.status(500).json({ message: "Error deleting retirement goal", error: error.message });
    }
};

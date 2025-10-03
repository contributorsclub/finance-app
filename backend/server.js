const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const cookieParser = require("cookie-parser");
// const retirementGoal = require("./routes/retirementGoal");

const allowedOrigins = ["http://localhost:5173"];

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/expense", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
// app.use("/api/retirement", retirementGoal);
app.get("/check-cookies", (req, res) => {
  console.log("Cookies received:", req.cookies); 
  res.json(req.cookies);
});


app.get("/", (req, res) => {
  res.send("Server is running...");
});

mongoose
  .connect(process.env.MONGO_URI, {
    tlsAllowInvalidCertificates: true,
  })

  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

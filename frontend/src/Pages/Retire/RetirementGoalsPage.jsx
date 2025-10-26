import React, { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  Goal,
} from "lucide-react";
import { MdCurrencyRupee } from "react-icons/md";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RetirementGoalsPage = () => {
  const [formData, setFormData] = useState({
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 5000,
    expectedAnnualReturn: 7,
    inflationRate: 4,
    desiredMonthlyIncome: 60000,
    lifeExpectancy: 85,
  });

  const [calculationResults, setCalculationResults] = useState({
    yearsToRetirement: 0,
    estimatedTotalNeeds: 0,
    annualSavingsRequired: 0,
    retirementFundProjection: 0,
    investmentSuggestions: "", // Will hold dummy data
  });

  // Dummy chart data
  const dummyChartData = [
    { age: 35, fund: 50000 },
    { age: 40, fund: 290000 },
    { age: 45, fund: 570000 },
    { age: 50, fund: 870000 },
    { age: 55, fund: 1190000 },
    { age: 60, fund: 1550000 },
    { age: 65, fund: 1950000 },
  ];

  useEffect(() => {
    const yearsToRetirement = formData.retirementAge - formData.currentAge;
    const estimatedTotalNeeds = formData.desiredMonthlyIncome * 12 * 25; // 25x annual income
    const annualSavingsRequired =
      (estimatedTotalNeeds - formData.currentSavings) / yearsToRetirement;
    const retirementFundProjection =
      formData.currentSavings + formData.monthlyContribution * 12 * yearsToRetirement;

    const dummySuggestions = `
Retirement Investment Analysis:

- Current Age: ${formData.currentAge}
- Retirement Age: ${formData.retirementAge}
- Current Savings: ₹${formData.currentSavings}
- Monthly Contribution: ₹${formData.monthlyContribution}
- Expected Annual Return: ${formData.expectedAnnualReturn}%
- Inflation Rate: ${formData.inflationRate}%
- Desired Monthly Income: ₹${formData.desiredMonthlyIncome}
- Life Expectancy: ${formData.lifeExpectancy} years

Projection Results:
- Years to Retirement: ${yearsToRetirement}
- Estimated Total Needs: ₹${estimatedTotalNeeds}
- Annual Savings Required: ₹${annualSavingsRequired.toFixed(2)}
- Retirement Fund Projection: ₹${retirementFundProjection}

Suggested Investment Strategies (Dummy):
1. Diversify portfolio across stocks, bonds, and mutual funds.
2. Maximize contributions to retirement accounts early to leverage compounding.
3. Include tax-efficient investment options such as PPF or ELSS.
4. Adjust asset allocation as you approach retirement for reduced risk.
5. Monitor and rebalance portfolio annually.
`;

    setCalculationResults({
      yearsToRetirement,
      estimatedTotalNeeds,
      annualSavingsRequired,
      retirementFundProjection,
      investmentSuggestions: dummySuggestions,
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  // Chart configuration
  const chartData = {
    labels: dummyChartData.map((item) => item.age),
    datasets: [
      {
        label: "Projected Retirement Fund (₹)",
        data: dummyChartData.map((item) => item.fund),
        borderColor: "rgba(59, 130, 246, 1)", // blue
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Retirement Fund Projection" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* Retirement Calculator Form */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Calculator className="mr-3 text-blue-600" />
              Retirement Projection
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Age
                  </label>
                  <input
                    type="number"
                    name="currentAge"
                    value={formData.currentAge}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    name="retirementAge"
                    value={formData.retirementAge}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Savings
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdCurrencyRupee className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="number"
                    name="currentSavings"
                    value={formData.currentSavings}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-10 border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdCurrencyRupee className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="number"
                    name="monthlyContribution"
                    value={formData.monthlyContribution}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-10 border border-gray-300 rounded-md py-2 px-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Results with Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-3 text-green-600" />
              Projection Results
            </h2>
            <p>Years to Retirement: {calculationResults.yearsToRetirement}</p>
            <p>Estimated Total Needs: ₹{calculationResults.estimatedTotalNeeds}</p>
            <p>Annual Savings Required: ₹{calculationResults.annualSavingsRequired.toFixed(2)}</p>
            <p>Retirement Fund Projection: ₹{calculationResults.retirementFundProjection}</p>

            <div className="mt-6">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </section>

        {/* Gemini AI Investment Suggestions (Dummy) */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Goal className="mr-3 text-purple-600" />
            Investment Suggestions
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap">
              {calculationResults.investmentSuggestions}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RetirementGoalsPage;

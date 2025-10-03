import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calculator,
  TrendingUp,
  Goal,
  PieChart,
  Clock,
  Edit,
  Save,
  BarChart2,
  Info,
} from "lucide-react";
import { MdCurrencyRupee } from "react-icons/md";

const RetirementGoalsPage = () => {
  // Updated state to match schema
  const [formData, setFormData] = useState({
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 5000,
    expectedAnnualReturn: 7,
    inflationRate: 4,
    desiredMonthlyIncome: 60000,
    lifeExpectancy: 85
  });

  const [calculationResults, setCalculationResults] = useState({
    yearsToRetirement: 0,
    estimatedTotalNeeds: 0,
    annualSavingsRequired: 0,
    retirementFundProjection: 0,
    investmentSuggestions: []
  });

  // Calculation method
  useEffect(() => {
    const yearsToRetirement = formData.retirementAge - formData.currentAge;
    const estimatedTotalNeeds = formData.desiredMonthlyIncome * 12 * 25; // 25x annual income rule
    const annualSavingsRequired =
      (estimatedTotalNeeds - formData.currentSavings) / yearsToRetirement;
    const retirementFundProjection =
      formData.currentSavings + formData.monthlyContribution * 12 * yearsToRetirement;

    setCalculationResults({
      yearsToRetirement,
      estimatedTotalNeeds,
      annualSavingsRequired,
      retirementFundProjection,
      investmentSuggestions: []
    });
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: Number(value)
    }));
  };

  const handleSubmitToGemini = async () => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, 
        {
          contents: [{
            parts: [{
              text: `Analyze retirement investment strategy based on these details:
              - Current Age: ${formData.currentAge}
              - Retirement Age: ${formData.retirementAge}
              - Current Savings: ₹${formData.currentSavings}
              - Monthly Contribution: ₹${formData.monthlyContribution}
              - Expected Annual Return: ${formData.expectedAnnualReturn}%
              - Inflation Rate: ${formData.inflationRate}%
              - Desired Monthly Income: ₹${formData.desiredMonthlyIncome}
              - Life Expectancy: ${formData.lifeExpectancy} years
  
              Provide detailed investment suggestions covering:
              1. Asset allocation recommendations
              2. Specific investment vehicles
              3. Risk management strategies
              4. Tax-efficient investment options`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      // Process the response
      const suggestions = response.data.candidates[0].content.parts[0].text;
      setCalculationResults(prev => ({
        ...prev,
        investmentSuggestions: suggestions
      }));
    } catch (error) {
      console.error('Error fetching Gemini suggestions:', error.response ? error.response.data : error.message);
      alert('Failed to get investment suggestions');
    }
  };

  // How to Get Gemini API Key
  const getGeminiApiKey = () => {
    return (
      <div className="bg-yellow-100 p-4 rounded-lg mt-4">
        <h3 className="font-bold text-yellow-800 mb-2">How to Get Gemini API Key</h3>
        <ol className="list-decimal pl-5 text-yellow-900">
          <li>Go to the Google AI Studio website: https://makersuite.google.com/app/apikey</li>
          <li>Sign in with your Google account</li>
          <li>Click "Create API Key"</li>
          <li>Copy the generated API key</li>
          <li>Replace 'YOUR_GEMINI_API_KEY' in the code with your actual key</li>
          <li>Be sure to keep your API key secret and use environment variables in production</li>
        </ol>
        <p className="mt-2 text-sm text-yellow-700">
          Note: You may need to enable billing and have a Google Cloud account.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* Existing code remains the same */}
        {/* Retirement Calculator Section */}
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
              </div>
              
              {/* Additional fields from schema */}
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
                    className="mt-1 block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3"
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
                    className="mt-1 block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
              </div>
              
              {/* Advanced settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    name="expectedAnnualReturn"
                    value={formData.expectedAnnualReturn}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    name="inflationRate"
                    value={formData.inflationRate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
              </div>
              
              {/* Submit button for Gemini AI suggestions */}
              <div className="mt-4">
                <button 
                  onClick={handleSubmitToGemini}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Get Investment Suggestions
                </button>
              </div>
            </div>
          </div>

          {/* Calculation Results Section - Existing code remains the same */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-3 text-green-600" />
              Projection Results
            </h2>
            {/* Existing results display */}
          </div>
        </section>

        {/* Gemini Investment Suggestions */}
        {calculationResults.investmentSuggestions && (
          <section className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Goal className="mr-3 text-purple-600" />
              Gemini AI Investment Suggestions
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap">
                {calculationResults.investmentSuggestions}
              </pre>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default RetirementGoalsPage;
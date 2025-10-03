import React, { useState } from 'react';

const PortfolioOptions = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [portfolio, setPortfolio] = useState({
    totalValue: 250673.42,
    performance: {
      yearToDate: 16.5,
      oneYear: 22.3,
      totalReturn: 48.7
    },
    assets: [
      { type: 'Equities', percentage: 55, amount: 135673, color: 'bg-blue-600' },
      { type: 'Fixed Income', percentage: 25, amount: 61668, color: 'bg-green-600' },
      { type: 'Alternative Investments', percentage: 12, amount: 29580, color: 'bg-purple-600' },
      { type: 'Cash & Equivalents', percentage: 8, amount: 19752, color: 'bg-gray-600' }
    ],
    transactions: [
      { date: '2024-03-15', type: 'Buy', symbol: 'AAPL', shares: 50, price: 175.25, total: 8762.50 },
      { date: '2024-03-10', type: 'Sell', symbol: 'GOOGL', shares: 20, price: 120.75, total: 2415.00 },
      { date: '2024-03-05', type: 'Dividend', symbol: 'MSFT', amount: 345.60 }
    ]
  });

  const renderDashboard = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Portfolio Summary */}
      <div className="bg-white shadow-lg rounded-xl p-6 col-span-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Overview</h2>
        <div className="flex items-center">
          <div className="w-1/2">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Total Portfolio Value</p>
              <p className="text-3xl font-bold text-blue-800">${portfolio.totalValue.toLocaleString()}</p>
            </div>
            <div className="mt-6 space-y-4">
              {portfolio.assets.map((asset, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 mr-3 rounded-full ${asset.color}`}></div>
                  <div className="flex justify-between w-full">
                    <span className="text-gray-700">{asset.type}</span>
                    <span className="text-gray-600">{asset.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Year to Date</span>
                  <span className="text-green-600 font-medium">+{portfolio.performance.yearToDate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">One Year</span>
                  <span className="text-green-600 font-medium">+{portfolio.performance.oneYear}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Return</span>
                  <span className="text-green-600 font-medium">+{portfolio.performance.totalReturn}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {portfolio.transactions.map((transaction, index) => (
            <div key={index} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">{transaction.symbol}</p>
                  <p className="text-sm text-gray-600">{transaction.type}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'Buy' ? 'text-red-600' : 
                    transaction.type === 'Sell' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'Dividend' 
                      ? `+$${transaction.amount.toFixed(2)}` 
                      : `${transaction.type === 'Buy' ? '-' : '+'}$${transaction.total.toFixed(2)}`}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAssetAllocation = () => (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Detailed Asset Allocation</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Portfolio Composition</h3>
          {portfolio.assets.map((asset, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">{asset.type}</span>
                <span className="text-gray-600">${asset.amount.toLocaleString()} ({asset.percentage}%)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`${asset.color} rounded-full h-2`} 
                  style={{width: `${asset.percentage}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Allocation Insights</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Diversified across multiple asset classes
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Balanced risk-return profile
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Potential for long-term growth
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center">Wealth Management Dashboard</h1>
          <p className="text-center text-gray-600 mt-2">Comprehensive Portfolio Insights</p>
        </header>
        
        <nav className="flex justify-center mb-8 space-x-4">
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeSection === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveSection('allocation')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeSection === 'allocation' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Asset Allocation
          </button>
        </nav>

        <div className="space-y-6">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'allocation' && renderAssetAllocation()}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOptions;
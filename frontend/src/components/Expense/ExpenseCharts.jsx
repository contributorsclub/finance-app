import React, { useState, useMemo } from 'react';
import { 
    PieChart, Pie, Cell, 
    BarChart, Bar, 
    XAxis, YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import { groupBy } from 'lodash';

const ExpenseCharts = ({ expenses }) => {
    console.log(expenses);
    // State for chart configurations
    const [categoryChartType, setCategoryChartType] = useState('expense');
    const [timeRange, setTimeRange] = useState('weekly');

    // Utility function to filter expenses by time range
    const filterExpensesByTimeRange = (expensesData) => {
        const now = new Date();
        return expensesData.filter(exp => {
            const expDate = new Date(exp.date);
            const diffTime = Math.abs(now - expDate);
            
            switch(timeRange) {
                case 'weekly':
                    return diffTime < (7 * 24 * 60 * 60 * 1000);
                case 'monthly':
                    return diffTime < (30 * 24 * 60 * 60 * 1000);
                case 'yearly':
                    return diffTime < (365 * 24 * 60 * 60 * 1000);
                default:
                    return true;
            }
        });
    };

    // Prepare processed data
    const processedData = useMemo(() => {
        const filteredExpenses = filterExpensesByTimeRange(expenses);

        // Category Pie Chart Data
        const categoryData = filteredExpenses
            .filter(exp => exp.type === 'Expense')
            .reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                return acc;
            }, {});

        const categoryPieData = Object.entries(categoryData)
            .map(([category, total]) => ({
                name: category,
                value: total
            }))
            .sort((a, b) => b.value - a.value);

        // Income vs Expense Pie Chart Data
        const typePieData = [
            { 
                name: 'Income', 
                value: filteredExpenses
                    .filter(exp => exp.type === 'Income')
                    .reduce((sum, exp) => sum + exp.amount, 0)
            },
            { 
                name: 'Expense', 
                value: filteredExpenses
                    .filter(exp => exp.type === 'Expense')
                    .reduce((sum, exp) => sum + exp.amount, 0)
            }
        ];

        // Bar Chart Data (Daily Breakdown)
        const dailyData = filteredExpenses.reduce((acc, exp) => {
            const date = new Date(exp.date).toLocaleDateString('en-US', {
                month: 'short', 
                day: 'numeric'
            });
            
            if (!acc[date]) {
                acc[date] = { 
                    date, 
                    income: 0, 
                    expense: 0 
                };
            }

            if (exp.type === 'Income') {
                acc[date].income += exp.amount;
            } else {
                acc[date].expense += exp.amount;
            }

            return acc;
        }, {});

        const barChartData = Object.values(dailyData)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        return {
            categoryPieData,
            typePieData,
            barChartData
        };
    }, [expenses, timeRange]);

    // Color palette
    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
        '#8884D8', '#82CA9D', '#FF6384', '#36A2EB'
    ];

    // Render Pie Chart
    const renderPieChart = () => {
        const pieData = categoryChartType === 'expense' 
            ? processedData.categoryPieData 
            : processedData.typePieData;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => 
                            `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                    >
                        {pieData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={
                                    categoryChartType === 'expense'
                                    ? COLORS[index % COLORS.length]
                                    : (index === 0 ? '#82ca9d' : '#ff6384')
                                } 
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => [
                            `$${value.toFixed(2)}`, 
                            'Total Amount'
                        ]} 
                    />
                    <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center" 
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    };

    // Render Bar Chart
    const renderBarChart = () => {
        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processedData.barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                        formatter={(value) => [
                            `$${value.toFixed(2)}`, 
                            'Amount'
                        ]} 
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#82ca9d" name="Income" />
                    <Bar dataKey="expense" fill="#ff6384" name="Expense" />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div>
            {/* Selectors Container */}
            <div className="flex justify-between items-center mb-4">
                {/* Pie Chart Type Selector */}
                <div className="flex items-center space-x-2">
                    <label className="text-gray-700">Pie Chart:</label>
                    <select 
                        value={categoryChartType}
                        onChange={(e) => setCategoryChartType(e.target.value)}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="expense">Expense Categories</option>
                        <option value="income-expense">Income vs Expense</option>
                    </select>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center space-x-2">
                    <label className="text-gray-700">Time Range:</label>
                    <select 
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="weekly">Last Week</option>
                        <option value="monthly">Last Month</option>
                        <option value="yearly">Last Year</option>
                    </select>
                </div>
            </div>

            {/* Charts Container */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left Half - Pie Chart */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        {categoryChartType === 'expense' 
                            ? 'Expense by Category' 
                            : 'Income vs Expense'}
                    </h3>
                    {renderPieChart()}
                </div>

                {/* Right Half - Bar Chart */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Daily Income and Expenses
                    </h3>
                    {renderBarChart()}
                </div>
            </div>
        </div>
    );
};

export default ExpenseCharts;
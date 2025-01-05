// FileName: BudgetOptimizer.js

import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const BudgetOptimizer = () => {
  const bills = useSelector(state => state.bills.bills);
  const monthlyBudget = useSelector(state => state.bills.monthlyBudget);

  // Create a copy of the bills array and sort it by amount in descending order
  const sortedBills = [...bills].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

  let totalAmount = 0;
  const selectedBills = [];

  // Select bills while their total amount is under the monthly budget
  for (let i = 0; i < sortedBills.length; i++) {
    if (totalAmount + parseFloat(sortedBills[i].amount) <= monthlyBudget) {
      totalAmount += parseFloat(sortedBills[i].amount);
      selectedBills.push(sortedBills[i]);
    }
  }

  return (
    <div
    role="region"
    aria-labelledby="budget-optimizer-title"
    className="max-w-3xl mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg p-6 mt-6 transform hover:scale-105 transition-all duration-300"
  >
    <h2
      id="budget-optimizer-title"
      className="text-3xl font-bold text-purple-800 mb-4 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mr-2 text-purple-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      Budget Optimizer
    </h2>
    <div className="flex justify-between items-center mb-6 bg-white bg-opacity-50 rounded-lg p-4">
      <p className="text-lg font-semibold text-gray-700">Monthly Budget:</p>
      <p className="text-2xl font-bold text-green-600">₹{monthlyBudget.toLocaleString()}</p>
    </div>
    <h3 className="text-xl font-semibold text-purple-700 mb-3">
      Optimized Bills Within Budget:
    </h3>
    <ul className="space-y-3 mb-6">
      {selectedBills.length > 0 ? (
        selectedBills.map((bill, index) => (
          <motion.li
            key={bill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white bg-opacity-70 rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800">{bill.description}</span>
                <span className="ml-2 px-2 py-1 bg-purple-200 text-purple-700 text-xs rounded-full">
                  {bill.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  ₹{bill.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">{bill.date}</div>
              </div>
            </div>
          </motion.li>
        ))
      ) : (
        <li className="text-center text-gray-500 py-4 bg-white bg-opacity-70 rounded-lg">
          No bills fit within the budget.
        </li>
      )}
    </ul>
    <div className="mt-6 bg-purple-600 text-white rounded-lg p-4 flex justify-between items-center">
      <p className="text-lg font-semibold">Total Selected Amount:</p>
      <p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
    </div>
    <div className="mt-4 text-center">
      <p className="text-sm text-purple-600">
        {selectedBills.length > 0
          ? `${selectedBills.length} bills optimized to fit your budget!`
          : 'Adjust your budget to include more bills.'}
      </p>
    </div>
  </div>
  );
};

export default BudgetOptimizer;

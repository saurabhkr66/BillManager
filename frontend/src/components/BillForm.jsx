import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBill, editBill, calculateTotal, setMonthlyBudget } from '../redux/reducers';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const BillForm = ({ editMode, setEditMode, currentBill, setCurrentBill }) => {
  const dispatch = useDispatch();
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);
  const totalAmount = useSelector((state) => state.bills.totalAmount);

  const [budget, setBudget] = useState(monthlyBudget);
  const [error, setError] = useState('');

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBill((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentBill({
      id: '',
      description: '',
      category: '',
      amount: '',
      date: '',
      dueDate: '',
    });
    setError('');
  };

  // Handle form submission (add or edit)
  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const newAmount = parseFloat(currentBill.amount);
    const newTotal = totalAmount + newAmount;

  if (newTotal > monthlyBudget) {
    setError(`Adding this bill exceeds the monthly budget of ₹${monthlyBudget}.`);
    return;
  }

    if (isNaN(newAmount) || newAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (editMode) {
      dispatch(editBill(currentBill)); // Update bill
    } else {
      const newBill = { ...currentBill, id: uuidv4() }; // Add new bill
      dispatch(addBill(newBill));
    }

    dispatch(calculateTotal()); // Recalculate total amount
    resetForm(); // Reset the form
    setEditMode(false); // Turn off edit mode
  };

  // Handle monthly budget change
  const handleBudgetChange = (e) => {
    const newBudget = parseFloat(e.target.value);
    setBudget(newBudget);
    dispatch(setMonthlyBudget(newBudget));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-10"
    >
      <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
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
        {editMode ? 'Edit Bill' : 'Add Bill'}
      </h2>
      <form onSubmit={handleAddOrUpdate} className="space-y-6">
        <div className="bg-white bg-opacity-50 rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget:</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              value={budget || monthlyBudget}
              onChange={handleBudgetChange}
              placeholder="Set Monthly Budget"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3"             
            />
          </div>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            name="description"
            value={currentBill.description}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="Description"
          />
          <select
            name="category"
            value={currentBill.category}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Utility">Utility</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Travel">Travel</option>
          </select>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              name="amount"
              value={currentBill.amount}
              onChange={handleInputChange}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3"     
              placeholder="Amount"
            />
          </div>
          <input
            type="date"
            name="date"
            value={currentBill.date}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition duration-300 transform hover:-translate-y-1 shadow-md"
        >
          {editMode ? 'Update Bill' : 'Add Bill'}
        </motion.button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </motion.div>
  );
};

export default BillForm;

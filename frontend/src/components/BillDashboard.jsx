
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBill, calculateTotal } from '../redux/reducers';
import BillForm from './BillForm';
import BillFilter from './BillFilter';
import BudgetOptimizer from './BudgetOptimizer';
import BillChart from './Chart';
import { motion } from 'framer-motion';

const BillDashboard = () => {
  const bills = useSelector((state) => state.bills.bills);
  const filteredBills = useSelector((state) => state.bills.filteredBills);
  const totalAmount = useSelector((state) => state.bills.totalAmount);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [currentBill, setCurrentBill] = useState({
    id: '',
    description: '',
    category: '',
    amount: '',
    date: '',
    dueDate: '',
  });
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleEdit = (bill) => {
    setEditMode(true);
    setCurrentBill(bill);
  };

  const handleRemove = (id) => {
    dispatch(removeBill(id));
    dispatch(calculateTotal());
  };

  const billsToDisplay = categoryFilter ? filteredBills : bills;

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
    <div className="max-w-7xl mx-auto">
     
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 flex-grow">
            <BillForm
              editMode={editMode}
              setEditMode={setEditMode}
              currentBill={currentBill}
              setCurrentBill={setCurrentBill}
            />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex-grow">
            <BudgetOptimizer />
          </div>
        </div>
        {/* Right Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <BillFilter setCategoryFilter={setCategoryFilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {billsToDisplay.length === 0 ? (
                <p className="text-center text-gray-800 col-span-3">
                  No bills found for this category.
                </p>
              ) : (
                billsToDisplay.map((bill) => (
                  <motion.div
                    key={bill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-purple-50 rounded-lg p-4 shadow-md flex flex-col justify-between aspect-square"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-purple-800 mb-2">
                        {bill.description}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {bill.category}
                      </p>
                      <p className="text-xl font-semibold text-green-600 mb-2">
                        ₹{bill.amount}
                      </p>
                      <p className="text-xs text-gray-500">Date: {bill.date}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(bill)}
                        className="flex-1 bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(bill.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-purple-800">
                Total Amount
              </h3>
              <p className="text-4xl font-bold text-green-600">₹{totalAmount}</p>
            </div>
            <div className="mt-8">
              <BillChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BillDashboard;


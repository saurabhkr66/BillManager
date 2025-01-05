import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterBills } from '../redux/reducers';

const BillFilter = ({ setCategoryFilter }) => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.bills.categoryFilter);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    dispatch(filterBills(value));
  };

  return (
    <div className="mb-6">
      <label className="text-lg font-semibold text-gray-700 mb-2">
        Filter by category:
      </label>
      <select
        onChange={handleCategoryChange}
        value={categoryFilter}
        className="w-full p-3 border border-gray-300 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300 ease-in-out"
      >
        <option value="">All Categories</option>
        <option value="Food & Dining">Food & Dining</option>
        <option value="Utility">Utility</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>
    </div>
  );
};

export default BillFilter;

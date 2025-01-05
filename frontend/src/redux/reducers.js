import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
  name: 'bills',
  initialState: {
    bills: [], // Stores all bills
    filteredBills: [], // Stores filtered bills (category or budget applied)
    totalAmount: 0, // Total amount of all bills
    monthlyBudget: 50000, // Default monthly budget
  },
  reducers: {
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;

      // Reapply budget filtering
      state.filteredBills = state.bills.filter((bill) => bill.amount <= state.monthlyBudget);
    },
    addBill: (state, action) => {
      state.bills.push(action.payload);

      // Reapply budget filtering
      state.filteredBills = state.bills.filter((bill) => bill.amount <= state.monthlyBudget);

      // Recalculate total amount
      state.totalAmount = state.bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;

        // Reapply budget filtering
        state.filteredBills = state.bills.filter((bill) => bill.amount <= state.monthlyBudget);

        // Recalculate total amount
        state.totalAmount = state.bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
      }
    },
    removeBill: (state, action) => {
      const billId = action.payload;
      state.bills = state.bills.filter((bill) => bill.id !== billId);

      // Reapply budget filtering
      state.filteredBills = state.bills.filter((bill) => bill.amount <= state.monthlyBudget);

      // Recalculate total amount
      state.totalAmount = state.bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
    },
    filterBills: (state, action) => {
      // Filter by category (ignore budget filtering for now)
      if (action.payload === '') {
        state.filteredBills = state.bills.filter((bill) => bill.amount <= state.monthlyBudget); // Apply budget
      } else {
        state.filteredBills = state.bills.filter(
          (bill) => bill.category === action.payload && bill.amount <= state.monthlyBudget
        );
      }
    },
    calculateTotal: (state) => {
      // Recalculate the total amount of all bills
      state.totalAmount = state.bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
    },
  },
});

export const { setMonthlyBudget, addBill, editBill, removeBill, filterBills, calculateTotal } = billSlice.actions;
export default billSlice.reducer;

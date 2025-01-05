import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
  name: 'bills',
  initialState: {
    bills: [], // Stores all bills (no filter applied here)
    filteredBills: [], // Stores bills after being filtered
    totalAmount: 0,
    monthlyBudget: 50000, // Set a default monthly budget
  },
  reducers: {
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
      // Recalculate filteredBills after updating the budget
      state.filteredBills = state.bills.filter((bill) => bill.amount <= state.monthlyBudget);
    },
    addBill: (state, action) => {
      state.bills.push(action.payload);

      // Recalculate filteredBills based on the budget
      const total = state.bills.reduce((acc, bill) => acc + bill.amount, 0);
      state.filteredBills = state.bills.filter((bill) => total + bill.amount <= state.monthlyBudget);

      // Recalculate total amount
      state.totalAmount = total;
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;

        // Recalculate filteredBills based on the budget
        const total = state.bills.reduce((acc, bill) => acc + bill.amount, 0);
        state.filteredBills = state.bills.filter((bill) => total + bill.amount <= state.monthlyBudget);

        // Recalculate total amount
        state.totalAmount = total;
      }
    },
    removeBill: (state, action) => {
      const billId = action.payload;
      state.bills = state.bills.filter((bill) => bill.id !== billId);

      // Recalculate filteredBills after removing a bill
      const total = state.bills.reduce((acc, bill) => acc + bill.amount, 0);
      state.filteredBills = state.bills.filter((bill) => total + bill.amount <= state.monthlyBudget);

      // Recalculate total amount
      state.totalAmount = total;
    },
    filterBills: (state, action) => {
      // Apply category filtering without affecting the monthly budget logic
      if (action.payload === '') {
        state.filteredBills = state.bills; // Reset to all bills if no category is selected
      } else {
        state.filteredBills = state.bills.filter((bill) => bill.category === action.payload);
      }
    },
    calculateTotal: (state) => {
      // Recalculate the total amount based on the filtered bills
      state.totalAmount = state.filteredBills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
    },
  },
});

export const { setMonthlyBudget, addBill, editBill, removeBill, filterBills, calculateTotal } = billSlice.actions;
export default billSlice.reducer;

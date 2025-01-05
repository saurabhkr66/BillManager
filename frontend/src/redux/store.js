import { configureStore } from '@reduxjs/toolkit';
import billReducer from './reducers';

const store = configureStore({
  reducer: {
    bills: billReducer,
  },
});

export default store;
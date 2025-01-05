import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BillForm from './components/BillForm';
import BillDashboard from './components/BillDashboard';
import BillFilter from './components/BillFilter';
import BillChart from './components/Chart';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Bill Manager</h1> */}
        <Navbar/>
     
       
        <BillDashboard />
        
      </div>
    </Provider>
  );
};

export default App
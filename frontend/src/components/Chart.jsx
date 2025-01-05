import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BillChart = () => {
  const allBills = useSelector((state) => state.bills.bills); // All bills (including previously stored data)
  const filteredBills = useSelector((state) => state.bills.filteredBills); // Filtered bills based on category

  const [chartData, setChartData] = useState(null); // Store chart data

  // Define all months for the year
  const allMonths = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Prepare data for the chart
  useEffect(() => {
    // We combine both filteredBills and allBills to ensure all data is accounted for
    const billsToShow = filteredBills.length > 0 ? filteredBills : allBills; // Show filtered bills if any, else show all

    const monthlyData = {};

    // Aggregate the bills by month
    billsToShow.forEach((bill) => {
      const month = new Date(bill.date).toLocaleString('default', { month: 'long' });
      const amount = parseFloat(bill.amount);

      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }

      monthlyData[month] += amount;  // Sum amounts correctly
    });

    // Convert the aggregated data into arrays for chart.js
    const data = {
      labels: allMonths,  // Use all months for the labels
      datasets: [
        {
          label: 'Monthly Bills',
          data: allMonths.map((month) => monthlyData[month] || 0),  // Ensure all months are represented
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    setChartData(data); // Set the chart data to trigger re-render only when needed
  }, [filteredBills, allBills]); // Recalculate whenever filteredBills or allBills change

  // Return a fallback message if no data exists for the chart
  if (!chartData) {
    return <p>No bills available for charting.</p>;
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis at zero
        ticks: {
          // Customize the tick display
          callback: function (value) {
            return '₹' + value; // Prefix with currency symbol
          },
        },
      },
    },
  };

  return (
    <div className="mt-4 bg-purple-50">
      <h2 className="text-xl font-bold">Monthly Billing Cycle</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BillChart;

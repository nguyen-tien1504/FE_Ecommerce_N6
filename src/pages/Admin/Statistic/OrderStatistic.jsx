import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Product Orders per Day",
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
};

export function Statistic() {
  const [listOrder, setListOrder] = useState([]);

  const getListOrder = async () => {
    const url = "http://localhost:8080/api/order/done";
    const response = await axios.get(url);
    console.log(response.data)
    setListOrder(response.data);
  };

  useEffect(() => {
    getListOrder();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Total Quantity",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  listOrder.forEach((order) => {
    const orderDate = order.orderDate;
  
    // Check if the orderDate already exists in labels
    const index = chartData.labels.indexOf(orderDate);
    if (index === -1) {
      // If not, add the orderDate to labels and set the count to 1
      chartData.labels.push(orderDate);
      chartData.datasets[0].data.push(1);
    } else {
      // If already exists, increment the count for the existing day
      chartData.datasets[0].data[index]++;
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Product Orders Statistics</h1>
      <div style={{ width: "1000px", height: "1000px" }}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
  
}

export default Statistic;

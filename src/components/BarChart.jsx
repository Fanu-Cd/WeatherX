import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { toC } from "../services/Weather";
const BarChart = ({ weather }) => {
  const data = {
    labels: ["Minimum Temperature", "Maximum Temperature"],
    datasets: [
      {
        label: "Temperature ('C)",
        data: [
          weather.main && toC(weather.main.temp_min),
          weather.main && toC(weather.main.temp_max),
        ],
        fill: true,
        backgroundColor: ["brown", "red"],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ minHeight: "10rem" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

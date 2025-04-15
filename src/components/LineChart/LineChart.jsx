import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "./LineChart.css";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Price"]];
    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  const options = {
    backgroundColor: "transparent",
    legend: {
      position: "bottom",
      textStyle: { 
        color: "#00e0ff", 
        fontSize: 12, 
        fontFamily: "'Press Start 2P', cursive" 
      },
    },
    hAxis: {
      textStyle: { 
        color: "#ff007f", 
        fontSize: 12, 
        fontFamily: "'Press Start 2P', cursive" 
      },
      gridlines: { color: "#3a3a3a" },
      slantedText: true,
      slantedTextAngle: 45,
    },
    vAxis: {
      textStyle: { 
        color: "#00e0ff", 
        fontSize: 12,
        fontFamily: "'Press Start 2P', cursive" 
      },
      gridlines: { color: "#3a3a3a" },
    },
    colors: ["#ff007f"],
    chartArea: { 
      width: "80%",
      height: "75%"
    },
    pointSize: 5,
    lineWidth: 3,
    focusTarget: 'category'
  };

  return (
    <div className="line-chart-container chart-container">
      <h3 className="line-chart-title">Gráfico de precios</h3>
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        height="450px"
        legendToggle
      />
    </div>
  );
};

export default LineChart;

import React from "react";
import { WineData } from "../../types/wine";
import './alcohol.css';

interface StatsData {
  Class: string;
  Mean: number;
  Median: number;
  Mode: number | null;
}

const Alchohol: React.FC<{ data: WineData[] }> = ({ data }) => {
  // Helper function to calculate mean
  const calculateMean = (values: number[]) => {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  };

  // Helper function to calculate median
  const calculateMedian = (values: number[]) => {
    const sortedValues = values.sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
    } else {
      return sortedValues[middle];
    }
  };

  // Helper function to calculate mode
  const calculateMode = (values: number[]) => {
    const valueCount: { [key: number]: number } = {};
    let maxCount = 0;
    let mode: number | null = null;

    values.forEach((value) => {
      if (value in valueCount) {
        valueCount[value]++;
      } else {
        valueCount[value] = 1;
      }

      if (valueCount[value] > maxCount) {
        maxCount = valueCount[value];
        mode = value;
      }
    });

    return mode;
  };

  // Extract "Flavanoids" values for each class
  const classValues: { [key: string]: number[] } = {};

  data.forEach((item) => {
    const className = `Class ${item.Alcohol}`;
    const flavanoidsValue =
      typeof item.Flavanoids === "number"
        ? item.Flavanoids
        : parseFloat(item.Flavanoids);

    if (!isNaN(flavanoidsValue)) {
      if (!classValues[className]) {
        classValues[className] = [];
      }
      classValues[className].push(flavanoidsValue);
    }
  });

  // Calculate mean, median, and mode for each class
  const statsData: StatsData[] = Object.keys(classValues).map((className) => ({
    Class: className,
    Mean: calculateMean(classValues[className]),
    Median: calculateMedian(classValues[className]),
    Mode: calculateMode(classValues[className]),
  }));

  return (
    <div>
      <table className="wine-table">
        <thead>
          <tr>
            <th>Measure</th>
            {statsData.map((item) => (
              <th key={item.Class}>{item.Class}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {statsData.map((item) => (
              <td key={item.Class}>{item.Mean.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {statsData.map((item) => (
              <td key={item.Class}>{item.Median.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {statsData.map((item) => (
              <td key={item.Class}>
                {item.Mode !== null ? item.Mode.toFixed(2) : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Alchohol;

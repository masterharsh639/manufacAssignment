import React from "react";
import { WineData } from "../../types/wine";
import "./gamma.css";

interface GammaStatisticsProps {
  data: WineData[];
}

interface StatsData {
  Class: string;
  Mean: number;
  Median: number;
  Mode: number | null;
}

const calculateGamma = (dataPoint: WineData): number => {
  return (dataPoint.Ash * dataPoint.Hue) / dataPoint.Magnesium;
};

const calculateMean = (values: number[]): number => {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
};

const calculateMedian = (values: number[]): number => {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);
  return sortedValues.length % 2 === 0
    ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
    : sortedValues[middle];
};

const calculateMode = (values: number[]): number | null => {
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

const calculateGammaStatistics = (data: WineData[]): StatsData[] => {
  const classStats: { [key: string]: number[] } = {};

  data.forEach((dataPoint) => {
    const className = `Class ${dataPoint.Class}`;
    const gamma = calculateGamma(dataPoint);

    if (!classStats[className]) {
      classStats[className] = [];
    }

    classStats[className].push(gamma);
  });

  const statistics: StatsData[] = [];
  for (const className in classStats) {
    if (classStats.hasOwnProperty(className)) {
      const gammas = classStats[className];
      statistics.push({
        Class: className,
        Mean: calculateMean(gammas),
        Median: calculateMedian(gammas),
        Mode: calculateMode(gammas),
      });
    }
  }

  return statistics;
};

const Gamma: React.FC<GammaStatisticsProps> = ({ data }) => {
  const gammaStatistics = calculateGammaStatistics(data);

  return (
    <div>
      <table className="gamma-table">
        <thead>
          <tr>
            <th>Measure</th>
            {gammaStatistics.map((item) => (
              <th key={item.Class}>{item.Class}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma (Mean)</td>
            {gammaStatistics.map((item) => (
              <td key={item.Class}>{item.Mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma (Median)</td>
            {gammaStatistics.map((item) => (
              <td key={item.Class}>{item.Median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma (Mode)</td>
            {gammaStatistics.map((item) => (
              <td key={item.Class}>
                {item.Mode !== null ? item.Mode.toFixed(3) : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Gamma;

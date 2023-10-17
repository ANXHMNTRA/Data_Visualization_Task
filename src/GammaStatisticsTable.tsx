import React from 'react';
import "./gamma.css"

interface WineDataItem {
    Alcohol: number;
    MalicAcid: number;
    Ash: number;
    AlcalinityOfAsh: number;
    Magnesium: number;
    TotalPhenols: number;
    Flavanoids: number;
    NonflavanoidPhenols: number;
    Proanthocyanins: number;
    ColorIntensity: number;
    Hue: number;
    OD280OD315OfDilutedWines: number;
    Unknown: number;
}

interface ClassWiseGamma {
    classLabel: number;
    mean: number;
    median: number;
    mode: number;
}

interface GammaStatisticsTableProps {
    data: WineDataItem[];
}

const GammaStatisticsTable: React.FC<GammaStatisticsTableProps> = ({ data }) => {

    const calculateClassStatistics = () => {
        const classStats: { [className: string]: number[] } = {};
    
        // Group data by Alcohol class
        data.forEach((record : WineDataItem) => {
          const alcoholClass = record.Alcohol;
          const gammaValues = (record.Ash * record.Hue) / record.Magnesium

          if (!classStats[alcoholClass]) {
            classStats[alcoholClass] = [];
          }
    
          classStats[alcoholClass].push(gammaValues);
        });
    
        const results: { [className: string]: { mean: number; median: number; mode: number | null } } = {};
    
        // Calculate statistics for each class
        for (const className in classStats) {
          const classData = classStats[className];
    
          // Calculate mean
          const mean = classData.reduce((sum, value) => parseFloat(sum as any) + parseFloat(value as any), 0) / classData.length;
          // console.log(classData,"===",mean)
    
          // Calculate median
          classData.sort((a, b) => a - b);
          const median = classData[Math.floor(classData.length / 2)];
    
          // Calculate mode
          const counts: { [value: number]: number } = {};
          let maxCount = 0;
          let mode = null;
    
          for (const value of classData) {
            if (!counts[value]) {
              counts[value] = 1;
            } else {
              counts[value]++;
            }
    
            if (counts[value] > maxCount) {
              maxCount = counts[value];
              mode = value;
            }
          }
    
          results[className] = {
            mean,
            median,
            mode,
          };
        }
    
        return results;
      };
  const classStatistics = calculateClassStatistics();

    

    return (
        <div  className="table-card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Measure</th>
                {Object.keys(classStatistics).map((className, index) => (
                  <th key={index}>Class {className}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Gamma Mean</th>
                {Object.keys(classStatistics).map((className, index) => (
                  <td key={index}>{classStatistics[className].mean.toFixed(3)}</td>
                ))}
              </tr>
              <tr>
                <th>Gamma Median</th>
                {Object.keys(classStatistics).map((className, index) => (
                  <td key={index}>{classStatistics[className].median.toFixed(3)}</td>
                ))}
              </tr>
              <tr>
                <th>Gamma Mode</th>
                {Object.keys(classStatistics).map((className, index) => (
                  <td key={index}>
                    {classStatistics[className].mode?.toFixed(3) ?? 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );

};

export default GammaStatisticsTable;

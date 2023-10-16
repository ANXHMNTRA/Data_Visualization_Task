import React from 'react';
import { WineDataItem, ClassWiseGamma } from '../../types/sharedTypes';
import { calculateClassStatistics } from '../../utils/statisticsUtils';
// import { renderTableHeader, renderTableData } from '../../utils/tableUtils';

 function renderTableHeader(data: Record<string, any> | ClassWiseGamma[]) {
  return (
    <tr>
      <th>Measure</th>
      {Object.keys(data).map((className, index) => (
        <th key={index}>Class {className}</th>
      ))}
    </tr>
  );
};

 function renderTableData(data: Record<string, any> | ClassWiseGamma[], statType: string) {
  return (
    <tr>
      <td>{statType}</td>
      {Object.keys(data).map((className, index) => (
        <td key={index}>{(data as Record<string, any>)[className][statType]}</td>
      ))}
    </tr>
  );
}
const GammaStatisticsTable: React.FC<{ data: WineDataItem[] }> = ({ data }) => {
    
    const classes = [1, 2, 3];
  const classWiseGamma = calculateClassStatistics(data);

  return (
    <div>
      <table border={1}>
        <thead>{renderTableHeader(classWiseGamma)}</thead>
        <tbody>
          <tr>
            <td>Gamma</td>
            {renderTableData(classWiseGamma, 'mean')}
          </tr>
          <tr>
            <td>Median</td>
            {renderTableData(classWiseGamma, 'median')}
          </tr>
          <tr>
            <td>Mode</td>
            {renderTableData(classWiseGamma, 'mode')}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GammaStatisticsTable;

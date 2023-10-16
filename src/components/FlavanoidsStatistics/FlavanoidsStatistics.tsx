import React from 'react';
import { WineDataItem } from '../../types/sharedTypes';
import { calculateClassStatistics } from '../../utils/statisticsUtils';
import { ClassWiseGamma } from '../../types/sharedTypes';

const FlavanoidsStatistics: React.FC<{ data: WineDataItem[] }> = ({ data }) => {
  const classStatistics = calculateClassStatistics(data);

  // Function to render the table header
  const renderTableHeader = (data: Record<string, any> | ClassWiseGamma[]) => (
    <tr>
      <th>Measure</th>
      {Object.keys(data).map((className, index) => (
        <th key={index}>Class {className}</th>
      ))}
    </tr>
  );

  // Function to render the table data for a specific statType
  const renderTableData = (data: Record<string, any> | ClassWiseGamma[], statType: string) => (
    <tr>
      <td>{statType}</td>
      {Object.keys(data).map((className, index) => (
        <td key={index}>{(data as Record<string, any>)[className][statType]}</td>
      ))}
    </tr>
  );

  return (
    <div>
      <table border={1}>
        <thead>{renderTableHeader(classStatistics)}</thead>
        <tbody>
          <tr>
            <th>Flavanoids Mean</th>
            {renderTableData(classStatistics, 'mean')}
          </tr>
          <tr>
            <th>Flavanoids Median</th>
            {renderTableData(classStatistics, 'median')}
          </tr>
          <tr>
            <th>Flavanoids Mode</th>
            {renderTableData(classStatistics, 'mode')}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsStatistics;

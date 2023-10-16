import { WineDataItem } from '../types/sharedTypes';

export function calculateClassStatistics(data: WineDataItem[]) {
  const classStats: { [className: string]: number[] } = {};

  // Group data by Alcohol class
  data.forEach((record: WineDataItem) => {
    const alcoholClass = record.Alcohol;
    const flavanoidsValue = record.Flavanoids;

    if (!classStats[alcoholClass]) {
      classStats[alcoholClass] = [];
    }

    classStats[alcoholClass].push(flavanoidsValue);
  });

  const results: { [className: string]: { mean: number; median: number; mode: number | null } } = {};

  // Calculate statistics for each class
  for (const className in classStats) {
    const classData = classStats[className];

    // Calculate mean
    const mean =
      classData.reduce((sum, value) => parseFloat(sum as any) + parseFloat(value as any), 0) / classData.length;

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
}

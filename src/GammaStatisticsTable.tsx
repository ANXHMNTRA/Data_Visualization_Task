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
    const calculateMean = (arr: number[]): number => {
        if (arr.length === 0) return 0;
        const sum = arr.reduce((acc, value) => acc + value, 0);
        return (sum / arr.length);
    };

    const calculateMedian = (arr: number[]): number => {
        const sortedArr = [...arr].sort((a, b) => a - b);
        const middle = Math.floor(sortedArr.length / 2);

        if (sortedArr.length % 2 === 0) {
            return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
        } else {
            return sortedArr[middle];
        }
    };


    const calculateMode = (arr: number[]): number => {
        if (arr.length === 0) return 0;

        const frequencyMap: { [key: number]: number } = {};
        let maxFrequency = 0;
        let modes: number[] = [];

        arr.forEach((item) => {
            frequencyMap[item] = (frequencyMap[item] || 0) + 1;
            if (frequencyMap[item] > maxFrequency) {
                maxFrequency = frequencyMap[item];
                modes = [item];
            } else if (frequencyMap[item] === maxFrequency) {
                modes.push(item);
            }
        });

        return modes[0]; // Return the first mode in the array.
    };

    const classes = [1, 2, 3];


    const classWiseGamma: ClassWiseGamma[] = classes.map((classLabel) => {
        const filteredData = data.filter((item) => item.Unknown === classLabel);
        const gammaForClass = filteredData.map(
            (item) => (item.Ash * item.Hue) / item.Magnesium
        );
        return {
            classLabel,
            mean: parseFloat(calculateMean(gammaForClass).toFixed(3)),
            median: parseFloat(calculateMedian(gammaForClass).toFixed(3)),
            mode: parseFloat(calculateMode(gammaForClass).toFixed(3)),
        };
    });
    console.log(classWiseGamma, "data_")


    return (
        <div className="table-card">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Measure</th>
                        {classes.map((classLabel) => (
                            <th key={classLabel}>Class {classLabel}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gamma</td>
                        {classWiseGamma.map((classData) => (
                            <td key={classData.classLabel}>{classData.mean}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Median</td>
                        {classWiseGamma.map((classData) => (
                            <td key={classData.classLabel}>{classData.median}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Mode</td>
                        {classWiseGamma.map((classData) => (
                            <td key={classData.classLabel}>{classData.mode}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GammaStatisticsTable;

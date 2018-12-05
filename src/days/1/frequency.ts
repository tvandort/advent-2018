import { readCleanLines } from 'fs-util';
import { FrequencyAnalyzer } from './FrequencyAnalyzer';

const toInt = (line: string) => parseInt(line, 10);
const nextFrequency = (analyzer: FrequencyAnalyzer, value: number) => {
  analyzer.Next(value);
  return analyzer;
};

export const repeatedFrequency = async (file: string) => {
  const data = await readCleanLines(file);
  const values = data.map(toInt);

  const analyzer = new FrequencyAnalyzer();
  let index = 0;
  while (analyzer.HasRepeatedFrequency() === false) {
    analyzer.Next(values[index % values.length]);
    index++;
  }
  return analyzer.FirstRepeatedFrequency as number;
};

export const sumFrequencies = async (file: string) => {
  const data = await readCleanLines(file);
  return data.map(toInt).reduce(nextFrequency, new FrequencyAnalyzer())
    .CurrentFrequency;
};

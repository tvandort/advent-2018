import * as fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const INITIAL_FREQUENCY: number = 0;

export const repeatedFrequency = async (file: string): Promise<number> => {
  const data = await readFile(file, 'utf8');
  const lines = data.split('\n');
  const withoutempty = lines.filter(line => Boolean(line));
  const values = withoutempty.map(line => parseInt(line, 10));
  const previousFrequencies: { [key: string]: number } = {
    [INITIAL_FREQUENCY]: 1
  };
  let totalFrequency = INITIAL_FREQUENCY;
  let repeat: number | null = null;
  const collectFrequencies = (initialFrequency = INITIAL_FREQUENCY) => {
    totalFrequency = values.reduce((previous, current) => {
      const partialSum = current + previous;
      const partialSumCount = previousFrequencies[partialSum];
      if (!partialSumCount) {
        previousFrequencies[partialSum] = 1;
      } else {
        previousFrequencies[partialSum] += 1;
      }
      if (!repeat) {
        for (const prop of Object.keys(previousFrequencies)) {
          const count = previousFrequencies[prop];
          if (count === 2) {
            repeat = parseInt(prop, 10);
          }
        }
      }
      return partialSum;
    }, initialFrequency);

    return repeat;
  };
  let repeatFrequency = null;
  while (repeatFrequency === null) {
    repeatFrequency = collectFrequencies(totalFrequency);
  }
  return repeatFrequency;
};

export const sumFrequencies = async (file: string) => {
  const data = await readFile(file, 'utf8');
  const lines = data.split('\n');
  const withoutEmpty = lines.filter(line => Boolean(line));
  const values = withoutEmpty.map(line => parseInt(line, 10));
  const sum = values.reduce(
    (previous, current) => current + previous,
    INITIAL_FREQUENCY
  );
  return sum;
};

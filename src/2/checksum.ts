import { readCleanLines } from 'fs-util';

export const checksumFromFile = async (file: string) => {
  const data = await readCleanLines(file);
  return checksum(data);
};

export const checksum = (input: string[]) => {
  const initialArray: number[] = [];
  return Array.from(
    initialArray
      .concat(...input.map(countCharacters))
      .reduce(countOfNumbers, new Map<number, number>())
      .values()
  ).reduce((accumulator, current) => accumulator * current, 1);
};

const countCharacters = (input: string) => {
  const characters = input.split('');
  const characterCounts = characters.reduce(
    numberOfEachCharacter,
    new Map<string, number>()
  );
  const countCounts = Array.from(characterCounts.values()).reduce(
    (counts: Set<number>, value: number) => {
      if (value > 1) {
        counts.add(value);
      }
      return counts;
    },
    new Set<number>()
  );
  return Array.from(countCounts).sort();
};

const numberOfEachCharacter = (
  counts: Map<string, number>,
  character: string
) => {
  if (counts.has(character)) {
    const oldCount = counts.get(character) as number;
    counts.set(character, oldCount + 1);
  } else {
    counts.set(character, 1);
  }
  return counts;
};

const countOfNumbers = (countMap: Map<number, number>, value: number) => {
  if (countMap.has(value)) {
    const count = countMap.get(value) as number;
    countMap.set(value, count + 1);
  } else {
    countMap.set(value, 1);
  }
  return countMap;
};

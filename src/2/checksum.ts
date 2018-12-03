import { readFile } from 'fs-async';

export const countCharacters = (input: string) => {
  const characters = input.split('');
  const characterCounts = characters.reduce(
    (counts: Map<string, number>, character: string) => {
      if (counts.has(character)) {
        const oldCount = counts.get(character) as number;
        counts.set(character, oldCount + 1);
      } else {
        counts.set(character, 1);
      }
      return counts;
    },
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

export const checksum = (input: string[]) => {
  const initialArray: number[] = [];
  return Array.from(
    initialArray
      .concat(...input.map(countCharacters))
      .reduce((countMap: Map<number, number>, value: number) => {
        if (countMap.has(value)) {
          const count = countMap.get(value) as number;
          countMap.set(value, count + 1);
        } else {
          countMap.set(value, 1);
        }
        return countMap;
      }, new Map<number, number>())
      .values()
  ).reduce((accumulator, current) => accumulator * current, 1);
};

export const checksumFromFile = async (file: string) => {
  const data = await readFile(file, 'utf8');
  const values = data.split('\n').filter(line => Boolean(line));
  return checksum(values);
};

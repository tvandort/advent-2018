import { readCleanLines } from 'fs-util';

export const findSharedLettersOfOffByOneIdsFromFile = async (file: string) => {
  const data = await readCleanLines(file);
  const pair = offByOnePair(data);
  const [first, second] = pair;
  return sharedLetters(first, second);
};

export const sharedLetters = (a: string, b: string) => {
  const commonLetters = [] as string[];
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      commonLetters.push(a[i]);
    }
  }
  return commonLetters.join('');
};

export const offByOnePair = (ids: string[]) => {
  let outer = null;
  let inner = null;
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      if (offByOne(ids[i], ids[j])) {
        outer = ids[i];
        inner = ids[j];
      }
    }
    if (outer && inner) {
      return [outer, inner];
    }
  }
  return [];
};

export const offByOne = (first: string, second: string) => {
  let differenceCount = 0;
  for (let index = 0; index < first.length; index++) {
    if (first[index] !== second[index]) {
      differenceCount++;
    }
    if (differenceCount > 1) {
      return false;
    }
  }
  return true;
};

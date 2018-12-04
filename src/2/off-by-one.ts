// export const offByOnePair = (ids: string[]) => {};

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

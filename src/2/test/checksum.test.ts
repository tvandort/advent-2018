import { checksum, countCharacters } from '../checksum';

const testDataset = [
  ['abcdef', []],
  ['bababc', [2, 3]],
  ['abbcde', [2]],
  ['abcccd', [3]],
  ['aabcdd', [2]],
  ['abcdee', [2]],
  ['ababab', [3]]
];

describe('checksum', () => {
  test.each(testDataset)('id %p counts for %p', (id, expectedCounts) => {
    expect(countCharacters(id)).toEqual(expectedCounts);
  });

  test('checksum is 12', () => {
    const asd = testDataset.map(data => data[0] as string);
    expect(checksum(asd)).toBe(12);
  });
});

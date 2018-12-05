import { join } from 'path';
import { checksum, checksumFromFile } from '../checksum';

const testDataset = [
  ['abcdef', []],
  ['bababc', [2, 3]],
  ['abbcde', [2]],
  ['abcccd', [3]],
  ['aabcdd', [2]],
  ['abcdee', [2]],
  ['ababab', [3]]
];

const ids = testDataset.map(data => data[0] as string);

describe('checksum', () => {
  test('checksum is 12', () => {
    expect(checksum(ids)).toBe(12);
  });

  test('checksumFromFile', async () => {
    expect(await checksumFromFile(join(__dirname, 'id-file.txt'))).toBe(12);
  });
});

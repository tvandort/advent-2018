import { join } from 'path';
import {
  findSharedLettersOfOffByOneIdsFromFile,
  offByOne,
  offByOnePair,
  sharedLetters
} from '../off-by-one';

const dataWithOffByOne = [
  'abcde',
  'fghij',
  'klmno',
  'pqrst',
  'fguij',
  'axcye',
  'wvxyz'
];

const testFile = join(__dirname, 'pair.txt');

describe('difference of one', () => {
  it('greater than one difference', () => {
    expect(offByOne('abcde', 'fghij')).toBe(false);
  });

  it('is off by one', () => {
    expect(offByOne('fghij', 'fguij')).toBe(true);
  });

  it('can find off by one in many rows', () => {
    expect(offByOnePair(dataWithOffByOne)).toEqual(['fghij', 'fguij']);
  });

  it('it cannot find any off by ones', () => {
    expect(offByOnePair(['abc', 'def'])).toEqual([]);
  });
});

describe('same letters', () => {
  it('none', () => {
    expect(sharedLetters('abc', 'def')).toEqual('');
  });

  it('a', () => {
    expect(sharedLetters('abcg', 'abdg')).toEqual('abg');
  });

  it('can read file and find common letters of off by one pair', async () => {
    expect(await findSharedLettersOfOffByOneIdsFromFile(testFile)).toEqual(
      'fgij'
    );
  });
});

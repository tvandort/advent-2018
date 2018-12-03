import { offByOne, offByOnePair } from '../off-by-one';

const dataWithOffByOne = [
  'abcde',
  'fghij',
  'klmno',
  'pqrst',
  'fguij',
  'axcye',
  'wvxyz'
];

describe('difference of one', () => {
  it('greater than one difference', () => {
    expect(offByOne('abcde', 'fghij')).toBe(false);
  });

  it('is off by one', () => {
    expect(offByOne('fghij', 'fguij')).toBe(true);
  });

  it.only('can find off by one in many rows', () => {
    expect(offByOnePair(dataWithOffByOne)).toBe(['fghij', 'fguij']);
  });
});

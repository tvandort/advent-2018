import { join } from 'path';
import { sumFrequencies } from '../frequency';

describe('sum', () => {
  test.each([
    ['zero.txt', 0],
    ['one.txt', 1],
    ['negative-one.txt', -1],
    ['multiple-values.txt', 8]
  ])('read %p sum was %p', async (file, expectedSum) => {
    expect(await sumFrequencies(join(__dirname, file))).toBe(expectedSum);
  });

  it('throws when file does not exist', async () => {
    try {
      await sumFrequencies('does_not_exist.txt');
    } catch (error) {
      expect(error.code).toMatchSnapshot();
    }
  });
});

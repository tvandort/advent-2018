import { join } from 'path';
import { repeatedFrequency, sumFrequencies } from '../frequency';

describe('frequency', () => {
  describe(sumFrequencies, () => {
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

  describe(repeatedFrequency, () => {
    it('read repeated-zero.txt and detected repeated zero', async () => {
      expect(
        await repeatedFrequency(join(__dirname, 'repeated-zero.txt'))
      ).toBe(0);
    });

    it('reads ten-twice.txt and detected repeated ten', async () => {
      expect(await repeatedFrequency(join(__dirname, 'ten-twice.txt'))).toBe(
        10
      );
    });
  });
});

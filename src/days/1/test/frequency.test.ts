import { join } from 'path';
import { repeatedFrequency, sumFrequencies } from '../frequency';
import { FrequencyAnalyzer } from '../FrequencyAnalyzer';

const TEST_CASES: Array<[string, number]> = [
  ['zero.txt', 0],
  ['one.txt', 1],
  ['negative-one.txt', -1],
  ['multiple-values.txt', 8]
];

describe('frequency', () => {
  describe(sumFrequencies, () => {
    test.each(TEST_CASES)('read %p sum was %p', async (file, expectedSum) => {
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
      const result = await repeatedFrequency(
        join(__dirname, 'repeated-zero.txt')
      );
      expect(result).toBe(0);
    });

    it('reads ten-twice.txt and detected repeated ten', async () => {
      const result = await repeatedFrequency(join(__dirname, 'ten-twice.txt'));
      expect(result).toBe(10);
    });
  });

  describe(FrequencyAnalyzer, () => {
    it('repeated frequency does not change with new repeats', () => {
      const analyzer = new FrequencyAnalyzer();
      analyzer.Next(1);
      analyzer.Next(-1);
      expect(analyzer.HasRepeatedFrequency()).toBe(true);
      expect(analyzer.FirstRepeatedFrequency).toBe(0);
      analyzer.Next(2);
      analyzer.Next(-2);
      analyzer.Next(2);
      expect(analyzer.FirstRepeatedFrequency).toBe(0);
    });
  });
});

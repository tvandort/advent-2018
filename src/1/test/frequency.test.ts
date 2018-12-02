import { join } from 'path';
import frequency from '../frequency';

describe('frequency', () => {
  test.each([
    ['zero.txt', 0],
    ['one.txt', 1],
    ['negative-one.txt', -1],
    ['multiple-values.txt', 8]
  ])('read %p frequency was %p', async (file, sum) => {
    expect(await frequency(join(__dirname, file))).toBe(sum);
  });

  it('throws when file does not exist', async () => {
    try {
      await frequency('does_not_exist.txt');
    } catch (error) {
      expect(error.code).toMatchSnapshot();
    }
  });
});

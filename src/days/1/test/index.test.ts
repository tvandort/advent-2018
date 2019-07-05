import * as frequency from '../frequency';
import dayOne from '../index';

let sumFrequenciesSpy: jest.SpyInstance<Promise<number>, [string]>;
let repeatedFrequencySpy: jest.SpyInstance<Promise<number>, [string]>;

beforeAll(() => {
  sumFrequenciesSpy = jest.spyOn(frequency, 'sumFrequencies');
  repeatedFrequencySpy = jest.spyOn(frequency, 'repeatedFrequency');
  // tslint:disable-next-line:no-empty
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  it('calls with file', () => {
    sumFrequenciesSpy.mockResolvedValue(10);
    repeatedFrequencySpy.mockResolvedValue(20);

    dayOne();

    expect(sumFrequenciesSpy).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
    expect(repeatedFrequencySpy).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
  });
});

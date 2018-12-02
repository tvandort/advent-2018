import { join } from 'path';
import * as frequency from './1/frequency';

let sumFrequenciesSpy: jest.SpyInstance<(file: string) => Promise<number>>;
let repeatedFrequencySpy: jest.SpyInstance<(file: string) => Promise<number>>;
let consoleLogSpy: jest.SpyInstance<
  (message?: any, ...optionalParams: any[]) => void
>;
beforeAll(() => {
  sumFrequenciesSpy = jest.spyOn(frequency, 'sumFrequencies');
  repeatedFrequencySpy = jest.spyOn(frequency, 'repeatedFrequency');
  consoleLogSpy = jest.spyOn(console, 'log');
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  beforeEach(() => {
    sumFrequenciesSpy.mockImplementation(async () => {
      return 101;
    });
    repeatedFrequencySpy.mockImplementation(async () => {
      return 102;
    });
    // tslint:disable-next-line:no-empty
    consoleLogSpy.mockImplementation(async () => {});
    require('./index');
  });

  it('will call frequency sum frequency', () => {
    expect(frequency.sumFrequencies).toBeCalledWith(
      join(__dirname, './1/input.txt')
    );
  });

  it('will call first repeated frequency', () => {
    expect(frequency.repeatedFrequency).toBeCalledWith(
      join(__dirname, './1/input.txt')
    );
  });
});

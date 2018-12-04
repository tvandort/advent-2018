import { join } from 'path';
import * as frequency from './1/frequency';
import * as checksum from './2/checksum';
import * as offByOne from './2/off-by-one';

let sumFrequenciesSpy: jest.SpyInstance<(file: string) => Promise<number>>;
let repeatedFrequencySpy: jest.SpyInstance<(file: string) => Promise<number>>;
let consoleLogSpy: jest.SpyInstance<
  (message?: any, ...optionalParams: any[]) => void
>;
let checksumFromFileSpy: jest.SpyInstance<(file: string) => Promise<number>>;
let findSharedlettersOfOffByOneIdsFromFileSpy: jest.SpyInstance<
  (file: string) => Promise<string>
>;

beforeAll(() => {
  sumFrequenciesSpy = jest.spyOn(frequency, 'sumFrequencies');
  repeatedFrequencySpy = jest.spyOn(frequency, 'repeatedFrequency');
  checksumFromFileSpy = jest.spyOn(checksum, 'checksumFromFile');
  findSharedlettersOfOffByOneIdsFromFileSpy = jest.spyOn(
    offByOne,
    'findSharedLettersOfOffByOneIdsFromFile'
  );
  consoleLogSpy = jest.spyOn(console, 'log');
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  beforeEach(() => {
    sumFrequenciesSpy.mockResolvedValueOnce(101);
    repeatedFrequencySpy.mockResolvedValueOnce(102);
    checksumFromFileSpy.mockResolvedValueOnce(103);
    findSharedlettersOfOffByOneIdsFromFileSpy.mockResolvedValueOnce('abcdefg');

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

  it('will call checksum', () => {
    expect(checksumFromFileSpy).toBeCalledWith(
      join(__dirname, './2/input.txt')
    );
  });

  it('will call off by one', () => {
    expect(offByOne.findSharedLettersOfOffByOneIdsFromFile).toBeCalledWith(
      join(__dirname, './2/input.txt')
    );
  });
});

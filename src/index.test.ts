import { join } from 'path';
import * as frequency from './1/frequency';

let frequencyDefaultSpy: jest.SpyInstance<(file: string) => Promise<number>>;
let consoleLogSpy: jest.SpyInstance<
  (message?: any, ...optionalParams: any[]) => void
>;
beforeAll(() => {
  frequencyDefaultSpy = jest.spyOn(frequency, 'default');
  consoleLogSpy = jest.spyOn(console, 'log');
});

beforeEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  beforeEach(async done => {
    frequencyDefaultSpy.mockImplementation(async () => {
      done();
      return 101;
    });
    require('./index');
  });

  it('will call frequency default', () => {
    expect(frequency.default).toBeCalledWith(join(__dirname, './1/input.txt'));
    expect(console.log).toBeCalledWith('Total frequency: ', 101);
  });
});

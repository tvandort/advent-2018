import { join } from 'path';
import * as frequency from './1/frequency';

let frequencyDefaultSpy: jest.SpyInstance<(file: string) => Promise<number>>;
beforeAll(() => {
  frequencyDefaultSpy = jest.spyOn(frequency, 'default');
  jest.spyOn(console, 'log');
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
    // tslint:disable-next-line:no-console
    expect(console.log).toBeCalledWith('Total frequency: ', 101);
  });
});

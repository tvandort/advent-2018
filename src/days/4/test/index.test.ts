import * as schedule from '../schedule-analysis';
import dayFour from '../index';

let minuteMostAsleepByGuardFromFile: jest.SpyInstance<
  Promise<number>,
  [string]
>;
let mostAsleepByGuardAndMinuteFromFile: jest.SpyInstance<
  Promise<number>,
  [string]
>;

beforeAll(() => {
  minuteMostAsleepByGuardFromFile = jest.spyOn(
    schedule,
    'minuteMostAsleepByGuardFromFile'
  );
  mostAsleepByGuardAndMinuteFromFile = jest.spyOn(
    schedule,
    'mostAsleepByGuardAndMinuteFromFile'
  );

  // tslint:disable-next-line:no-empty
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  it('calls with file', async () => {
    minuteMostAsleepByGuardFromFile.mockResolvedValue(10);
    mostAsleepByGuardAndMinuteFromFile.mockResolvedValue(20);

    dayFour();

    await expect(minuteMostAsleepByGuardFromFile).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
    await expect(mostAsleepByGuardAndMinuteFromFile).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
  });
});

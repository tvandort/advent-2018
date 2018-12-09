import * as schedule from '../schedule';
import dayFour from '../index';

let minuteMostAsleepByGuardFromFile: jest.SpyInstance<
  (file: string) => Promise<number>
>;
let mostAsleepByGuardAndMinuteFromFile: jest.SpyInstance<
  (file: string) => Promise<number>
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

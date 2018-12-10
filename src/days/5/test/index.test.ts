import * as polymer from '../polymer';
import dayFive from '../index';
import { IReactionResults } from '../IReactionResults';

let reactPolymerFromFileSpy: jest.SpyInstance<
  (file: string) => Promise<IReactionResults>
>;
let reactPolymerAndRemoveConfoundingUnitFromFileSpy: jest.SpyInstance<
  (file: string) => Promise<IReactionResults>
>;
beforeAll(() => {
  reactPolymerFromFileSpy = jest.spyOn(polymer, 'reactPolymerFromFile');
  reactPolymerAndRemoveConfoundingUnitFromFileSpy = jest.spyOn(
    polymer,
    'reactPolymerAndRemoveConfoundingUnitFromFile'
  );

  // tslint:disable-next-line:no-empty
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  it('calls with file', async () => {
    const expected = {
      ReactedPolymer: '',
      RemainingUnits: 0,
      ContainedUnits: []
    } as IReactionResults;
    reactPolymerFromFileSpy.mockResolvedValue(expected);
    reactPolymerAndRemoveConfoundingUnitFromFileSpy.mockResolvedValue(expected);

    dayFive();

    await expect(reactPolymerFromFileSpy).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
    await expect(
      reactPolymerAndRemoveConfoundingUnitFromFileSpy
    ).toBeCalledWith(expect.stringContaining('input.txt'));
  });
});

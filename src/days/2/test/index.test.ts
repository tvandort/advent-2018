import * as checksum from '../checksum';
import dayTwo from '../index';
import * as offByOne from '../off-by-one';

let checksumFromFileSpy: jest.SpyInstance<Promise<number>, [string]>;
let findSharedlettersOfOffByOneIdsFromFile: jest.SpyInstance<
  Promise<string>,
  [string]
>;

beforeAll(() => {
  checksumFromFileSpy = jest.spyOn(checksum, 'checksumFromFile');
  findSharedlettersOfOffByOneIdsFromFile = jest.spyOn(
    offByOne,
    'findSharedLettersOfOffByOneIdsFromFile'
  );
  // tslint:disable-next-line:no-empty
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  it('calls with file', async () => {
    checksumFromFileSpy.mockResolvedValue(10);
    findSharedlettersOfOffByOneIdsFromFile.mockResolvedValue('abcdef');

    dayTwo();

    await expect(checksumFromFileSpy).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
    await expect(findSharedlettersOfOffByOneIdsFromFile).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
  });
});

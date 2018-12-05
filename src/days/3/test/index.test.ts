import * as fabric from '../fabric';
import dayThree from '../index';

let countOverlapsFabricSpy: jest.SpyInstance<(file: string) => Promise<number>>;
let findFabricThatDoesNotOverlapFromFileSpy: jest.SpyInstance<
  (file: string) => Promise<string[]>
>;
beforeAll(() => {
  countOverlapsFabricSpy = jest.spyOn(fabric, 'countOverlapsFromFile');
  findFabricThatDoesNotOverlapFromFileSpy = jest.spyOn(
    fabric,
    'findFabricThatDoesNotOverlapFromFile'
  );
  // tslint:disable-next-line:no-empty
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('index', () => {
  it('calls with file', () => {
    countOverlapsFabricSpy.mockResolvedValue(10);
    findFabricThatDoesNotOverlapFromFileSpy.mockResolvedValue(20);

    dayThree();

    expect(countOverlapsFabricSpy).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
    expect(findFabricThatDoesNotOverlapFromFileSpy).toBeCalledWith(
      expect.stringContaining('input.txt')
    );
  });
});

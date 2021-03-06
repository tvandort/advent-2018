import days from '../../days';
import { runner } from '../runner';

beforeAll(() => {
  jest.spyOn(days, '1').mockImplementation(() => undefined);
  jest.spyOn(days, '2').mockImplementation(() => undefined);
  jest.spyOn(days, '3').mockImplementation(() => undefined);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe(runner, () => {
  test.each([['1'], ['2'], ['3']])('can process day %p', (day: string) => {
    const mockProcessArgs = ['node', __filename, '--day', day];

    runner(mockProcessArgs);

    expect((days as any)[day]).toBeCalled();
  });
});

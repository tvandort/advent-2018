import { readScheduleLine } from '../schedule';

describe(readScheduleLine, () => {
  it('splits date and event', () => {
    const time = new Date(1518, 10, 1, 0, 0);
    const event = 'Guard #10 begins shift';
    const readString = '[1518-11-01 00:00] Guard #10 begins shift';
    expect(readScheduleLine(readString)).toEqual({ time, event });
  });

  it('splits date and event', () => {
    const time = new Date(1518, 10, 1, 0, 5);
    const event = 'falls asleep';
    const readString = '[1518-11-01 00:05] falls asleep';
    expect(readScheduleLine(readString)).toEqual({ time, event });
  });
});

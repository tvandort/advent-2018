import {
  lineToSchedule,
  mostAsleepByGuardAndMinuteFromFile,
  minuteMostAsleepByGuardFromFile
} from '../schedule';
import { Timeline } from '../Timeline';
import { TimelineEvent } from '../TimelineEvent';
import moment from 'moment';
import { join } from 'path';

const timelineEvent1 = new TimelineEvent(
  moment({
    year: 1518,
    month: 10,
    day: 1,
    hours: 0,
    minutes: 0
  }),
  'Guard #10 begins shift'
);
const timelineEvent2 = new TimelineEvent(
  moment({
    year: 1518,
    month: 10,
    day: 1,
    hours: 0,
    minutes: 5
  }),
  'falls asleep'
);

const timelineEvent3 = new TimelineEvent(
  moment({
    year: 1518,
    month: 11,
    day: 1,
    hours: 0,
    minutes: 1
  }),
  'Guard #11 begins shift'
);

describe(lineToSchedule, () => {
  it('splits date and event', () => {
    const readString = '[1518-11-01 00:00] Guard #10 begins shift';
    expect(lineToSchedule(readString)).toEqual(timelineEvent1);
  });

  it('splits date and event', () => {
    const readString = '[1518-11-01 00:05] falls asleep';
    expect(lineToSchedule(readString)).toEqual(timelineEvent2);
  });
});

describe('timeline', () => {
  it('can construct a timeline', () => {
    const timeline = new Timeline([
      timelineEvent2,
      timelineEvent1,
      timelineEvent3
    ]);

    expect(timeline.Events).toEqual([
      timelineEvent1,
      timelineEvent2,
      timelineEvent3
    ]);
  });
});

describe('schedule', () => {
  it('gets guard time multiplied', async () => {
    expect(
      await mostAsleepByGuardAndMinuteFromFile(join(__dirname, './example.txt'))
    ).toEqual(240);
  });

  it('gets guard most frequency asleep same minute', async () => {
    expect(
      await minuteMostAsleepByGuardFromFile(join(__dirname, './example.txt'))
    ).toEqual(4455);
  });
});

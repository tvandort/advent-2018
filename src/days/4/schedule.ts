import moment from 'moment';
import { TimelineEvent } from './TimelineEvent';
import { readCleanLines } from 'fs-util';
import { Timeline } from './Timeline';

const isNewShift = (event: string) => /begins shift/.test(event);
const getGuard = (event: string) => {
  const back = event.slice(7);
  const guard = back.slice(0, back.indexOf('begin'));
  return parseInt(guard, 10);
};

const getEventType = (event: string) => {
  if (/wakes/.test(event)) {
    return 'awake';
  }

  if (/falls/.test(event)) {
    return 'asleep';
  }

  throw Error('wat');
};

class Schedule {
  public Shifts: Shift[];

  constructor(timeline: Timeline) {
    this.Shifts = timeline.Events.reduce(
      (shifts: Shift[], event: TimelineEvent) => {
        if (isNewShift(event.EventText)) {
          shifts.push(new Shift(event.OccurredOn, getGuard(event.EventText)));
        } else {
          const lastShift = shifts[shifts.length - 1];
          lastShift.Push(getEventType(event.EventText), event.OccurredOn);
        }
        return shifts;
      },
      []
    ).map((shift: Shift) => {
      shift.End();
      return shift;
    });
  }

  public MostAsleep = () => {
    const minuteCounts = this.Shifts.reduce(
      (map: Map<number, number>, shift: Shift) => {
        const minutes = map.get(shift.Guard);
        if (minutes) {
          map.set(shift.Guard, minutes + shift.MinutesBetween.length);
        } else {
          map.set(shift.Guard, shift.MinutesBetween.length);
        }
        return map;
      },
      new Map<number, number>()
    );

    const orderedMinuteCounts = Array.from(minuteCounts.keys())
      .map(guard => ({
        guard,
        count: minuteCounts.get(guard) as number
      }))
      .sort((a, b) => b.count - a.count);

    return {
      Guard: orderedMinuteCounts[0].guard,
      MinutesSlept: orderedMinuteCounts[0].count
    };
  };
}

type Status = 'awake' | 'asleep';

class Shift {
  public StartsOn: Date;
  public Guard: number;
  private lastStatus: Status;
  private lastStatusTime: Date;
  private minutesAsleep: number[];

  constructor(startsOn: Date, guard: number) {
    this.StartsOn = startsOn;
    this.Guard = guard;
    this.lastStatus = 'awake';
    this.lastStatusTime = startsOn;
    this.minutesAsleep = [];
  }

  get AsleepFor(): number {
    return this.MinutesBetween.length;
  }

  get MinutesBetween(): number[] {
    return this.minutesAsleep;
  }

  public Push = (status: Status, on: Date) => {
    if (status === 'awake') {
      for (let m = this.lastStatusTime.getMinutes(); m < on.getMinutes(); m++) {
        this.minutesAsleep.push(m);
      }
    }
    this.lastStatus = status;
    this.lastStatusTime = on;
  };

  public End = () => {
    if (this.lastStatus === 'asleep') {
      for (let m = this.lastStatusTime.getMinutes(); m < 59; m++) {
        this.minutesAsleep.push(m);
      }
    }
  };
}

export const guardMultipliedByMinuteFromFile = async (file: string) => {
  const timeline = new Timeline(
    (await readCleanLines(file)).map(lineToSchedule)
  );

  const schedule = new Schedule(timeline);
  // tslint:disable-next-line:no-console
  console.log('????', schedule.MostAsleep());
};

export const lineToSchedule = (scheduleLine: string) => {
  const dateTimeString = scheduleLine.slice(0, 18).trim();
  const date = moment(dateTimeString, 'YYYY-MM-DD HH:mm');
  const eventString = scheduleLine.slice(19).trim();

  return new TimelineEvent(date, eventString);
};

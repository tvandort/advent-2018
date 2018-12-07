import moment, { min } from 'moment';
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

const toTimeByGuards = (map: Map<number, number[]>, shift: Shift) => {
  const minutes = map.get(shift.Guard);
  if (minutes) {
    map.set(shift.Guard, minutes.concat(shift.MinutesBetween));
  } else {
    map.set(shift.Guard, shift.MinutesBetween);
  }
  return map;
};

const toSleptMinuteMap = (minuteMap: Map<number, number>, minute: number) => {
  const m = minuteMap.get(minute) || 0;
  minuteMap.set(minute, m + 1);
  return minuteMap;
};

const byNumberDesc = (a: { count: number }, b: { count: number }) =>
  b.count - a.count;

type Minute = number;
type Guard = number;

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
    );
    // .map((shift: Shift) => {
    //   // shift.End();
    //   return shift;
    // });
  }

  public MostAsleepByGuard = () => {
    const timeByGuards = this.Shifts.reduce(
      toTimeByGuards,
      new Map<number, number[]>()
    );

    const allOrderedMinutesForGuards = Array.from(timeByGuards.keys())
      .map(guard => {
        const count = timeByGuards.get(guard) as number[];
        const sleptMinuteMap = count.reduce(
          toSleptMinuteMap,
          new Map<number, number>()
        );

        const orderedSleptMinuteMap = Array.from(sleptMinuteMap.keys())
          .map(m => ({
            minute: m,
            count: sleptMinuteMap.get(m) as number
          }))
          .sort(byNumberDesc);

        return {
          guard,
          count: count.length,
          minute: (orderedSleptMinuteMap[0] || { minute: 0 }).minute
        };
      })
      .sort(byNumberDesc);

    return {
      Guard: allOrderedMinutesForGuards[0].guard,
      MinutesSlept: allOrderedMinutesForGuards[0].count,
      MostSleptMinute: allOrderedMinutesForGuards[0].minute
    };
  };

  public MostAsleepByMinute = () => {
    const minutesByGuard = this.Shifts.reduce(
      (minuteByGuard: Map<Minute, Map<Guard, number>>, shift: Shift) => {
        shift.MinutesBetween.forEach(m => {
          const minutes = minuteByGuard.get(m) || new Map<Guard, number>();
          let guardCount = minutes.get(shift.Guard) || 0;
          guardCount += 1;
          minutes.set(shift.Guard, guardCount);
          minuteByGuard.set(m, minutes);
        });
        return minuteByGuard;
      },
      new Map<Minute, Map<Guard, number>>()
    );

    const ordered = Array.from(minutesByGuard.keys()).map(m => {
      const mbg = minutesByGuard.get(m) as Map<Guard, number>;
      
      return {
        minute: m,x
        guard:
      }
    })
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

  // public End = () => {
  //   if (this.lastStatus === 'asleep') {
  //     for (let m = this.lastStatusTime.getMinutes(); m < 59; m++) {
  //       this.minutesAsleep.push(m);
  //     }
  //   }
  // };
}

export const mostAsleepByGuardAndMinuteFromFile = async (file: string) => {
  const timeline = new Timeline(
    (await readCleanLines(file)).map(lineToSchedule)
  );

  const schedule = new Schedule(timeline);
  const mostAsleep = schedule.MostAsleepByGuard();
  return mostAsleep.Guard * mostAsleep.MostSleptMinute;
};

export const minuteMostAsleepByGuards = async (file: string) => {
  const timeline = new Timeline(
    (await readCleanLines(file)).map(lineToSchedule)
  );

  const schedule = new Schedule(timeline);
  const minuteMostAsleep = schedule.MostAsleepByMinute();
  return minuteMostAsleep.Guard * minuteMostAsleep.Minute;
};

export const lineToSchedule = (scheduleLine: string) => {
  const dateTimeString = scheduleLine.slice(0, 18).trim();
  const date = moment(dateTimeString, 'YYYY-MM-DD HH:mm');
  const eventString = scheduleLine.slice(19).trim();

  return new TimelineEvent(date, eventString);
};

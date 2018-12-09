import { TimelineEvent } from './TimelineEvent';
import { Timeline } from './Timeline';
import { Shift } from './Shift';

type Minute = number;
type Guard = number;

export class Schedule {
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
    let highestSoFar = { minute: 0, count: 0, guard: 0 };
    for (const minute of minutesByGuard) {
      for (const count of minute[1]) {
        if (count[1] > highestSoFar.count) {
          highestSoFar = {
            minute: minute[0],
            count: count[1],
            guard: count[0]
          };
        }
      }
    }
    return {
      Guard: highestSoFar.guard,
      Minute: highestSoFar.minute
    };
  };
}

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

  throw Error('Event type could not be determined.');
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

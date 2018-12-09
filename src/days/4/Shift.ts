export type Status = 'awake' | 'asleep';

export class Shift {
  public StartsOn: Date;
  public Guard: number;
  private lastStatusTime: Date;
  private minutesAsleep: number[];

  constructor(startsOn: Date, guard: number) {
    this.StartsOn = startsOn;
    this.Guard = guard;
    this.lastStatusTime = startsOn;
    this.minutesAsleep = [];
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
    this.lastStatusTime = on;
  };
}

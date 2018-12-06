import moment from 'moment';

export class TimelineEvent {
  public OccurredOn: Date;
  public Event: string;

  constructor(occurredOn: moment.Moment, event: string) {
    this.OccurredOn = occurredOn.toDate();
    this.Event = event;
  }
}

export class Timeline {
  public Events: any;
  constructor(events: TimelineEvent[]) {
    this.Events = events.sort((a, b) =>
      moment(a.OccurredOn).diff(moment(b.OccurredOn))
    );
  }
}

export const readScheduleLine = (scheduleLine: string) => {
  const dateTimeString = scheduleLine.slice(0, 18).trim();
  const date = moment(dateTimeString, 'YYYY-MM-DD HH:mm');
  const eventString = scheduleLine.slice(19).trim();

  return new TimelineEvent(date, eventString);
};

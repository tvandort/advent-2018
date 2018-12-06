import moment from 'moment';

export class TimelineEvent {
  public OccurredOn: Date;
  public Event: string;

  constructor(occurredOn: moment.Moment, event: string) {
    this.OccurredOn = occurredOn.toDate();
    this.Event = event;
  }
}

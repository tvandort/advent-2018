import moment from 'moment';

export class TimelineEvent {
  public OccurredOn: Date;
  public EventText: string;

  constructor(occurredOn: moment.Moment, event: string) {
    this.OccurredOn = occurredOn.toDate();
    this.EventText = event;
  }
}

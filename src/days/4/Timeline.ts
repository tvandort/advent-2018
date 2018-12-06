import moment from 'moment';
import { TimelineEvent } from './TimelineEvent';

export class Timeline {
  public Events: any;

  constructor(events: TimelineEvent[]) {
    this.Events = events.sort((a, b) =>
      moment(a.OccurredOn).diff(moment(b.OccurredOn))
    );
  }
}

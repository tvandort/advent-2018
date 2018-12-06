import moment from 'moment';

class ScheduleEvent {
  public OccurredOn: moment.Moment;

  constructor(occurredOn: moment.Moment) {
    this.OccurredOn = occurredOn;
  }
}

export const readScheduleLine = (scheduleLine: string) => {
  const dateTimeString = scheduleLine.slice(0, 18).trim();
  const date = moment(dateTimeString, 'YYYY-MM-DD hh:mm').toDate();
  const eventString = scheduleLine.slice(19).trim();

  return { time: date, event: eventString };
};

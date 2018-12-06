import moment from 'moment';
import { TimelineEvent } from './TimelineEvent';

export const readScheduleLine = (scheduleLine: string) => {
  const dateTimeString = scheduleLine.slice(0, 18).trim();
  const date = moment(dateTimeString, 'YYYY-MM-DD HH:mm');
  const eventString = scheduleLine.slice(19).trim();

  return new TimelineEvent(date, eventString);
};

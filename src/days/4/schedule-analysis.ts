import moment from 'moment';
import { TimelineEvent } from './TimelineEvent';
import { readCleanLines } from 'fs-util';
import { Timeline } from './Timeline';
import { Schedule } from './Schedule';

export const mostAsleepByGuardAndMinuteFromFile = async (file: string) => {
  const schedule = await readScheduleFromFile(file);
  const mostAsleep = schedule.MostAsleepByGuard();
  return mostAsleep.Guard * mostAsleep.MostSleptMinute;
};

export const minuteMostAsleepByGuardFromFile = async (file: string) => {
  const schedule = await readScheduleFromFile(file);
  const mostAsleep = schedule.MostAsleepByMinute();
  return mostAsleep.Guard * mostAsleep.Minute;
};

const readScheduleFromFile = async (file: string) => {
  const timeline = new Timeline(
    (await readCleanLines(file)).map(lineToSchedule)
  );

  return new Schedule(timeline);
};

export const lineToSchedule = (scheduleLine: string) => {
  const dateTimeString = scheduleLine.slice(0, 18).trim();
  const date = moment(dateTimeString, 'YYYY-MM-DD HH:mm');
  const eventString = scheduleLine.slice(19).trim();

  return new TimelineEvent(date, eventString);
};

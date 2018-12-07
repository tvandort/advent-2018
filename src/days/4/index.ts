import { join } from 'path';
import { mostAsleepByGuardAndMinuteFromFile } from './schedule';

export default () => {
  const file = join(__dirname, './input.txt');

  mostAsleepByGuardAndMinuteFromFile(file).then(info => {
    // tslint:disable-next-line:no-console
    console.log('Guard x Most Asleep Minute', info);
  });
};

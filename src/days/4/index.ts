import { join } from 'path';
import {
  mostAsleepByGuardAndMinuteFromFile,
  minuteMostAsleepByGuardFromFile
} from './schedule';

export default () => {
  const file = join(__dirname, './input.txt');

  mostAsleepByGuardAndMinuteFromFile(file).then(info => {
    // tslint:disable-next-line:no-console
    console.log('Guard x Most Asleep Minute', info);
  });

  minuteMostAsleepByGuardFromFile(file).then(info => {
    // tslint:disable-next-line:no-console
    console.log('Minute most slept and by guard', info);
  });
};

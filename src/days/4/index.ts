import { join } from 'path';
import { guardMultipliedByMinuteFromFile } from './schedule';

export default () => {
  const file = join(__dirname, './input.txt');

  guardMultipliedByMinuteFromFile(file).then(info => {
    // tslint:disable-next-line:no-console
    console.log('Guard x Most Asleep Minute', info);
  });
};

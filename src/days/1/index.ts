import { join } from 'path';
import { repeatedFrequency, sumFrequencies } from './frequency';

export default () => {
  const file = join(__dirname, './input.txt');

  sumFrequencies(file).then(sum => {
    // tslint:disable-next-line:no-console
    console.log('The sum of frequencies is: ', sum);
  });

  repeatedFrequency(file).then(firstRepeat => {
    // tslint:disable-next-line:no-console
    console.log('The first repeated frequency is: ', firstRepeat);
  });
};

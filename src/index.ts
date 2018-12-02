import 'es6-promise/auto';
import { join } from 'path';
import { repeatedFrequency, sumFrequencies } from './1/frequency';

(async () => {
  const file = join(__dirname, './1/input.txt');
  const totalFrequency = await sumFrequencies(file);
  const firstRepeatedFrequency = await repeatedFrequency(file);
  // tslint:disable-next-line:no-console
  console.log('Total frequency: ', totalFrequency);
  // tslint:disable-next-line:no-console
  console.log('First repeated frequency: ', firstRepeatedFrequency);
})();

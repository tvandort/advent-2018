import 'es6-promise/auto';
import { join } from 'path';
import frequency from './1/frequency';

(async () => {
  const totalFrequency = await frequency(join(__dirname, './1/input.txt'));
  console.log('Total frequency: ', totalFrequency);
})();

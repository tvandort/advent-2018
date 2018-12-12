import { findGreatestAreaFromFile } from './chrono-coordinates';
import { join } from 'path';

export default () => {
  const file = join(__dirname, 'input.txt');

  findGreatestAreaFromFile(file).then(info => {
    console.log('Greatest area: ', info);
  });
};

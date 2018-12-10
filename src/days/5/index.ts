import { join } from 'path';
import {
  reactPolymerFromFile,
  reactPolymerAndRemoveConfoundingUnitFromFile
} from './polymer';

export default () => {
  const file = join(__dirname, 'input.txt');

  reactPolymerFromFile(file).then(info => {
    // tslint:disable-next-line:no-console
    console.log('Reacted polymer: ', info.RemainingUnits);
  });

  reactPolymerAndRemoveConfoundingUnitFromFile(file).then(info => {
    // tslint:disable-next-line:no-console
    console.log('Smallest polymer chain: ', info.RemainingUnits);
  });
};

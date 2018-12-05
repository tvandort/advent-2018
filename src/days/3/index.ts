import { join } from 'path';
import {
  countOverlapsFromFile,
  findFabricThatDoesNotOverlapFromFile
} from './fabric';

export default () => {
  const file = join(__dirname, './input.txt');

  countOverlapsFromFile(file).then(overlaps => {
    // tslint:disable-next-line:no-console
    console.log('Count of overlaps', overlaps);
  });

  findFabricThatDoesNotOverlapFromFile(file).then(doesNotOverlap => {
    // tslint:disable-next-line:no-console
    console.log('Id of claim to does not overlap: ', doesNotOverlap);
  });
};

import { join } from 'path';
import { checksumFromFile } from './checksum';
import { findSharedLettersOfOffByOneIdsFromFile } from './off-by-one';

export default () => {
  const file = join(__dirname, './input.txt');

  checksumFromFile(file).then(checksum => {
    // tslint:disable-next-line:no-console
    console.log('Checksum is: ', checksum);
  });

  findSharedLettersOfOffByOneIdsFromFile(file).then(sharedIdLetters => {
    // tslint:disable-next-line:no-console
    console.log('The first repeated frequency is: ', sharedIdLetters);
  });
};

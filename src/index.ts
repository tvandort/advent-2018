// tslint:disable:no-console
import 'es6-promise/auto';
import { join } from 'path';
import 'tsconfig-paths/register';
import { repeatedFrequency, sumFrequencies } from './1/frequency';
import { checksumFromFile } from './2/checksum';
import { findSharedLettersOfOffByOneIdsFromFile } from './2/off-by-one';
import {
  countOverlapsFromFile,
  findFabricThatDoesNotOverlapFromFile
} from './3/fabric';

const getFile = (file: string) => join(__dirname, file);

(async () => {
  const file = getFile('./1/input.txt');
  const totalFrequency = await sumFrequencies(file);
  console.log('Total frequency: ', totalFrequency);

  const firstRepeatedFrequency = await repeatedFrequency(file);
  console.log('First repeated frequency: ', firstRepeatedFrequency);

  const file2 = getFile('./2/input.txt');
  const inputChecksum = await checksumFromFile(file2);
  console.log('Input checksum: ', inputChecksum);

  const lettersSharedByPair = await findSharedLettersOfOffByOneIdsFromFile(
    file2
  );
  console.log('Letters shared by pair: ', lettersSharedByPair);

  const file3 = getFile('./3/claims.txt');
  const overlapsCount = await countOverlapsFromFile(file3);
  console.log('Fabric overlaps: ', overlapsCount);

  const fabricsThatDoNoOverlap = await findFabricThatDoesNotOverlapFromFile(
    file3
  );
  console.log('Fabric ids with no overlaps', fabricsThatDoNoOverlap);
})();

import * as fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const INITIAL_FREQUENCY = 0;

export default async (file: string) => {
  const data = await readFile(file, 'utf8');
  const lines = data.split('\n');
  const withoutEmpty = lines.filter(line => Boolean(line));
  const values = withoutEmpty.map(line => parseInt(line, 10));
  const sum = values.reduce(
    (previous, current) => current + previous,
    INITIAL_FREQUENCY
  );
  return sum;
};

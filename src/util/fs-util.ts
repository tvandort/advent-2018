import { readFile } from 'fs-async';
const emptyLines = (line: string) => Boolean(line);
const toTrimmed = (line: string) => line.trim();
export const readCleanLines = async (file: string) =>
  (await readFile(file, 'utf8'))
    .split('\n')
    .map(toTrimmed)
    .filter(emptyLines);

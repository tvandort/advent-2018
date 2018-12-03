import { readFile } from 'fs-async';
const emptyLines = (line: string) => Boolean(line);

export const readCleanLines = async (file: string) =>
  (await readFile(file, 'utf8')).split('\n').filter(emptyLines);

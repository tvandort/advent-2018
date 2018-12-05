import commander from 'commander';
import days from '../days';

export const runner = (args: string[]): void => {
  const { day } = commander.option('-d --day <day>', 'Day to run').parse(args);
  (days as any)[day]();
};

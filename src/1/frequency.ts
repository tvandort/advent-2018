import * as fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const INITIAL_FREQUENCY: number = 0;

interface IFrequencyAnalyzer {
  readonly CurrentFrequency: number;
  Next: (frequency: number) => void;
  HasRepeatedFrequency: () => boolean;
  readonly FirstRepeatedFrequency: number | null;
}

export class FrequencyAnalyzer implements IFrequencyAnalyzer {
  private currentFrequency: number;
  private repeatedFrequency: number | null;
  private frequencySet: Set<number>;

  constructor() {
    this.currentFrequency = INITIAL_FREQUENCY;
    this.repeatedFrequency = null;
    this.frequencySet = new Set([INITIAL_FREQUENCY]);
  }

  get CurrentFrequency() {
    return this.currentFrequency;
  }

  get FirstRepeatedFrequency() {
    return this.repeatedFrequency;
  }

  public Next = (frequency: number) => {
    this.currentFrequency += frequency;
    if (this.HasRepeatedFrequency()) {
      return;
    }
    if (this.frequencySet.has(this.currentFrequency)) {
      this.repeatedFrequency = this.currentFrequency;
    } else {
      this.frequencySet.add(this.currentFrequency);
    }
  };

  public HasRepeatedFrequency = () => this.repeatedFrequency !== null;
}

export const repeatedFrequency = async (file: string) => {
  const data = await readFile(file, 'utf8');
  const lines = data.split('\n');
  const withoutempty = lines.filter(line => Boolean(line));
  const values = withoutempty.map(line => parseInt(line, 10));
  const analyzer = new FrequencyAnalyzer();
  let index = 0;
  while (analyzer.HasRepeatedFrequency() === false) {
    analyzer.Next(values[index % values.length]);
    index++;
  }
  return analyzer.FirstRepeatedFrequency as number;
};

export const sumFrequencies = async (file: string) => {
  const data = await readFile(file, 'utf8');
  const lines = data.split('\n');
  const withoutEmpty = lines.filter(line => Boolean(line));
  const values = withoutEmpty.map(line => parseInt(line, 10));
  const analyzer = new FrequencyAnalyzer();
  values.forEach(value => analyzer.Next(value));
  return analyzer.CurrentFrequency;
};

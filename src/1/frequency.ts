import * as fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const INITIAL_FREQUENCY: number = 0;

interface IFrequencyAnalyzer {
  readonly CurrentFrequency: number;
  Next: (frequency: number) => void;
  HasRepeatedFrequency: () => boolean;
  readonly RepeatedFrequency: number | null;
}

class FrequencyAnalyzer implements IFrequencyAnalyzer {
  private currentFrequency: number;
  private repeatedFrequency: number | null;
  private frequencyCount: { [key: string]: number };

  constructor() {
    this.currentFrequency = INITIAL_FREQUENCY;
    this.repeatedFrequency = null;
    this.frequencyCount = { [this.currentFrequency]: 1 };
  }

  get CurrentFrequency() {
    return this.currentFrequency;
  }

  get RepeatedFrequency() {
    return this.repeatedFrequency;
  }

  public Next = (frequency: number) => {
    this.currentFrequency += frequency;
    if (this.frequencyCount[this.currentFrequency]) {
      this.frequencyCount[this.currentFrequency] += 1;
    } else {
      this.frequencyCount[this.currentFrequency] = 1;
    }
    if (this.HasRepeatedFrequency() === false) {
      for (const key of Object.keys(this.frequencyCount)) {
        if (this.frequencyCount[key] > 1) {
          this.repeatedFrequency = parseInt(key, 10);
          return;
        }
      }
    }
  };

  public HasRepeatedFrequency = () => this.repeatedFrequency !== null;
}

export const repeatedFrequency = async (file: string): Promise<number> => {
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
  return analyzer.RepeatedFrequency as number;
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

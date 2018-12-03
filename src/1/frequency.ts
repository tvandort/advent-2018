import { readCleanLines } from 'fs-util';

const INITIAL_FREQUENCY: number = 0;
const toInt = (line: string) => parseInt(line, 10);
const nextFrequency = (analyzer: FrequencyAnalyzer, value: number) => {
  analyzer.Next(value);
  return analyzer;
};

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
  const data = await readCleanLines(file);
  const values = data.map(toInt);

  const analyzer = new FrequencyAnalyzer();
  let index = 0;
  while (analyzer.HasRepeatedFrequency() === false) {
    analyzer.Next(values[index % values.length]);
    index++;
  }
  return analyzer.FirstRepeatedFrequency as number;
};

export const sumFrequencies = async (file: string) => {
  const data = await readCleanLines(file);
  return data.map(toInt).reduce(nextFrequency, new FrequencyAnalyzer())
    .CurrentFrequency;
};

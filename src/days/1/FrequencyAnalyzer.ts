import { IFrequencyAnalyzer } from './IFrequencyAnalyzer';

const INITIAL_FREQUENCY: number = 0;

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

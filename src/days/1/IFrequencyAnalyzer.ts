export interface IFrequencyAnalyzer {
  readonly CurrentFrequency: number;
  Next: (frequency: number) => void;
  HasRepeatedFrequency: () => boolean;
  readonly FirstRepeatedFrequency: number | null;
}

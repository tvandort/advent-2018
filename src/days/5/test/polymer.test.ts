import {
  reactPolymer,
  reactPolymerAndRemoveConfoundingUnit,
  reactPolymerFromFile,
  reactPolymerAndRemoveConfoundingUnitFromFile
} from '../polymer';
import { join } from 'path';

describe(reactPolymer, () => {
  it.each([
    ['ad', 'ad', ['a', 'd']],
    ['aa', 'aa', ['a']],
    ['aA', '', ['a']],
    ['', '', []],
    ['aAa', 'a', ['a']],
    ['aaA', 'a', ['a']],
    ['aaAA', '', ['a']],
    ['dabAcCaCBAcCcaDA', 'dabCBAcaDA', ['a', 'b', 'c', 'd']]
  ])(
    'correctly reacts %p => %p',
    (polymer, expectedPolymer, expectedContainedUnits) => {
      const result = reactPolymer(polymer);
      expect(result.ReactedPolymer).toBe(expectedPolymer);
      expect(result.RemainingUnits).toBe(expectedPolymer.length);
      expect(result.ContainedUnits).toEqual(expectedContainedUnits);
    }
  );

  it('produces minimal polymer without confounding units', () => {
    const result = reactPolymerAndRemoveConfoundingUnit('dabAcCaCBAcCcaDA');
    expect(result.ReactedPolymer).toBe('daDA');
    expect(result.ContainedUnits).toEqual(['a', 'b', 'd']);
    expect(result.RemainingUnits).toBe(4);
  });

  describe('file ops', () => {
    const file = join(__dirname, './example.txt');

    it('reads file and produces correct output', async () => {
      expect(await reactPolymerFromFile(file)).toEqual({
        ReactedPolymer: 'dabCBAcaDA',
        RemainingUnits: 10,
        ContainedUnits: ['a', 'b', 'c', 'd']
      });
    });

    it('reads file and procuces correct output', async () => {
      expect(await reactPolymerAndRemoveConfoundingUnitFromFile(file)).toEqual({
        ReactedPolymer: 'daDA',
        RemainingUnits: 4,
        ContainedUnits: ['a', 'b', 'd']
      });
    });
  });
});

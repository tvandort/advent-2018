interface Id {
  full: string;
  partial: string;
}
export const offByOnePair = (ids: string[]) => {
  let position = 0;
  let candidates = ids;
  // let answerFound = false;
  // while (false) {
  const grouped = candidates.reduce((map: Map<string, Id[]>, id: string) => {
    const character = id[position];
    const idObj = {
      full: id,
      partial: id.slice(position)
    };
    if (map.has(character)) {
      (map.get(character) as Id[]).push(idObj);
    } else {
      map.set(character, [idObj]);
    }
    return map;
  }, new Map<string, Id[]>());

  console.log('groups1: ', grouped);

  return [];
  // }
};
// export const offByOnePair = (ids: string[]) => {
//   const firstCharacterMap = ids.reduce(
//     (map: Map<string, string[]>, id: string) => {
//       if (ids[0].length === 0) {
//         return map;
//       }
//       const firstCharacter = id[0];
//       const backend = id.slice(1);
//       if (map.has(firstCharacter)) {
//         const strings = map.get(firstCharacter) as string[];
//         strings.push(backend);
//       } else {
//         map.set(firstCharacter, [backend]);
//       }
//       return map;
//     },
//     new Map<string, string[]>()
//   );

//   console.log(firstCharacterMap);

//   const pairsGreaterThan2 = firstCharacterMap
//     .reduce((map: Map<string, string>, ))

//   return [''];
// };

export const offByOne = (first: string, second: string) => {
  let differenceCount = 0;
  for (let index = 0; index < first.length; index++) {
    if (first[index] !== second[index]) {
      differenceCount++;
    }
    if (differenceCount > 1) {
      return false;
    }
  }
  return true;
};

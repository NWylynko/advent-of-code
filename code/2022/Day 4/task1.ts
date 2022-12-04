import { input } from "./input";

const calcSection = (elf: string) => {
  const [minString, maxString] = elf.split("-");

  const min = Number(minString);
  const max = Number(maxString);

  return { min, max };
};

export const decode = (pairs: string[]) => {
  return pairs.map((pair) => {
    const [elf1, elf2] = pair.split(",");

    const elf1Sections = calcSection(elf1);
    const elf2Sections = calcSection(elf2);

    return [elf1Sections, elf2Sections];
  });
};

export type Elf = {
  min: number;
  max: number;
};
export type ElfPairs = Elf[][];

const calcContains = (elfPairs: ElfPairs) => {
  return elfPairs.map((elves) => {
    if (elves[0].min <= elves[1].min && elves[0].max >= elves[1].max) {
      return 1;
    } else if (elves[1].min <= elves[0].min && elves[1].max >= elves[0].max) {
      return 1;
    } else {
      return 0;
    }
  });
};

const elfPairs = decode(input.split("\n"));
const contains = calcContains(elfPairs) as number[];
const score = contains.reduce((score, contains) => score + contains, 0);

console.log({ score });

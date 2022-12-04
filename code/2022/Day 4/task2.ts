import { input } from "./input";
import { decode, type ElfPairs, type Elf } from "./task1";

const getSections = (elf: Elf) => {
  const range = elf.max - elf.min + 1;
  const sections = [...Array(range).keys()].map((n) => n + elf.min);
  return sections;
};

const calcOverlaps = (elfPairs: ElfPairs) => {
  return elfPairs.map((elves) => {
    const elf1Sections = getSections(elves[0]);
    const elf2Sections = getSections(elves[1]);
    const sections = new Set(elf1Sections);

    for (const item of elf2Sections) {
      if (sections.has(item)) {
        return 1;
      }
    }

    return 0;
  });
};

const elfPairs = decode(input.split("\n"));
const overlaps = calcOverlaps(elfPairs) as number[];
const score = overlaps.reduce((score, contains) => score + contains, 0);

console.log({ score });

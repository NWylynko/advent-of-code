import { input } from "./input";

const decode = (rucksacks: string[]) => {
  return rucksacks.map((rucksack) => {
    const rucksackLength = rucksack.length / 2;

    const firstRuckSack = rucksack.slice(0, rucksackLength);
    const secondRuckStack = rucksack.slice(rucksackLength, rucksack.length);

    return [firstRuckSack, secondRuckStack];
  });
};

const findOverlaps = (rucksacks: string[][]) => {
  return rucksacks.map((rucksack) => {
    for (const item of rucksack[0]) {
      if (rucksack[1].includes(item)) {
        return item;
      }
    }
    throw new Error(`cound't find overlap`);
  });
};

const priorities = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,

  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

export const calcPriority = (overlappers: string[]): number[] => {
  return overlappers.map((overlap) => priorities[overlap]);
};

const rucksacks = decode(input.split("\n"));
const overlappedItems = findOverlaps(rucksacks);
const overlappedPriorities = calcPriority(overlappedItems);
const score = overlappedPriorities.reduce((score, priority) => score + priority, 0);

console.log(score);

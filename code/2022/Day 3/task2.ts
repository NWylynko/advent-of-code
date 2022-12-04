import { input } from "./input";
import { calcPriority } from "./task1";

const decode = (rucksacks: string[]) => {
  return rucksacks.reduce<string[][]>((groups, rucksack, index) => {
    const num = index % 3;

    if (num === 0) {
      groups.push([rucksack]);
    } else {
      const group = groups.pop();
      if (!group) {
        throw new Error("group not found :/");
      }
      group?.push(rucksack);
      groups.push(group);
    }

    return groups;
  }, []);
};

const findOverlapping = (groups: string[][]): string[] => {
  return groups.map((group) => {
    const rucksacks = [new Set(group[0].split("")), new Set(group[1].split("")), new Set(group[2].split(""))];

    const overlaps = new Set<string>();

    for (const item of group[0]) {
      if (rucksacks[1].has(item)) {
        overlaps.add(item);
      }
      if (rucksacks[2].has(item)) {
        overlaps.add(item);
      }
    }

    const secondOverlaps = new Set<string>();

    for (const item of group[1]) {
      if (overlaps.has(item)) {
        secondOverlaps.add(item);
      }
    }

    const thirdOverlaps = new Set<string>();

    for (const item of group[2]) {
      if (secondOverlaps.has(item)) {
        thirdOverlaps.add(item);
      }
    }

    const items = [...thirdOverlaps.keys()];

    if (items.length > 1) {
      throw new Error(`multiple items found: ${items} `);
    }

    return items[0];
  });
};

const rucksacks = decode(input.split("\n"));
const badges = findOverlapping(rucksacks);
const badgePriority = calcPriority(badges);
const score = badgePriority.reduce((score, priority) => score + priority, 0);

console.log(score);

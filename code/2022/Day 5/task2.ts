import { input } from "./input";
import { decode, calcTopCrates, type Crates, type Procedures } from "./task1";

const processCrates = (crates: Crates, procedures: Procedures) => {
  for (const procedure of procedures) {
    const { move, from, to } = procedure;

    const movedCrates = crates[from].splice(crates[from].length - move, crates[from].length);

    crates[to] = [...crates[to], ...movedCrates];
  }
  return crates;
};

const { crates, procedures, num } = decode(input);
const processedCrates = processCrates(crates, procedures);
const topCrates = calcTopCrates(processedCrates, num);

console.log({ topCrates });

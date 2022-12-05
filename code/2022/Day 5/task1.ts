import { input } from "./input";

export const decode = (input: string) => {
  const [crates, procedure] = input.split("\n\n");

  const crateRows = crates.split("\n");
  crateRows.shift(); // remove the first new line
  const crateTitle = crateRows.pop()?.trim();
  if (!crateTitle) {
    throw new Error();
  }
  const cratesNum = Number(crateTitle[crateTitle?.length - 1]);

  const parsedCrateRows = crateRows.map((row) => {
    const crates = row.match(/.{1,4}/g)?.map((crate) => {
      if (crate === "    ") {
        return undefined;
      } else {
        return crate.trim().replace("]", "").replace("[", "");
      }
    });

    return crates;
  }) as (string | undefined)[][];

  const parsedCrates: { [key: number]: string[] } = {};

  for (let i = 0; i < cratesNum; i++) {
    let crates: string[] = [];
    for (let j = crateRows.length - 1; j >= 0; j--) {
      const crate = parsedCrateRows[j][i];
      if (crate) {
        crates.push(crate);
      }
    }
    parsedCrates[i + 1] = crates.filter((crate) => crate !== "." && crate !== undefined);
  }

  const procedures = procedure.split("\n");

  const parsedProcedures = procedures.map((procedure) => {
    const [, move, , from, , to] = procedure.split(" ");

    return {
      move: Number(move),
      from: Number(from),
      to: Number(to),
    };
  });

  return { crates: parsedCrates, procedures: parsedProcedures, num: cratesNum };
};

export type Crates = ReturnType<typeof decode>["crates"];
export type CrateStack = Crates[number];
export type Crate = CrateStack[number];

export type Procedures = ReturnType<typeof decode>["procedures"];
export type Procedure = Procedures[number];

const processCrates = (crates: Crates, procedures: Procedures) => {
  for (const procedure of procedures) {
    const { move, from, to } = procedure;

    for (let index = 0; index < move; index++) {
      const crate = crates[from].pop();

      if (!crate) {
        throw new Error("no crate to pop off the stack");
      }

      crates[to].push(crate);
    }
  }
  return crates;
};

export const calcTopCrates = (crates: Crates, num: number) => {
  let str = "";
  for (let i = 1; i <= num; i++) {
    const crate = crates[i].pop();
    str += crate;
  }
  return str;
};

const { crates, procedures, num } = decode(input);
const processedCrates = processCrates(crates, procedures);
const topCrates = calcTopCrates(processedCrates, num);

console.log({ topCrates });

import { elvisItems } from "./task1";

const sortedItems = elvisItems.sort((n1, n2) => n1 - n2);
const itemsN = sortedItems.length - 1;

let total = 0;

for (let i = itemsN; i > itemsN - 3; i--) {
  total += sortedItems[i];
}

console.log("Top 3 summed", total);

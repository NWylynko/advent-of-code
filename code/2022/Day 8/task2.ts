// import { input } from "./input"

import { mapOverGrid } from "./mapOverGrid";
import { decode, calcVisibleTrees } from "./task1"

const input = `30373
25512
65332
33549
35390`;

// 00000
// 00010
// 00100
// 01010
// 00000

const calcView = (grid: number[][]): number[][] => {
  return mapOverGrid(grid, (treeHeight, index, _, dimensions) => {

    const visibility = [
      (() => { // up
        let num = 0;
        for (let upRowIndex = index.row - 1; upRowIndex >= dimensions.height.start; upRowIndex--) {

          const theirTreeHeight = grid[upRowIndex][index.col]
          const theyAreShorterThanUs = treeHeight >= theirTreeHeight

          if (theyAreShorterThanUs) {
            num++;
          } else {
            return num
          }

        }
        return num
      })(),
      (() => { // down
        let num = 0;
        for (let downRowIndex = index.row + 1; downRowIndex <= dimensions.height.end; downRowIndex++) {

          const theirTreeHeight = grid[downRowIndex][index.col]
          const theyAreShorterThanUs = treeHeight >= theirTreeHeight

          if (theyAreShorterThanUs) {
            num++;
          } else {
            return num
          }

        }
        return num
      })(),
      (() => { // left
        let num = 0;
        for (let leftColIndex = index.col - 1; leftColIndex >= dimensions.width.start; leftColIndex--) {

          const theirTreeHeight = grid[index.row][leftColIndex]
          const theyAreShorterThanUs = treeHeight >= theirTreeHeight

          if (theyAreShorterThanUs) {
            num++;
          } else {
            return num
          }

        }
        return num
      })(),
      (() => { // right
        let num = 0;
        for (let rightColIndex = index.col + 1; rightColIndex <= dimensions.width.end; rightColIndex++) {

          const theirTreeHeight = grid[index.row][rightColIndex]
          const theyAreShorterThanUs = treeHeight >= theirTreeHeight

          if (theyAreShorterThanUs) {
            num++;
          } else {
            return num
          }

        }
        return num
      })(),
    ];

    const totalVisibility = visibility.reduce((score, visibility) => score + visibility, 0)

    return totalVisibility
  })

};

const countVisibleTrees = (grid: boolean[][]) => {
  let numVisibleTrees = 0

  mapOverGrid(grid, (item) => {
    if (item === true) {
      numVisibleTrees++;
    }
  })

  return numVisibleTrees
}

const treeGrid = decode(input);
const treeView = calcView(treeGrid);
// const visibleTreesCount = countVisibleTrees(visibleTreeGrid)

console.log(treeView);
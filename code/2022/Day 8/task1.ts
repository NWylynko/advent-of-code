// import { input } from "./input"

import { mapOverGrid } from "./mapOverGrid";

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

export const decode = (input: string) => {
  const rows = input.split("\n");
  const grid = rows.map((row) => [-1, ...row.split("").map(Number), -1])

  const columnsLength = grid[0].length

  const spaceGrid = [
    [...[...Array(columnsLength).keys()].map(() => -1)],
    ...grid,
    [...[...Array(columnsLength).keys()].map(() => -1)]
  ]

  return spaceGrid;
};

export const calcVisibleTrees = (grid: number[][]): boolean[][] => {
  return mapOverGrid(grid, (treeHeight, index, _, dimensions) => {
    const visibleDirections = [
      (() => { // up
        for (let upRowIndex = index.row - 1; upRowIndex >= dimensions.height.start; upRowIndex--) {

          const theirTreeHeight = grid[upRowIndex][index.col]
          const theyAreTallerThanUs = treeHeight <= theirTreeHeight

          if (theyAreTallerThanUs) {
            return false
          }

        }
        return true
      })(),
      (() => { // down
        for (let downRowIndex = index.row + 1; downRowIndex <= dimensions.height.end; downRowIndex++) {

          const theirTreeHeight = grid[downRowIndex][index.col]
          const theyAreTallerThanUs = treeHeight <= theirTreeHeight

          if (theyAreTallerThanUs) {
            return false
          }

        }
        return true
      })(),
      (() => { // left
        for (let leftColIndex = index.col - 1; leftColIndex >= dimensions.width.start; leftColIndex--) {

          const theirTreeHeight = grid[index.row][leftColIndex]
          const theyAreTallerThanUs = treeHeight <= theirTreeHeight

          if (theyAreTallerThanUs) {
            return false
          }

        }
        return true
      })(),
      (() => { // right
        for (let rightColIndex = index.col + 1; rightColIndex <= dimensions.width.end; rightColIndex++) {

          const theirTreeHeight = grid[index.row][rightColIndex]
          const theyAreTallerThanUs = treeHeight <= theirTreeHeight

          if (theyAreTallerThanUs) {
            return false
          }

        }
        return true
      })(),
    ];

    const isVisible = visibleDirections.reduce((canBeSee, isVisible) => {
      if (isVisible) {
        return true
      }
      return canBeSee
    }, false)

    return isVisible
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
const visibleTreeGrid = calcVisibleTrees(treeGrid);
const visibleTreesCount = countVisibleTrees(visibleTreeGrid)

console.log(visibleTreesCount);
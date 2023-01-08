export const mapOverGrid = <
  Grid extends (string | number | boolean | object | undefined)[][],
  ReturnGrid extends (string | number | boolean | object | undefined)[][],
  GridItem extends Grid[number][number] = Grid[number][number],
  ReturnGridItem extends ReturnGrid[number][number] = ReturnGrid[number][number],
>(grid: Grid, fn: (item: GridItem, index: { row: number, col: number }, grid: Grid, dimensions: { width: { start: number, end: number }, height: { start: number, end: number } }) => ReturnGridItem | void): ReturnGrid => {

  const newGrid = Array(grid.length).fill(undefined).map(() => Array(grid[0].length).fill(undefined)) as ReturnGrid

  const widthStart = 1;
  const widthEnd = grid.length - 1;

  for (let rowIndex = widthStart; rowIndex < widthEnd; rowIndex++) {

    const heightStart = 1;
    const heightEnd = grid[rowIndex].length - 1;

    for (let colIndex = heightStart; colIndex < heightEnd; colIndex++) {

      const item = grid[rowIndex][colIndex] as GridItem;

      const result = fn(item, {
        row: rowIndex,
        col: colIndex
      }, grid, {
        width: {
          start: widthStart,
          end: widthEnd
        },
        height: {
          start: heightStart,
          end: heightEnd
        }
      });

      if (result !== undefined) {
        newGrid[rowIndex][colIndex] = result
      }
    }
  }

  return newGrid
};

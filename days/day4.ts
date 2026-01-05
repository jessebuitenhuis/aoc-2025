import { readLines, Grid } from "../utils";

const example = await readLines("example4");
const input = await readLines("input4");
solveA(example);
solveA(input);

function solveA(input: string[]) {
  const grid = new Grid(input);
  let count = 0;

  for (let { x, y, value } of grid.entries()) {
    if (value !== "@") continue;
    if (isAccessible(grid, x, y)) count++;
  }

  console.log(count);
  return count;
}

function isAccessible(grid: Grid, x: number, y: number): boolean {
  let count = 0;

  for (let { value } of grid.adjacentEntries({ x, y })) {
    if (value === "@") count++;
    if (count >= 4) return false;
  }

  return true;
}

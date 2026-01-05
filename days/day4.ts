import { readLines, Grid, Coord } from "../utils";

const example = await readLines("example4");
const input = await readLines("input4");
solveA(example);
solveA(input);
solveB(example);
solveB(input);

function solveA(input: string[]) {
  const grid = new Grid(input);
  let count = 0;

  for (let entry of grid.entries()) {
    if (entry.value !== "@") continue;
    if (isAccessible(grid, entry)) count++;
  }

  console.log(count);
  return count;
}

function solveB(input: string[]) {
  const grid = new Grid(input);
  let totalRemoved = 0;

  while (true) {
    let removedCount = 0;

    for (let entry of grid.entries()) {
      if (entry.value !== "@") continue;
      if (isAccessible(grid, entry)) {
        removedCount++;
        grid.setValue(entry, "x");
      }
    }

    if (removedCount === 0) break;
    totalRemoved += removedCount;
  }

  console.log(totalRemoved);
  return totalRemoved;
}

function isAccessible(grid: Grid, { x, y }: Coord): boolean {
  let count = 0;

  for (let { value } of grid.adjacentEntries({ x, y })) {
    if (value === "@") count++;
    if (count >= 4) return false;
  }

  return true;
}

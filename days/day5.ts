import { countIf, orderBy, readInput, readLines } from "../utils";

await solveA("example5");
await solveA("input5");
await solveB("example5");
await solveB("input5");

async function solveA(path: string) {
  const { ranges, ingredients } = await readPuzzleInput(path);
  const count = countIf(ingredients, (x) => isFresh(x, ranges));
  console.log(count);
}

type Range = [start: number, end: number];

async function solveB(path: string) {
  const { ranges } = await readPuzzleInput(path);

  const sortedRanges = orderBy(ranges, ([start]) => start);
  let count = 0;
  let max = 0;

  for (let [start, end] of sortedRanges) {
    start = Math.max(start, max + 1);
    if (end > max) {
      const size = Math.max(0, end - start + 1);
      count += size;
      max = end;
    }
  }

  console.log(count);
}

function isFresh(id: number, ranges: Range[]) {
  for (let [start, end] of ranges) {
    if (id >= start && id <= end) {
      return true;
    }
  }
  return false;
}

async function readPuzzleInput(path: string) {
  const input = await readInput(path);
  const [fresh, ingredients] = input.split("\n\n").map((x) => x.split("\n"));
  return {
    ranges: fresh.map((x) =>
      x.split("-").map((y) => parseInt(y, 10)),
    ) as Range[],
    ingredients: ingredients.map((i) => parseInt(i, 10)),
  };
}

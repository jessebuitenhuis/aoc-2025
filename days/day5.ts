import { readInput, readLines } from "../utils";

await solveA("example5");
await solveA("input5");
await solveB("example5");
await solveB("input5");

async function solveA(path: string) {
  const { ranges, ingredients } = await readPuzzleInput(path);

  let count = 0;

  for (let ingredient of ingredients) {
    if (isFresh(ingredient, ranges)) count++;
  }

  console.log(count);
  return count;
}

type Range = [start: number, end: number];

async function solveB(path: string) {
  const { ranges, ingredients } = await readPuzzleInput(path);

  const sortedRanges = ranges.sort(([aStart], [bStart]) => aStart - bStart);
  let count = 0;

  for (let i = 0; i < sortedRanges.length; i++) {
    const current = sortedRanges[i];
    const size = Math.max(0, current[1] - current[0] + 1);
    count += size;
    const rest = sortedRanges.slice(i + 1);
    moveOverlappingRanges(current, rest);
  }

  console.log(sortedRanges);
  console.log(count);
}

function moveOverlappingRanges(range: Range, ranges: Range[]): void {
  for (let other of ranges) {
    if (isOverlapping(range, other)) {
      other[0] = range[1] + 1;
    } else {
      break;
    }
  }
}

function isOverlapping([aStart, aEnd]: Range, [bStart, bEnd]: Range): boolean {
  return bStart >= aStart && bStart <= aEnd;
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

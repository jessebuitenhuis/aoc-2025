import { readInput, readLines } from "../utils";

await solveA("example5");
await solveA("input5");

async function solveA(path: string) {
  const { ranges, ingredients } = await readPuzzleInput(path);

  let count = 0;

  for (let ingredient of ingredients) {
    if (isFresh(ingredient, ranges)) count++;
  }

  console.log(count);
  return count;
}

function isFresh(id: number, ranges: number[][]) {
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
    ranges: fresh.map((x) => x.split("-").map((y) => parseInt(y, 10))),
    ingredients: ingredients.map((i) => parseInt(i, 10)),
  };
}

import { Coord, readAllLines } from "../utils";

const { example, input: originalInput } = await readAllLines(7);
solveA(example);
solveA(originalInput);
solveB(example);
solveB(originalInput);

function solveA(input: string[]) {
  let beams = new Set([input[0].indexOf("S")]);
  let splits = 0;

  for (let y = 1; y < input.length; y++) {
    const newBeams = new Set<number>();

    for (let x of beams) {
      if (isSplitter(input[y][x])) {
        newBeams.add(x - 1);
        newBeams.add(x + 1);
        splits++;
      } else {
        newBeams.add(x);
      }
    }

    beams = newBeams;
  }

  console.log(splits);
}

function solveB(input: string[]) {
  const cache = new Map<string, number>();
  const x = input[0].indexOf("S");
  const timelines = countTimelines(input, x, 1, cache);
  console.log(timelines);
  return timelines;
}

function countTimelines(
  grid: string[],
  x: number,
  y: number,
  cache: Map<string, number>,
): number {
  const cached = cache.get(`${x}-${y}`);
  if (cached) return cached;

  const value = grid[y]?.[x];
  if (value === undefined) return 1;

  if (isSplitter(value)) {
    const timelinesA = countTimelines(grid, x - 1, y + 1, cache);
    const timelinesB = countTimelines(grid, x + 1, y + 1, cache);
    const result = timelinesA + timelinesB;
    cache.set(`${x}-${y}`, result);
    return result;
  }

  const result = countTimelines(grid, x, y + 1, cache);
  cache.set(`${x}-${y}`, result);
  return result;
}

function isSplitter(char: string) {
  return char === "^";
}

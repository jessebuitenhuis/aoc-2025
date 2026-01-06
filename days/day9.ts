import {
  Coord,
  CoordArr,
  getAllCombinations,
  readAllLines,
  toNumber,
  toNumbers,
} from "../utils";

const { example, input } = await readAllLines(9);

solveA(example);
solveA(input);

function solveA(inp: string[]) {
  const coords = inp.map((x) => toNumbers(x, ",")) as CoordArr[];
  let max = 0;
  for (let [[aX, aY], [bX, bY]] of getAllCombinations(coords)) {
    const width = Math.abs(bX - aX) + 1;
    const height = Math.abs(bY - aY) + 1;
    const area = width * height;
    if (area > max) max = area;
  }
  console.log(max);
}

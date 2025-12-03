import { readInput } from "../utils";

const input = (await readInput("input2.txt"))
  .split(",")
  .map((x) => x.split("-"));

run();

function run() {
  const total2 = sum(input.map((x) => getInvalidSum(x[0], x[1])));
  console.log(total2);
}

function getInvalidSum(start: string, end: string): number {
  let sum = 0;
  const patternLength = Math.ceil(start.length / 2);
  const startNumber = parseInt(start);
  const endNumber = parseInt(end);

  let x = isEven(start.length)
    ? parseInt(start.slice(0, patternLength))
    : Math.pow(10, patternLength - 1);

  while (true) {
    const id = parseInt(`${x}${x}`);
    if (id > endNumber) break;

    if (id >= startNumber) {
      sum += id;
    }

    x += 1;
  }

  return sum;
}

function isEven(input: number) {
  return input / 2 === Math.round(input / 2);
}

function sum(input: number[], start: number = 0): number {
  return input.reduce((sum, cur) => sum + cur, start);
}

import { mod, readLines } from "../utils";

const puzzleInput = await readLines("example1.txt");

function run(input: string[], cur = 50) {
  let zeroCount = 0;
  let zeroClickCount = 0;

  for (let line of input) {
    const direction = line.slice(0, 1);
    const distance = parseInt(line.slice(1));

    switch (direction) {
      case "L":
        const locL = cur - distance;

        const actual = Math.abs(cur > 0 ? locL - 100 : locL);
        zeroClickCount += Math.floor(actual / 100);
        cur = mod(locL, 100);

        break;
      case "R":
        const locR = cur + distance;
        zeroClickCount += Math.floor(locR / 100);
        cur = locR % 100;
        break;
      default:
        throw new Error("out of bounds");
    }

    if (cur === 0) {
      zeroCount++;
    }
  }

  return [zeroCount, zeroClickCount, cur];
}

const zeroCount = run(puzzleInput);
console.log(zeroCount);

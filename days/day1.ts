import { readLines } from "../utils";

const input = await readLines("input1.txt");

function run() {
  let cur = 50;
  let zeroCount = 0;

  for (let line of input) {
    const direction = line.slice(0, 1);
    const distance = parseInt(line.slice(1)) % 100;

    if (direction == "L") {
      cur -= distance;

      if (cur < 0) {
        cur += 100;
      }
    } else if (direction == "R") {
      cur += distance;

      if (cur > 99) {
        cur -= 100;
      }
    } else {
      throw new Error("Direction out of bounds");
    }

    if (cur === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

const zeroCount = run();
console.log(zeroCount);

import { readAllLines } from "../utils";

const { example, input } = await readAllLines(7);
solveA(example);
solveA(input);

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

function isSplitter(char: string) {
  return char === "^";
}

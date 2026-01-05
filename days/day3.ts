import { readLines, sum, toNumbers } from "../utils";

function findLargestJoltage(bank: string, count = 2) {
  const numbers = toNumbers(bank);

  let start = 0;
  let output = "";

  for (let i = 0; i < count; i++) {
    const end = -1 * count + i + 1;
    const slice = numbers.slice(start, end === 0 ? undefined : end);
    const largest = Math.max(...slice);
    const largestIndex = slice.indexOf(largest);

    output += largest;
    start = start + largestIndex + 1;
  }

  return parseInt(output);
}

function solveA(input: string[]) {
  const joltages = input.map((x) => findLargestJoltage(x));
  return sum(joltages);
}

function solveB(input: string[]) {
  const joltages = input.map((x) => findLargestJoltage(x, 12));
  return sum(joltages);
}

const example = await readLines("example3");
const answerExampleA = solveA(example);
const answerExampleB = solveB(example);

const input = await readLines("input3");
const answerA = solveA(input);
const answerB = solveB(input);

console.log("Example A:", answerExampleA);
console.log("Example B:", answerExampleB);
console.log("A:", answerA);
console.log("B:", answerB);

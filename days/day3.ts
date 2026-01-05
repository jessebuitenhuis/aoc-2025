import { readLines, sum, toNumbers } from "../utils";

function findLargestJoltage(bank: string) {
  const numbers = toNumbers(bank);

  const largest = Math.max(...numbers.slice(0, -1));
  const largestIndex = numbers.indexOf(largest);

  const largest2 = Math.max(...numbers.slice(largestIndex + 1));

  return parseInt(`${largest}${largest2}`);
}

function solveA(input: string[]) {
  const joltages = input.map(findLargestJoltage);
  return sum(joltages);
}

const exampleA = await readLines("example3");
const answerExampleA = solveA(exampleA);

const inputA = await readLines("input3");
const answerA = solveA(inputA);

console.log("Example A:", answerExampleA);
console.log("A:", answerA);

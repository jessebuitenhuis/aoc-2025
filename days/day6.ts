import {
  algebra,
  multiply,
  readAllLines,
  readLines,
  sum,
  sumBy,
  toNumber,
} from "../utils";

const { example, input } = await readAllLines(6);
solveA(example);
solveA(input);

function solveA(input: string[]) {
  const problems = parseInput(input);
  const sum = sumBy(problems, solveProblem);
  console.log(sum);
}

function solveProblem(input: string[]) {
  const operator = input.pop();
  const digits = input.map(toNumber);

  if (!operator) throw new Error("Operator not found.");
  return algebra(operator, digits);
}

function parseInput(input: string[]) {
  const parsed = input.map((line) => line.trim().split(/\s+/));
  return parsed[0].map((_, i) => parsed.map((y) => y[i]));
}

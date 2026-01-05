import { algebra, readAllLines, sumBy, toNumber } from "../utils";

const { example, input } = await readAllLines(6);
solveA(example);
solveA(input);
solveB(example);
solveB(input);

function solveA(input: string[]) {
  const problems = parseInput(input);
  const sum = sumBy(problems, solveProblem);
  console.log(sum);
}

function solveB(input: string[]) {
  let sum = 0;
  for (let problem of getProblems(input)) {
    sum += algebra(problem.operator, problem.digits);
  }

  console.log(sum);
}

function solveProblem(input: string[]) {
  const operator = input.pop();
  const digits = input.map(toNumber);

  if (!operator) throw new Error(`Operator ${operator} not found.`);
  return algebra(operator, digits);
}

function parseInput(input: string[]) {
  const parsed = input.map((line) => line.trim().split(/\s+/));
  return parsed[0].map((_, i) => parsed.map((y) => y[i]));
}

function* getProblems(input: string[]) {
  let digits: number[] = [];
  let operator = "";
  let x = 0;

  while (true) {
    const chars = input.map((line) => line[x]);
    const operatorChar = chars.pop() ?? " ";
    if (operatorChar !== " ") operator = operatorChar;
    const digitChars = chars.join("").trim();
    if (digitChars.length === 0) {
      yield { digits, operator };
      digits = [];
    } else {
      const digit = toNumber(digitChars);
      digits.push(digit);
    }

    if (chars.every((x) => x === undefined)) break;
    x++;
  }
}

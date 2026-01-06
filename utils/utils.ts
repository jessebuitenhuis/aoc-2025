export async function readInput(file: string) {
  const path = ensureExtension(file);
  return Bun.file(`./input/${path}`).text();
}

export async function readLines(file: string) {
  const input = await readInput(file);
  return input.split("\n");
}

export async function readAllLines(day: number) {
  return {
    example: await readLines(`example${day}`),
    input: await readLines(`input${day}`),
  };
}

export function mod(input: number, n: number): number {
  return ((input % n) + n) % n;
}

export function toNumber(input: string): number {
  return parseInt(input, 10);
}

export function toNumbers(input: string): number[] {
  return input.split("").map((x) => parseInt(x, 10));
}

export function sum(input: number[]) {
  return sumBy(input, (x) => x);
}

export function multiply(input: number[]) {
  return input.reduce((acc, cur) => acc * cur);
}

export function algebra(operation: string, digits: number[]) {
  const _op = algebraOp(operation);
  return _op(digits);
}

export function algebraOp(operation: string) {
  switch (operation) {
    case "*":
      return multiply;
    case "+":
      return sum;
    default:
      throw new Error(`Operation ${operation} not supported.`);
  }
}

export function sumBy<T>(input: T[], sumFn: (item: T) => number) {
  return input.reduce((total, cur) => total + sumFn(cur), 0);
}

export function countIf<T>(input: T[], predicate: (x: T) => boolean) {
  return input.reduce((total, cur) => total + (predicate(cur) ? 1 : 0), 0);
}

export function orderBy<T>(list: T[], predicate: (x: T) => number) {
  return [...list].sort((a, b) => predicate(a) - predicate(b));
}

function ensureExtension(path: string): string {
  if (path.indexOf(".") < 0) return `${path}.txt`;
  return path;
}

export function euclidianDistance(a: number[], b: number[]) {
  if (a.length !== b.length) {
    throw new Error(
      "Points should be described in the same dimensional space.",
    );
  }

  return Math.sqrt(
    a.reduce((acc, cur, index) => acc + Math.pow(cur - b[index], 2), 0),
  );
}

export function* getAllCombinations<T>(list: T[]) {
  for (let a = 0; a < list.length - 1; a++) {
    for (let b = a + 1; b < list.length; b++) {
      yield [list[a], list[b]] as [T, T];
    }
  }
}

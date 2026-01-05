export async function readInput(file: string) {
  const path = ensureExtension(file);
  return Bun.file(`./input/${path}`).text();
}

export async function readLines(file: string) {
  const input = await readInput(file);
  return input.split("\n");
}

export function mod(input: number, n: number): number {
  return ((input % n) + n) % n;
}

export function toNumbers(input: string): number[] {
  return input.split("").map((x) => parseInt(x, 10));
}

export function sum(input: number[]) {
  return input.reduce((total, cur) => total + cur, 0);
}

function ensureExtension(path: string): string {
  if (path.indexOf(".") < 0) return `${path}.txt`;
  return path;
}

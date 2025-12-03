export async function readInput(file: string) {
  return Bun.file(`./input/${file}`).text();
}

export async function readLines(file: string) {
  const input = await readInput(file);
  return input.split("\n");
}

export function mod(input: number, n: number): number {
  return ((input % n) + n) % n;
}

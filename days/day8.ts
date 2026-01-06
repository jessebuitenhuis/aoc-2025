import {
  readAllLines,
  euclidianDistance,
  orderBy,
  toNumber,
  getAllCombinations,
  multiply,
  mergeSets,
  addMultiple,
} from "../utils";

const { example, input } = await readAllLines(8);
solve(example, 10);
solve(input, 1000);
solveB(example);
solveB(input);

function solve(inp: string[], connectionCount: number) {
  const sorted = getSorted(inp);
  const connections = sorted.slice(0, connectionCount);
  const circuits = new Set<Set<number[]>>();

  for (let connection of connections) {
    addConnection(circuits, connection);
  }

  const sizes = [...circuits]
    .map((x) => x.size)
    .sort((a, b) => b - a)
    .slice(0, 3);

  console.log(multiply(sizes));
  console.log(sizes);
}

function solveB(inp: string[]) {
  const [a, b] = getFinalConnection(inp);
  const distance = a[0] * b[0];
  console.log(a, b);
  console.log(distance);
}

function getFinalConnection(inp: string[]): [number[], number[]] {
  const sorted = getSorted(inp);
  const circuits = new Set<Set<number[]>>();

  for (let connection of sorted) {
    addConnection(circuits, connection);

    if (circuits.size === 1 && [...circuits][0].size === inp.length) {
      return connection;
    }
  }

  throw new Error("No answer found");
}

function getSorted(inp: string[]) {
  const parsed = inp.map((x) => x.split(",").map(toNumber));
  const combinations = Array.from(getAllCombinations(parsed));
  return orderBy(combinations, (x) => euclidianDistance(x[0], x[1]));
}

function addConnection(
  circuits: Set<Set<number[]>>,
  [a, b]: [number[], number[]],
) {
  const existing = [...circuits].filter((x) => x.has(a) || x.has(b));
  let circuit: Set<number[]>;

  if (existing.length === 0) {
    circuit = new Set<number[]>();
    circuits.add(circuit);
  } else {
    circuit = existing[0];
  }

  if (existing.length === 2) {
    mergeSets(existing[0], existing[1]);
    circuits.delete(existing[1]);
  }

  addMultiple(circuit, a, b);
}

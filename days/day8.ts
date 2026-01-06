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
//
//
//
//

function solve(inp: string[], connectionCount: number) {
  const parsed = inp.map((x) => x.split(",").map(toNumber));
  const combinations = Array.from(getAllCombinations(parsed));
  const sorted = orderBy(combinations, (x) => euclidianDistance(x[0], x[1]));
  const connections = sorted.slice(0, connectionCount);
  let circuits = new Set<Set<number[]>>();

  for (let [a, b] of connections) {
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

  const sizes = [...circuits]
    .map((x) => x.size)
    .sort((a, b) => b - a)
    .slice(0, 3);

  console.log(multiply(sizes));
  // console.log(sorted);
  console.log(sizes);
}

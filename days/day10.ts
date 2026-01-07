import { last, readAllLines, sum, toNumber, toNumbers } from "../utils";

const { example, input } = await readAllLines(10);

solveA(input);

function solveA(inp: string[]) {
  const parsed = parseInput(inp);

  const result = sum(
    parsed.map((x) => getMiniumRequiredPresses(x.indicator, x.buttons)),
  );

  console.log(result);
}

function getMiniumRequiredPresses(target: number, buttons: number[]): number {
  let count = 0;
  const states = new Set<number>([0]);
  const seen = new Set<number>();

  while (true) {
    const curStates = [...states];
    states.clear();

    for (const state of applyButtons(curStates, buttons)) {
      if (state === target) return count + 1;
      if (seen.has(state)) {
        continue;
      }
      states.add(state);
      seen.add(state);
    }

    count++;
  }
}

function* applyButtons(states: number[], buttons: number[]) {
  for (const state of states) {
    for (const button of buttons) {
      const newState = state ^ button;
      yield newState;
    }
  }
}

function parseInput(inp: string[]) {
  return inp.map((line) => {
    const indicator = line
      .match(/\[([^\]]+)\]/)![1]
      .replace(/\./g, "0")
      .replace(/#/g, "1");

    const buttons = parseButtons(line, indicator.length);
    const joltage = line
      .match(/\{([^}]+)\}/)![1]
      .split(",")
      .map(toNumber);

    return {
      indicator: parseInt(indicator, 2),
      buttons,
      joltage,
    };
  });
}

function parseButtons(line: string, length: number) {
  return [...line.matchAll(/\(([^)]+)\)/g)].map((m) => {
    const indices = m[1].split(",").map(toNumber);

    const buttonString = new Array(length)
      .fill("")
      .map((x, i) => {
        return indices.indexOf(i) > -1 ? "1" : "0";
      })
      .join("");

    return parseInt(buttonString, 2);
  });
}

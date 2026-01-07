import { readAllLines, sum, toNumber, toNumbers } from "../utils";

const { example, input } = await readAllLines(10);

solveA(input);

function solveA(inp: string[]) {
  const parsed = parseInput(inp);

  const result = sum(
    parsed.map((x) => getMiniumRequiredPresses(x.indicator, x.buttons)),
  );

  console.log(result);
}

function getMiniumRequiredPresses(target: string, buttons: number[][]): number {
  const targetIndices = indexesOf(target, "#");
  const buttonsInScope = buttons.filter(
    (button) =>
      button.find((key) => targetIndices.indexOf(key) > -1) !== undefined,
  );

  let count = 0;
  const initialState = new Array(target.length + 1).join(".");
  let states: string[] = [initialState];

  while (true) {
    const newStates: string[] = [];

    for (const { state, button, newState } of applyButtons(
      states,
      buttons,
      count,
    )) {
      if (newState === target) {
        console.log({ state, button, newState });
        return count + 1;
      }

      newStates.push(newState);
    }

    states = newStates;

    count++;
  }
}

function* applyButtons(states: string[], buttons: number[][], count: number) {
  for (const state of states) {
    for (const button of buttons) {
      const newState = applyButton(state, button);
      // console.log(state, button, newState, count);
      yield { state, button, newState };
    }
  }
}

function applyButton(state: string, button: number[]) {
  let output = "";

  for (let i = 0; i < state.length; i++) {
    const cur = state[i];
    if (button.indexOf(i) < 0) {
      output += cur;
    } else {
      output += cur === "#" ? "." : "#";
    }
  }

  return output;
}

// function buttonLoop(
//   states: string[],
//   target: string[],
//   buttons: number[][],
// ): string[] {
//   for (const state in states) {
//   }
// }

// function pressButton(target: string, buttons: number[][], state: string) {}

function parseInput(inp: string[]) {
  return inp.map((line) => {
    const indicator = line.match(/\[([^\]]+)\]/)![1];
    const buttons = [...line.matchAll(/\(([^)]+)\)/g)].map((m) =>
      m[1].split(",").map(toNumber),
    );
    const joltage = line
      .match(/\{([^}]+)\}/)![1]
      .split(",")
      .map(toNumber);

    return {
      indicator,
      buttons,
      joltage,
    };
  });
}

function indexesOf(input: string, search: string): number[] {
  const output: number[] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === search) output.push(i);
  }

  return output;
}

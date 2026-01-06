import {
  Coord,
  CoordArr,
  getAllCombinations,
  Line,
  orderBy,
  pairwise,
  readAllLines,
  toNumber,
  toNumbers,
} from "../utils";

const { example, input } = await readAllLines(9);

// solveA(example);
// solveA(input);
// solveB(example);
solveB(input);

// 4395805670 too high

function solveA(inp: string[]) {
  const coords = parse(inp);
  let max = 0;
  for (let square of getAllCombinations(coords)) {
    const area = getSquareArea(square);
    if (area > max) max = area;
  }
  console.log(max);
}

class PointCache {
  private _map = new Map<string, boolean>();

  set(coord: CoordArr, valid: boolean) {
    this._map.set(this._getKey(coord), valid);
  }

  get(coord: CoordArr) {
    return this._map.get(this._getKey(coord));
  }

  private _getKey(coord: CoordArr) {
    return coord.join("-");
  }
}

function solveB(inp: string[]) {
  const coords = parse(inp);
  const lines = toLines(coords);
  let max = 0;
  const cache = new PointCache();

  const combinations = orderBy(
    Array.from(getAllCombinations(coords)),
    (x) => getSquareArea(x),
    true,
  );

  let i = combinations.length;

  for (let square of combinations) {
    // if (getSquareArea(square) !== 4395805670) {
    //   continue;
    // }
    // console.log(square);
    // console.log(getSquareArea(square));
    if (squareIsValid(square, lines, cache)) {
      max = getSquareArea(square);
      break;
    }

    console.log(i--);
  }

  console.log("max", max);

  // check if all edges are green/red
  // check if all points on the edges are on a line, or on all sides between one
}

function squareIsValid(
  [a, b]: [CoordArr, CoordArr],
  lines: Line[],
  cache: PointCache,
) {
  for (let [start, end] of getEdges(a, b)) {
    // find edgeparts that overlap with lines and remove those
    log("squareIsValid", start, end);
    for (let point of getPoints(start, end)) {
      log("point", point);
      const valid = pointIsValid(point, lines, cache);
      log("valid", valid);
      if (!valid) return false;
    }
  }

  return true;
}

function edgeIsFullyOnLine(edge: Line, line: Line) {}

function pointIsValid(
  point: CoordArr,
  lines: Line[],
  cache: PointCache,
): boolean {
  const cached = cache.get(point);
  log(cached);
  if (cached !== undefined) return cached;

  const isValid =
    pointIsInsidePolygon(point, lines) || pointIsOnBorder(point, lines);
  cache.set(point, isValid);
  return isValid;
}

function pointIsOnBorder(point: CoordArr, lines: Line[]) {
  for (let line of lines) {
    if (pointIntersectsWithLine(point, line)) {
      log("point is on line", line);
      return true;
    }
  }

  return false;
}

function pointIntersectsWithLine(
  [x, y]: CoordArr,
  [[aX, aY], [bX, bY]]: Line,
): boolean {
  return (
    (x === aX && x === bX && y >= aY && y <= bY) ||
    (y === aY && y === bY && x >= aX && x <= bX)
  );
}

function pointIsInsidePolygon([x, y]: CoordArr, lines: Line[]) {
  // find all vertical lines right of point
  const intersectingLines = lines.filter(
    ([[aX, aY], [bX, bY]]) => aX === bX && aX > x && aY <= y && bY >= y,
  );
  log("intersecting", intersectingLines);
  return intersectingLines.length % 2 !== 0;
}

function parse(inp: string[]): CoordArr[] {
  return inp.map((x) => toNumbers(x, ",")) as CoordArr[];
}

function toLines(coords: CoordArr[]): Line[] {
  const lines = Array.from(pairwise(coords, true));
  return lines.map((x) => x.sort(([aX, aY], [bX, bY]) => aX - bX || aY - bY));
}

function* getEdges([aX, aY]: CoordArr, [bX, bY]: CoordArr) {
  // const [xStart, xEnd] = [aX, bX].sort((a, b) => a - b);
  // const [yStart, yEnd] = [aY, bY].sort();
  //
  log("getedges", aX, aY, bX, bY);

  const xStart = Math.min(aX, bX);
  const xEnd = Math.max(aX, bX);
  const yStart = Math.min(aY, bY);
  const yEnd = Math.max(aY, bY);

  log(xStart, xEnd);

  const a = [xStart, yStart] as CoordArr;
  const b = [xEnd, yStart] as CoordArr;
  const c = [xEnd, yEnd] as CoordArr;
  const d = [xStart, yEnd] as CoordArr;

  yield [a, b] as [CoordArr, CoordArr];
  yield [b, c] as [CoordArr, CoordArr];
  yield [d, c] as [CoordArr, CoordArr];
  yield [a, d] as [CoordArr, CoordArr];
}

function* getPoints([aX, aY]: CoordArr, [bX, bY]: CoordArr) {
  // const xStart = Math.min(aX, bX);
  // const xEnd = Math.max(aX, bX);
  // const yStart = Math.min(aY, bY);
  // const yEnd = Math.max(aY, bY);

  for (let x = aX; x <= bX; x++) {
    for (let y = aY; y <= bY; y++) {
      yield [x, y] as [number, number];
    }
  }
}

function getSquareArea([[aX, aY], [bX, bY]]: Square) {
  const width = Math.abs(bX - aX) + 1;
  const height = Math.abs(bY - aY) + 1;
  const area = width * height;
  return area;
}

type Square = [start: CoordArr, end: CoordArr];

function log(...messages: unknown[]) {
  if (false) {
    console.log(...messages);
  }
}

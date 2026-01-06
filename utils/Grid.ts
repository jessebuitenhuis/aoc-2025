export class Grid {
  private _values: string[][];

  get width() {
    return this._values[0].length;
  }

  get height() {
    return this._values.length;
  }

  constructor(input: string[]) {
    this._values = input.map((x) => x.split(""));
  }

  setValue({ x, y }: Coord, value: string) {
    this._values[y][x] = value;
  }

  *entries() {
    for (let entry of this._entriesInRange(0, this.width, 0, this.height)) {
      yield entry;
    }
  }

  private *_entriesInRange(
    startX: number = 0,
    endX: number = this.width,
    startY: number = 0,
    endY: number = this.height,
  ) {
    startX = Math.max(startX, 0);
    endX = Math.min(endX, this.width - 1);
    startY = Math.max(startY, 0);
    endY = Math.min(endY, this.height - 1);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const value = this.getValue(x, y);
        const gridValue: GridValue = {
          x,
          y,
          value,
        };
        yield gridValue;
      }
    }
  }

  *adjacentEntries(coord: Coord) {
    for (let entry of this._entriesInRange(
      coord.x - 1,
      coord.x + 1,
      coord.y - 1,
      coord.y + 1,
    )) {
      if (this.isEqual(coord, entry)) continue;
      yield entry;
    }
  }

  getValue(x: number, y: number): string {
    try {
      return this._values[y][x];
    } catch (e) {
      throw new Error(`Error at ${x}, ${y}`);
    }
  }

  isEqual(a: Coord, b: Coord) {
    return a.x === b.x && a.y === b.y;
  }
}

export type Coord = { x: number; y: number };
export type CoordArr = [x: number, y: number];
type GridValue = Coord & { value: string };

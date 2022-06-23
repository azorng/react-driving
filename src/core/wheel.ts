import { Position } from "./types";

export class Wheel {
  onPositionChange = () => {};
  onAngleChange = () => {};
  private _angle: number;

  constructor(private readonly _pos: Position = [0, 0]) {
    this._angle = 0;
  }

  set pos(pos: Position) {
    this._pos[0] = pos[0];
    this._pos[1] = pos[1];
    this.onPositionChange();
  }

  set angle(val: number) {
    this._angle = val;
    this.onAngleChange();
  }

  get angle() {
    return this._angle;
  }

  get pos() {
    return this._pos;
  }
}

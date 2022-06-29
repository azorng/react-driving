export type Position = [x: number, y: number];

export enum Direction {
  Forward,
  Backward,
}

export class Car {
  speed_inc_interval = 0.5;
  turnWheelSpeed = 1;

  private direction: Direction = Direction.Forward;

  private _angle: number;
  private _pos: Position;
  private _speed = 0;
  private _max_speed = 180;
  private _size = 90;

  get size() {
    return this._size;
  }

  set size(val) {
    this._size = val;
    this.onChange();
  }

  get max_speed() {
    return this._max_speed;
  }

  set max_speed(val) {
    this._max_speed = val;
    this.onSpeedChange();
  }

  constructor(pos: Position = [0, 0]) {
    this._angle = 0;
    this._pos = pos;
  }

  onChange = () => {};
  onSpeedChange = () => {};

  set speed(val: number) {
    this._speed = val;
    this.onSpeedChange();
  }

  get speed() {
    return this._speed;
  }

  set pos(pos: Position) {
    this._pos[0] = pos[0];
    this._pos[1] = pos[1];
    this.onChange();
  }

  set angle(val: number) {
    this._angle = val;
    this.onChange();
  }

  get angle() {
    return this._angle;
  }

  get pos() {
    return this._pos;
  }

  accelerate() {
    if (
      (this.direction == Direction.Forward && this.speed < this.max_speed) ||
      // Max backwards speed is the half of normal speed
      (this.direction == Direction.Backward && this.speed < this.max_speed / 2)
    ) {
      this.speed += this.speed_inc_interval;
    }

    if (this.direction == Direction.Forward) {
      this.pos = [
        (this.pos[0] += (this.speed / 50) * Math.sin(this.angle * 0.0177)),
        (this.pos[1] += (this.speed / 50) * Math.cos(this.angle * 0.0177)),
      ];
    } else {
      this.pos = [
        (this.pos[0] -= (this.speed / 50) * Math.sin(this.angle * 0.0177)),
        (this.pos[1] -= (this.speed / 50) * Math.cos(this.angle * 0.0177)),
      ];
    }
  }

  break() {
    this.deaccelerate(8);
  }

  goForward() {
    if (this.direction == Direction.Backward) {
      this.deaccelerate(3);
    }

    if (this.direction == Direction.Forward || this.speed == 0) {
      this.direction = Direction.Forward;
      this.accelerate();
    }
  }

  goBackward() {
    if (this.direction == Direction.Forward) {
      this.deaccelerate(3);
    }
    if (this.direction == Direction.Backward || this.speed == 0) {
      this.direction = Direction.Backward;
      this.accelerate();
    }
  }

  deaccelerate(intensity: number = 1.5) {
    if (this.speed > 0) {
      this.speed -= this.speed_inc_interval * intensity;
      this.accelerate();
    }
    if (this.speed <= 0) {
      this.speed = 0;
    }
  }

  turnRight() {
    this.angle += this.turnWheelSpeed;
    if (this.angle >= 360) {
      this.angle = 0;
    }
  }

  turnLeft() {
    this.angle -= this.turnWheelSpeed;
    if (this.angle <= -360) {
      this.angle = 0;
    }
  }
}

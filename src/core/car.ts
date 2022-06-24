export type Position = [x: number, y: number];
enum Direction {
  Forward,
  Backward,
}

export class Car {
  speed = 0;
  max_speed = 3;
  speed_inc_interval = 0.003;
  width = 25;
  length = 85;

  direction: Direction = Direction.Forward;

  private _angle: number;
  private _pos: Position;

  constructor(pos: Position = [-20, 0]) {
    this._angle = 0;
    this._pos = pos;
  }

  onChange = () => {};

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
    if (this.speed < this.max_speed) {
      this.speed += this.speed_inc_interval;
    }

    if (this.direction == Direction.Forward) {
      this.pos = [
        (this.pos[0] += this.speed * Math.sin(this.angle * 0.0177)),
        (this.pos[1] += this.speed * Math.cos(this.angle * 0.0177)),
      ];
    } else {
      this.pos = [
        (this.pos[0] -= this.speed * Math.sin(this.angle * 0.0177)),
        (this.pos[1] -= this.speed * Math.cos(this.angle * 0.0177)),
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

  goBackwards() {
    if (this.direction == Direction.Forward) {
      this.deaccelerate(3.5);
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
    this.angle++;
    this.angle++;
    if (this.angle == 360) {
      this.angle = 0;
    }
  }

  turnLeft() {
    this.angle--;
    this.angle--;
    if (this.angle == -360) {
      this.angle = 0;
    }
  }
}

import { Wheel } from "./wheel";

export class Car {
  front_left_wheel = new Wheel([-20, 1]);
  front_right_wheel = new Wheel([20, 1]);
  back_left_wheel = new Wheel([-20, -40]);
  back_right_wheel = new Wheel([20, -40]);

  get wheels() {
    return [
      this.front_left_wheel,
      this.front_right_wheel,
      this.back_left_wheel,
      this.back_right_wheel,
    ];
  }

  accelerate() {
    this.wheels.forEach(
      (wheel) => (wheel.pos = [wheel.pos[0], wheel.pos[1] + 1])
    );
  }

  turnRight() {
    if (this.front_left_wheel.angle < 65) {
      this.front_left_wheel.angle++;
      this.front_right_wheel.angle++;
    }
  }

  turnLeft() {
    if (this.front_left_wheel.angle > -65) {
      this.front_left_wheel.angle--;
      this.front_right_wheel.angle--;
    }
  }
}

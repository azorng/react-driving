import { Position } from "core/car";

export default {
  posToStyle(position: Position) {
    return {
      left: `calc(${position[0]}px + 50vw)`,
      top: `calc(${position[1] - position[1] * 2}px + 50vh`,
    };
  },
};

export class Timer {
  timer?: NodeJS.Timer;
  action: () => void;
  interval: number;

  constructor(action: () => void, interval: number) {
    this.action = action;
    this.interval = interval;
  }

  get isActive() {
    return !!this.timer;
  }

  start() {
    if (!this.isActive) {
      this.timer = setInterval(this.action, this.interval);
    }
  }

  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}

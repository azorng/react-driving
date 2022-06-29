import { Timer } from "./util";
import { Car } from "./core/car";

const REFRESH_SPEED = 5;

const KEYS = {
  UP: ["ArrowUp", "KeyW"],
  DOWN: ["ArrowDown", "KeyS"],
  LEFT: ["ArrowLeft", "KeyA"],
  RIGHT: ["ArrowRight", "KeyD"],
  BREAK: ["Space"],
};

export default (car: Car) => {
  const goForwardTimer = new Timer(() => car.goForward(), REFRESH_SPEED),
    goBackwardsTimer = new Timer(() => car.goBackward(), REFRESH_SPEED),
    deaccelerateTimer = new Timer(() => car.deaccelerate(), REFRESH_SPEED),
    turnRightTimer = new Timer(() => car.turnRight(), REFRESH_SPEED),
    turnLeftTimer = new Timer(() => car.turnLeft(), REFRESH_SPEED),
    breakTimer = new Timer(() => car.break(), REFRESH_SPEED);

  const stopMovementTimers = () => {
    [goForwardTimer, deaccelerateTimer, breakTimer, goBackwardsTimer].forEach(
      (timer) => timer.stop()
    );
  };

  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;

    if (KEYS.DOWN.includes(e.code)) {
      stopMovementTimers();
      goBackwardsTimer.start();
    } else if (KEYS.RIGHT.includes(e.code)) {
      turnLeftTimer.stop();
      turnRightTimer.start();
    } else if (KEYS.LEFT.includes(e.code)) {
      turnRightTimer.stop();
      turnLeftTimer.start();
    } else if (KEYS.UP.includes(e.code)) {
      stopMovementTimers();
      goForwardTimer.start();
    } else if (KEYS.BREAK.includes(e.code)) {
      stopMovementTimers();
      breakTimer.start();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (KEYS.LEFT.includes(e.code)) {
      turnLeftTimer.stop();
    } else if (KEYS.RIGHT.includes(e.code)) {
      turnRightTimer.stop();
    } else if (KEYS.BREAK.includes(e.code)) {
      breakTimer.stop();
      if (!goBackwardsTimer.isActive && !goForwardTimer.isActive)
        deaccelerateTimer.start();
    } else if (KEYS.UP.includes(e.code)) {
      goForwardTimer.stop();
      if (!goBackwardsTimer.isActive) deaccelerateTimer.start();
    } else if (KEYS.DOWN.includes(e.code)) {
      goBackwardsTimer.stop();
      if (!goForwardTimer.isActive) deaccelerateTimer.start();
    }
  });
};

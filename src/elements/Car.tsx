import { Car } from "core/car";
import { useEffect, useState } from "react";
import util from "../util";

const REFRESH_SPEED = 5;

export default () => {
  let car = new Car();

  useEffect(() => {
    initDrivingKeyBindings(car);
  }, []);

  const [style, setStyle] = useState(generateStyle(car));
  car.onChange = () => setStyle(generateStyle(car));

  return (
    <div className="car" style={style}>
      <div className="front"></div>
      <div className="rear"></div>
    </div>
  );
};

const generateStyle = (car: Car) => ({
  ...util.posToStyle(car.pos),
  transform: `rotate(${car.angle}deg)`,
  height: car.length,
  width: car.width,
});

function initDrivingKeyBindings(car: Car) {
  let accelerateInterval: NodeJS.Timer;
  let deaccelerateInterval: NodeJS.Timer;
  let turnInterval: NodeJS.Timer;
  let breakInterval: NodeJS.Timer;
  let reverseInterval: NodeJS.Timer;

  const clearMovementIntervals = () => {
    clearInterval(accelerateInterval);
    clearInterval(deaccelerateInterval);
    clearInterval(breakInterval);
    clearInterval(reverseInterval);
  };

  window.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    }

    if (e.code == "ArrowDown") {
      clearMovementIntervals();
      reverseInterval = setInterval(() => car.goBackwards(), REFRESH_SPEED);
    } else if (e.code == "ArrowRight") {
      turnInterval = setInterval(() => car.turnRight(), REFRESH_SPEED * 3);
    } else if (e.code == "ArrowLeft") {
      turnInterval = setInterval(() => car.turnLeft(), REFRESH_SPEED * 3);
    } else if (["ArrowUp"].includes(e.code)) {
      clearMovementIntervals();
      accelerateInterval = setInterval(() => car.goForward(), REFRESH_SPEED);
    } else if (e.code == "Space") {
      clearMovementIntervals();
      breakInterval = setInterval(() => car.break(), REFRESH_SPEED);
    }
  });

  window.addEventListener("keyup", (e) => {
    if (["ArrowRight", "ArrowLeft"].includes(e.code)) {
      clearInterval(turnInterval);
    } else if (["ArrowUp"].includes(e.code)) {
      clearInterval(accelerateInterval);
      deaccelerateInterval = setInterval(
        () => car.deaccelerate(),
        REFRESH_SPEED
      );
    } else if (e.code == "Space") {
      clearInterval(breakInterval);
    } else if (e.code == "ArrowDown") {
      clearInterval(reverseInterval);
      deaccelerateInterval = setInterval(
        () => car.deaccelerate(),
        REFRESH_SPEED
      );
    }
  });
}

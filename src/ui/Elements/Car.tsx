import { useEffect } from "react";
import { Car } from "core/car";
import Wheel from "./Wheel";

export default () => {
  let car = new Car();
  useEffect(() => {
    initCarKeyBindings(car);
  }, []);

  return (
    <div className="car">
      {car.wheels.map((wheel, i) => (
        <Wheel key={i} wheel={wheel} />
      ))}
    </div>
  );
};

function initCarKeyBindings(car: Car) {
  let accelerateTimer: NodeJS.Timer;
  let turnTimer: NodeJS.Timer;

  window.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    }

    if (e.code == "ArrowRight") {
      turnTimer = setInterval(() => car.turnRight(), 15);
    } else if (e.code == "ArrowLeft") {
      turnTimer = setInterval(() => car.turnLeft(), 15);
    } else if (["Space", "ArrowUp"].includes(e.code)) {
      accelerateTimer = setInterval(() => car.accelerate(), 15);
    }
  });

  window.addEventListener("keyup", (e) => {
    if (["ArrowRight", "ArrowLeft"].includes(e.code)) {
      clearInterval(turnTimer);
    } else if (["Space", "ArrowUp"].includes(e.code)) {
      clearInterval(accelerateTimer);
    }
  });
}

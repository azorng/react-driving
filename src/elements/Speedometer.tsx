import { useState } from "react";
import { Car } from "core/car";

import Speedometer, {
  Background,
  Arc,
  Needle,
  Marks,
  Indicator,
} from "react-speedometer";

export default (props: { car: Car }) => {
  const { car } = props;

  const [speed, setSpeed] = useState(car.speed);
  const [maxSpeed, setMaxSpeed] = useState(car.max_speed);

  car.onSpeedChange = () => {
    setSpeed(car.speed);
    setMaxSpeed(car.max_speed);
  };

  return (
    <div
      style={{
        textAlign: "right",
        position: "absolute",
        right: 0,
        top: 0,
        padding: 20,
      }}
    >
      <Speedometer max={maxSpeed} value={speed}>
        <Background opacity={0.5} color="grey" />
        <Arc />
        <Needle circleColor="black" />
        <Marks />
        <Indicator />
      </Speedometer>
    </div>
  );
};

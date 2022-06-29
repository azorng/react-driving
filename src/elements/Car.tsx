import { Car } from "core/car";
import { useState } from "react";
import util from "../util";

export default (props: { car: Car }) => {
  const { car } = props;

  const [style, setStyle] = useState(generateStyle(car));
  car.onChange = () => setStyle(generateStyle(car));

  return (
    <div style={{ ...style, position: "absolute" }}>
      <img
        style={{
          position: "absolute",
          transform: "rotate(-90deg)",
          top: "25%",
        }}
        src={process.env.PUBLIC_URL + "/car.svg"}
      />
    </div>
  );
};

const generateStyle = (car: Car) => {
  handleEdges(car);
  return {
    ...util.posToStyle(car.pos),
    transform: `rotate(${car.angle}deg)`,
    width: car.size,
    height: car.size,
  };
};

function handleEdges(car: Car) {
  const position = car.pos;
  const maxHeight = document.documentElement.clientHeight / 2;
  const maxWidth = document.documentElement.clientWidth / 2;

  if (position[1] >= maxHeight) {
    position[1] = maxHeight;
  } else if (position[1] - car.size <= -Math.abs(maxHeight)) {
    position[1] = car.size + -Math.abs(maxHeight);
  }

  if (position[0] >= maxWidth - car.size) {
    position[0] = maxWidth - car.size;
  } else if (position[0] < -Math.abs(maxWidth)) {
    position[0] = -Math.abs(maxWidth);
  }
}

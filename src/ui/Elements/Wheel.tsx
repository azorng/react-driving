import { Wheel } from "core/wheel";
import { useState } from "react";
import lib from "../lib";

export default (props: { wheel: Wheel }) => {
  const generateStyle = () => ({
    ...lib.posToStyle(props.wheel.pos),
    transform: `rotate(${props.wheel.angle}deg)`,
  });

  const [style, setStyle] = useState(generateStyle());
  props.wheel.onPositionChange = () => setStyle(generateStyle());
  props.wheel.onAngleChange = () => setStyle(generateStyle());
  return <div className="wheel" style={style}></div>;
};

import "./App.css";
import CarEl from "./Car";
import { Car } from "../core/car";
import Speedometer from "./Speedometer";
import Menu from "./Menu";
import { useEffect } from "react";
import initDrivingKeyBindings from "../carKeyBindings";

export default () => {
  const car = new Car();

  useEffect(() => {
    initDrivingKeyBindings(car);
  }, []);

  return (
    <div id="App">
      <Menu car={car} />
      <CarEl car={car} />
      <Speedometer car={car} />
    </div>
  );
};

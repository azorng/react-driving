import { Position } from "core/car";

export default {
  posToStyle(position: Position) {
    return {
      left: `calc(${position[0]}px + 50vw)`,
      top: `calc(${position[1] - position[1] * 2}px + 50vh`,
    };
  },
};

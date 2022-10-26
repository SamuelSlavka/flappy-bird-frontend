import Matter from "matter-js";
import { LocationChange } from "../models/input.interfaces";

export const handleSingleKeypress = (input: boolean, player: Matter.Body): LocationChange => {
  var x = player?.velocity?.x;
  var y = player?.velocity?.y;

  if(input) {
    y -= 24 ;
  }

  return { x, y }
}

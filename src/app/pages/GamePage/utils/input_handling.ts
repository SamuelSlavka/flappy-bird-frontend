import Matter from "matter-js";
import { LocationChange, KeyMap } from "../models/input_interfaces";

export const handleKeypress = (keyMap: KeyMap, player: Matter.Body): LocationChange => {
  var x = player?.velocity?.x;
  var y = player?.velocity?.y;
  const up = keyMap['w'] || keyMap['ArrowUp'];
  const down = keyMap['s'] || keyMap['ArrowDown'];
  const left = keyMap['a'] || keyMap['ArrowLeft'];
  const right = keyMap['d'] || keyMap['ArrowRight'];

  if (up) {
    y -= 1;
  }
  if (left) {
    x = x > 0 ? x - 4 : x - 1;
  }
  if (down) {
    y += 1
  }
  if (right) {
    x = x < 0 ? x + 4 : x + 1;
  }

  return { x, y }
}

export const addListeners = (keyMap: KeyMap): void => {
  window.addEventListener('keydown', function (e) {
    keyMap[e.key] = true;
  }, true);
  window.addEventListener('keyup', function (e) {
    keyMap[e.key] = false;
  }, true);
}

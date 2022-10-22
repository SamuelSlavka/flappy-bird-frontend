import Matter from "matter-js";
import { LocationChange, KeyMap } from "../models/input_interfaces";
import { getBody, getConstraint } from "./matterjs_utils";

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

export const handleControl = (composites: any): LocationChange => {
  const control = getBody(composites, 'controls', 'control');
  const contrloConstraint = getConstraint(composites, 'controls', 'control');
  if (control && contrloConstraint) {
    const x = (control.position.x - contrloConstraint.pointA.x) / 70;
    const y = (control.position.y - contrloConstraint.pointA.y) / 70;
    return { x, y }
  }

  return { x: 0, y: 0 };
}

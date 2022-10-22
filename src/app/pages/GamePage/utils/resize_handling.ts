import Matter from "matter-js";
import { Constants } from "../enums/gameConstants";
import { getBody, getConstraint } from "./matterjs_utils";

export const handleResize = (scene: any, constraints: DOMRect) => {
  const { width, height } = constraints;

  const composites = scene.engine.world.composites;
  const floor = getBody(composites, 'elements', 'floor');
  const ceiling = getBody(composites, 'elements', 'ceiling');
  const leftWall = getBody(composites, 'elements', 'leftWall');
  const rightWall = getBody(composites, 'elements', 'rightWall');
  const control = getBody(composites, 'controls', 'control');
  const contrloConstraint = getConstraint(composites, 'controls', 'control');

  // Update canvas and bounds
  scene.bounds.max.x = width;
  scene.bounds.max.y = height;
  scene.options.width = width;
  scene.options.height = height;
  scene.canvas.width = width;
  scene.canvas.height = height;

  // update mobile control
  if (control) {
    Matter.Body.setPosition(control, {
      x: width / 2,
      y: height / 1.2
    });
  }
  if (contrloConstraint) {
    contrloConstraint.pointA.x = width / 2;
    contrloConstraint.pointA.y = height / 1.2;
  }

  //update floor location and size
  if (floor) {
    Matter.Body.setPosition(floor, {
      x: width / 2,
      y: height + Constants.STATIC_DENSITY - 60
    });

    Matter.Body.setVertices(floor, [
      { x: -10, y: height },
      { x: width + 10, y: height },
      { x: width + 10, y: height + Constants.STATIC_DENSITY },
      { x: -10, y: height + Constants.STATIC_DENSITY }
    ]);
  }
  //update cieling location and size

  if (ceiling) {
    Matter.Body.translate(ceiling, {
      x: width / 2,
      y: 0 - 50
    });

    Matter.Body.setVertices(ceiling, [
      { x: -10, y: height },
      { x: width + 10, y: height },
      { x: width + 10, y: height + Constants.STATIC_DENSITY },
      { x: -10, y: height + Constants.STATIC_DENSITY }
    ]);
  }
  //update floor location and size
  if (rightWall) {
    Matter.Body.setPosition(rightWall, {
      x: width + 50,
      y: height / 2
    });

    Matter.Body.setVertices(rightWall, [
      { x: width, y: height + 10 },
      { x: width, y: -10 },
      { x: width + Constants.STATIC_DENSITY, y: -10 },
      { x: width + Constants.STATIC_DENSITY, y: height + 10 }
    ]);
  }

  //update floor location and size
  if (leftWall) {
    Matter.Body.setPosition(leftWall, {
      x: -50,
      y: height / 2
    });

    Matter.Body.setVertices(leftWall, [
      { x: -Constants.STATIC_DENSITY, y: height + 10 },
      { x: -Constants.STATIC_DENSITY, y: 0 },
      { x: 0, y: -10 },
      { x: 0, y: height + 10 }
    ]);
  }
}
import { ColorScheme } from "../../../enums/ColorScheme";
import { Categories, Constants } from "../enums/gameConstants";

export const body_config = (label: string) => {
  return {
    isStatic: true,
    label: label,
    collisionFilter: {
      // left colides with player and obstacle, others with player
      category: label === 'leftWall' ? Categories.OBSTACLE : Categories.WALL,
      mask: label === 'leftWall' ? 1 : 2,
    },
    render: {
      fillStyle: ColorScheme.white
    }
  }
}

export const player_config = (label: string) => {
  return {
    restitution: Constants.PARTICLE_BOUNCYNESS,
    label: label,
    frictionAir: 0.1,
    collisionFilter: {
      // colides with everythin
      category: Categories.PLAYER,
      mask: 3
    },
    render: {
      fillStyle: ColorScheme.middle
    }
  }
}

export const obstacle_config = {
  label: 'obstacle',
  frictionAir: 0,
  frictionStatic: 0,
  collisionFilter: {
    // colides only with player
    category: Categories.OBSTACLE,
    mask: 1
  },
  render: {
    fillStyle: ColorScheme.light
  }
}

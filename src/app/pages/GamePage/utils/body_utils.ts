import { ColorScheme } from "../../../enums/ColorScheme";
import { Categories, Constants } from "../enums/gameConstants";

export const body_config = (label: string) => {
  return {
    isStatic: true,
    label: label,
    collisionFilter: {
      category: Categories.STATIC,
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
    frictionAir: 0.07,
    collisionFilter: {
      // colides only with walls and static elems
      category: Categories.STATIC
    },
    render: {
      fillStyle: ColorScheme.middle
    }
  }
}

export const meteor_config = {
  label: 'meteor',
  restitution: Constants.PARTICLE_BOUNCYNESS,
  frictionAir: 0.005,
  collisionFilter: {
    category: Categories.STATIC
  },
  render: {
    fillStyle: ColorScheme.light
  }
}

export const bullet_config = {
  label: 'bullet',
  collisionFilter: {
    category: Categories.STATIC
  },
  render: {
    fillStyle: ColorScheme.red
  }
}

export enum Constants {
  STATIC_DENSITY = 100,
  PARTICLE_SIZE = 10,
  BULLET_SIZE = 5,
  PARTICLE_BOUNCYNESS = 1
}

export enum Categories {
  DEFAULT = 0x0000,
  OBSTACLE = 0x0001,
  WALL = 0x0002,
  PLAYER = 0x0003,
}

export enum GameStages {
  START = "START",
  PLAY = "PLAY",
  END = "END",
}

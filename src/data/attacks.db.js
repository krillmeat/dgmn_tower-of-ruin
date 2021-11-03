export const attacksDB = {
  bubbles: {
    displayName: 'Bubbles',
    type: 'none',
    power: 'F',
    maxCost: 32,
    targets: 'single',
    hits: 2,
    animationFrames: [['bubbles1',1],['bubbles2',4],['bubbles1',1]],
    animationFrameCount: 2
  },
  babyFlame: {
    displayName: 'BabyFlame',
    power: 'E',
    maxCost: 8,
    type: 'fire',
    targets: 'single',
    hits: 1,
    species: 'agu',
    animationFrames: [['babyFlame1',1],['babyFlame2',1],['babyFlame3',4],['babyFlame2',1],['babyFlame1',1]],
    animationFrameCount: 3
  },
  megaFlame: {
    displayName: 'Mega Flame',
    power: 'D',
    maxCost: 8,
    type: 'fire',
    targets: 'single',
    hits: 1,
    animationFrames: [['babyFlame1',1],['babyFlame2',1],['babyFlame3',4],['babyFlame2',1],['babyFlame1',1]],
    animationFrameCount: 3
  },
  petitFire: {
    displayName: 'Petit Fire',
    power: 'F',
    maxCost: 8,
    type: 'fire',
    targets: 'all',
    hits: 1
  }
}
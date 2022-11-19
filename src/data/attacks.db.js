export const attacksDB = {
  bubbles: {
    displayName: 'Bubbles',
    type: 'none',
    power: 'F',
    maxCost: 32,
    stat: 'physical',
    targets: 'single',
    hits: 1,
    animationFrames: [['bubbles1',1],['bubbles2',1],['bubbles3',1],['bubbles4',1],['bubbles5',1],['bubbles6',1]],
    animationFrameCount: 6,
    effect: {
      type: 'buff',
      target: 'self',
      stat: 'ATK',
      amount: 1,
      accuracy: 100
    }
  },
  babyFlame: {
    displayName: 'Baby Flame',
    power: 'E',
    maxCost: 12,
    stat: 'physical',
    type: 'fire',
    targets: 'single',
    hits: 1,
    species: 'agu',
    animationFrames: [['babyFlame1',1],['babyFlame2',1],['babyFlame3',1],['babyFlame4',2],['babyFlame5',1],['babyFlame6',1]],
    animationFrameCount: 6
  },
  megaFlame: {
    displayName: 'Mega Flame',
    power: 'D',
    maxCost: 8,
    stat: 'physical',
    type: 'fire',
    targets: 'single',
    hits: 1,
    animationFrames: [['babyFlame1',2],['babyFlame2',2],['babyFlame3',8],['babyFlame2',2],['babyFlame1',2]],
    animationFrameCount: 3
  },
  picoDarts: {
    displayName: 'Pico Darts',
    power: 'F',
    stat: 'physical',
    maxCost: 12,
    type: 'evil',
    targets: 'single',
    hits: 1,
    animationFrames: [['picoDarts1',1],['picoDarts2',1],['picoDarts3',1],['picoDarts4',1],['picoDarts5',1]],
    animationFrameCount: 5,
    effect: ['debuff',1,.5,25]
  },
  petitFire: {
    displayName: 'Petit Fire',
    power: 'F',
    stat: 'physical',
    maxCost: 8,
    type: 'fire',
    targets: 'all',
    hits: 1
  },
  elecRush: {
    displayName: 'Elec Rush',
    power: 'F',
    stat: 'physical',
    maxCost: 12,
    type: 'elec',
    targets: 'single',
    hits: 1,
    animationFrames: [['elecRush1',2],['elecRush2',2],['elecRush3',2],['elecRush4',2]],
    animationFrameCount: 4,
    effect: ['status','paralyze',100]
  },
  petitTwister: {
    displayName: 'Petit Twister',
    power: 'F',
    stat: 'special',
    maxCost: 8,
    type: 'wind',
    targets: 'all',
    hits: 1
  },
  darknessGear: {
    displayName: 'Darkness Gear',
    power: 'F',
    maxCost: 12,
    type: 'metal',
    stat: 'physical',
    targets: 'single',
    hits: 2,
    animationFrames: [['darknessGear1',1],['darknessGear2',1],['darknessGear3',1],['darknessGear4',1],['darknessGear5',1],['darknessGear6',1],['darknessGear7',1],['blankAttack',8],['darknessGear1',1],['darknessGear2',1],['darknessGear3',1],['darknessGear4',1],['darknessGear5',1],['darknessGear6',1],['darknessGear7',1]],
    animationFrameCount: 7
  },
  nutsShoot: {
    displayName: 'Nuts Shoot',
    power: 'F',
    maxCost: 12,
    stat: 'physical',
    type: 'plant',
    targets: 'all',
    hits: 1,
    animationFrames: [['nutsShoot1',1],['nutsShoot2',1],['nutsShoot3',1],['nutsShoot4',1]],
    animationFrameCount: 4
  },
  magicalFire: {
    displayName: 'Magical Fire',
    power: 'F',
    maxCost: 8,
    type: 'fire',
    stat: 'special',
    targets: 'single', // TODO - Multi
    hits: 1,
    animationFrames: [['babyFlame1',1],['babyFlame2',1],['babyFlame3',4],['babyFlame2',1],['babyFlame1',1]],
    animationFrameCount: 3
  },
}
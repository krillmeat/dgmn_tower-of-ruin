import Attack from "../classes/dgmn/attack"

export const partyMock = {
  dId0: {
    currentLevel: 1,
    attacks: [new Attack('bubbles'), new Attack('babyFlame'), new Attack('magicalFire'), new Attack('darknessGear'), new Attack('petitFire'), new Attack('petitTwister'), new Attack('picoDarts')],
    currentStats: {HP: 10, ATK: 1, DEF: 1, INT: 1, RES: 1, HIT: 1, AVO: 1, SPD: 1}
  },
  dId1: {
    currentLevel: 10,
    attacks: [new Attack('bubbles'), new Attack('nutsShoot'), new Attack('picoDarts')],
    currentStats: {HP: 24, ATK: 10, DEF: 6, INT: 10, RES: 7, HIT: 6, AVO: 6, SPD: 6}
  },
  dId2: {
    currentLevel: 1,
    attacks: [new Attack('bubbles'), new Attack('darknessGear')],
    currentStats: {HP: 10, ATK: 1, DEF: 1, INT: 1, RES: 1, HIT: 1, AVO: 1, SPD: 1}
  }
}

export const enemyPartyMock = {
  edId0: {
    speciesName: 'Yura',
    currentLevel: 3,
    currentStats: {HP: 16, ATK: 4, DEF: 1, INT: 4, RES: 4, HIT: 1, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  edId1: {
    speciesName: 'Zuru',
    currentLevel: 3,
    currentStats: {HP: 16, ATK: 4, DEF: 1, INT: 4, RES: 1, HIT: 1, AVO: 4, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  edId2: {
    speciesName: 'Doki',
    currentLevel: 3,
    currentStats: {HP: 16, ATK: 4, DEF: 1, INT: 1, RES: 1, HIT: 1, AVO: 4, SPD: 4},
    attacks: [new Attack('bubbles')]
  }
}
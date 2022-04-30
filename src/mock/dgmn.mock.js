import Attack from "../classes/dgmn/attack"

export const partyMock = {
  dId0: {
    currentLevel: 2,
    attacks: [new Attack('bubbles'), new Attack('babyFlame'), new Attack('magicalFire'), new Attack('darknessGear'), new Attack('petitFire'), new Attack('petitTwister'), new Attack('picoDarts')],
    currentStats: {HP: 30, ATK: 10, DEF: 0, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 8}
  },
  dId1: {
    currentLevel: 2,
    attacks: [new Attack('bubbles'), new Attack('nutsShoot'), new Attack('picoDarts')],
    currentStats: {HP: 30, ATK: 8, DEF: 0, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 12}
  },
  dId2: {
    currentLevel: 2,
    attacks: [new Attack('bubbles'), new Attack('darknessGear')],
    currentStats: {HP: 30, ATK: 4, DEF: 0, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 4}
  }
}

export const enemyPartyMock = {
  edId0: {
    speciesName: 'gabu',
    currentStats: {HP: 30, ATK: 0, DEF: 4, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 5}
  },
  edId1: {
    speciesName: 'picoDevi',
    currentStats: {HP: 30, ATK: 0, DEF: 2, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 3}
  },
  edId2: {
    speciesName: 'pulse',
    currentStats: {HP: 30, ATK: 0, DEF: 8, INT: 0, RES: 0, HIT: 0, AVO: 0, SPD: 7}
  }
}
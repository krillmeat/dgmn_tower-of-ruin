// Organized by Stage (1-7) and then by Field
// preXX marks where certain DGMN will begin to appear, based on your highest floor level (only goes in 5s)
import Attack from "../classes/dgmn/attack"; // Should i do this???
export const dgmnEncounterChartDB = {
  1: {
    DR: {
      pre10: 1,
      dgmnList: ['Bota']
    },
    NS: {
      pre10: 1,
      dgmnList: ['Doki']
    },
    DS: {
      pre10: 1,
      dgmnList: ['Pitch']
    },
    WG: {
      pre10: 1,
      dgmnList: ['Pururu']
    },
    JT: {
      pre10: 1,
      dgmnList: ['Yura']
    },
    ME: {
      pre10: 1,
      dgmnList: ['Choro']
    },
    VB: {
      pre10: 1,
      // dgmnList: ['Poyo']
      dgmnList: ['Yura']
    },
    NA: {
      pre10: 1,
      dgmnList: ['Zuru']
    }
  },
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {} // Is 7 even going to happen naturally? Maybe is super hard modes or something...
}

export const dgmnEncounterFieldsDB = ['DR','NS','DS','WG','JT','ME','VB','NA'];

export const dgmnEncounterDB = {
  Bota: {
    speciesName: 'Bota',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Yura: {
    speciesName: 'Yura',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 2, DEF: 1, INT: 2, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Zuru: {
    speciesName: 'Zuru',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 2, DEF: 1, INT: 2, RES: 1, HIT: 1, AVO: 2, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Doki: {
    speciesName: 'Doki',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 1, AVO: 2, SPD: 2},
    attacks: [new Attack('bubbles')]
  },
  Pururu: {
    speciesName: 'Pururu',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    attacks: [new Attack('bubbles')]
  },
  Choro: {
    speciesName: 'Choro',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 2, DEF: 2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Pitch: {
    speciesName: 'Pitch',
    currentLevel: 2,
    currentStats: {HP: 5, ATK: 1, DEF: 2, INT: 1, RES: 2, HIT: 1, AVO: 2, SPD: 1},
    attacks: [new Attack('bubbles')]
  }
}
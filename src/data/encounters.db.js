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
      dgmnList: ['Poyo']
    },
    NA: {
      pre10: 1,
      dgmnList: ['Zuru']
    }
  },
  2: {
    DR: {
      pre10: 1,
      dgmnList: ['Koro']
    },
    NS: {
      pre10: 1,
      dgmnList: ['Bibi']
    },
    WG: {
      pre10: 1,
      dgmnList: ['Poro']
    },
    DS: {
      pre10: 1,
      dgmnList: ['Puka']
    },
    JT: {
      pre10: 1,
      dgmnList: ['Bud']
    },
    ME: {
      pre10: 1,
      dgmnList: ['Capri']
    },
    VB: {
      pre10: 1,
      dgmnList: ['Toko']
    },
    NA: {
      pre10: 1,
      // dgmnList: ['Pagu']
      dgmnList: ['Koro']
    }
  },
  3: {},
  4: {},
  5: {},
  6: {},
  7: {} // Is 7 even going to happen naturally? Maybe in super hard modes or something...
}

export const bossEncoutnersMapDB = [5]

export const bossEncountersChartDB = [
  ['Koro','Agu','Bota']
]

export const dgmnEncounterFieldsDB = ['DR','NS','DS','WG','JT','ME','VB','NA'];

export const dgmnEncounterDB = {
  Bota: {
    speciesName: 'Bota',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Yura: {
    speciesName: 'Yura',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 2, DEF: 1, INT: 2, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Zuru: {
    speciesName: 'Zuru',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 2, DEF: 1, INT: 2, RES: 1, HIT: 1, AVO: 2, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Doki: {
    speciesName: 'Doki',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 1, AVO: 2, SPD: 2},
    attacks: [new Attack('bubbles')]
  },
  Pururu: {
    speciesName: 'Pururu',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    attacks: [new Attack('bubbles')]
  },
  Choro: {
    speciesName: 'Choro',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 2, DEF: 2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Pitch: {
    speciesName: 'Pitch',
    currentLevel: 2,
    currentStats: {HP:2, ATK: 1, DEF: 2, INT: 1, RES: 2, HIT: 1, AVO: 2, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  Poyo: {
    speciesName: 'Poyo',
    currentLevel: 2,
    currentStats: {HP:2, ATK:2, DEF:1, INT:2, RES:2, HIT:1, AVO:1, SPD:1 },
    attacks: [new Attack('bubbles')]
  },
  Koro: {
    speciesName: 'Koro',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:3, INT:3, RES:3, HIT:7, AVO:3, SPD:7},
    attacks: [new Attack('bubbles')],
  },
  Capri:{
    speciesName: 'Capri',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:7, INT:3, RES:7, HIT:3, AVO:3, SPD:3},
    attacks: [new Attack('bubbles')]
  },
  Bud:{
    speciesName: 'Bud',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:3, INT:7, RES:7, HIT:3, AVO:3, SPD:3},
    attacks: [new Attack('bubbles')]
  },
  Puka:{
    speciesName: 'Puka',
    currentLevel: 3,
    currentStats: {HP:12, ATK:3, DEF:7, INT:3, RES:7, HIT:3, AVO:7, SPD:3},
    attacks: [new Attack('bubbles')]
  },
  Bibi:{
    speciesName: 'Bibi',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:3, INT:3, RES:3, HIT:3, AVO:7, SPD:7},
    attacks: [new Attack('bubbles')]
  },
  Poro:{
    speciesName: 'Poro',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:3, INT:3, RES:3, HIT:7, AVO:3, SPD:7},
    attacks: [new Attack('bubbles')]
  },
  Toko:{
    speciesName: 'Toko',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:3, INT:7, RES:7, HIT:3, AVO:3, SPD:3},
    attacks: [new Attack('bubbles')]
  },
  Pagu:{
    speciesName: 'Pagu',
    currentLevel: 3,
    currentStats: {HP:12, ATK:7, DEF:3, INT:7, RES:3, HIT:3, AVO:7, SPD:3},
    attacks: [new Attack('bubbles')]
  },
  Agu: {
    speciesName: 'Agu',
    currentLevel: 4,
    currentStats: {HP:32, ATK:12, DEF:6, INT:6, RES:6, HIT:12, AVO:6, SPD:12},
  }
}

export const bossEncountersDB = {
  Bota: {
    speciesName: 'Bota',
    currentLevel: 3,
    currentStats: {HP:16, ATK:4, DEF:1, INT:1, RES:1, HIT:4, AVO:1, SPD:4},
    attacks: [new Attack('bubbles')]
  },
  Koro: {
    speciesName: 'Koro',
    currentLevel: 4,
    currentStats: {HP:26, ATK:9, DEF:4, INT:4, RES:4, HIT:9, AVO:4, SPD:9},
    attacks: [new Attack('bubbles')]
  },
  Agu: {
    speciesName: 'Agu',
    currentLevel: 5,
    currentStats: {HP:38, ATK:15, DEF:8, INT:8, RES:8, HIT:15, AVO:8, SPD:15},
    attacks: [new Attack('babyFlame')]
  }
}
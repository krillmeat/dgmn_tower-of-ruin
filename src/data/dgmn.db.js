import { evolutions } from "./evolutions.db"

export const dgmnDB = {
  // BABY I
  Bota: {
    stage: 1, class: 'free',
    stats: {HP:2, ATK:1, DEF:0, INT: 0, RES: 0, HIT: 1, AVO: 0, SPD: 1},
    evolutions: evolutions['Bota'],
    types: {},
    fields: {DR: 4}, // TEMP UP TO GET TO EVO INSTANTLY
    attack: 'bubbles'
  },
  Yura: {
    stage: 1, class: 'free',
    stats: [2,1,0,1,1,0,0,0],
    evolutions: [],
    types: {},
    fields: {JT: 1},
    attack: 'bubbles'
  },
  Doki: {
    stage: 1, class: 'free',
    stats: [2,1,0,0,0,0,1,1],
    evolutions: [],
    types: {},
    fields: {NS: 1},
    attack: 'bubbles'
  },
  Zuru: {
    stage: 1, class: 'free',
    stats: [2,1,0,1,0,0,1,0],
    evolutions: [],
    types: {},
    fields: {NA: 1},
    attack: 'bubbles'
  },
  Pururu: {
    stage: 1, class: 'free',
    stats: [2,1,0,0,0,1,0,1],
    evolutions: [],
    types: {},
    fields: {WG: 1},
    attack: 'bubbles'
  },
  Choro: {
    stage: 1, class: 'free',
    stats: {HP:2, ATK:1, DEF:1, INT: 0, RES: 1, HIT: 0, AVO: 0, SPD: 0},
    evolutions: ['Capri'],
    types: {},
    fields: {ME: 1},
    attack: 'bubbles'
  },
  Pitch: {
    stage: 1, class: 'free',
    stats: [2,0,1,0,1,0,1,0],
    evolutions: [],
    types: {},
    fields: {DS: 1},
    attack: 'bubbles'
  },
  Poyo: {
    stage: 1, class: 'free',
    stats: [2,1,0,1,1,0,0,0],
    evolutions: [],
    types: {},
    fields: {VB: 1},
    attack: 'bubbles'
  },

  // BABY II
  Koro: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    evolutions: [],
    types:{},
    fields: {DR: 2},
    evoFields: {DR: 3}
  },
  Bud: {},
  Bibi: {},
  Pagu: {},
  Poro: {},
  Capri: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    evolutions: [],
    types:{},
    fields: {ME: 2},
    evoFields: {ME: 3}
  },
  Puka: {},
  Toko: {},

  // CHILD
  Agu: {
    stage: 3, class: 'vaccine', crests: [0],
    stats: [5,5,4,3,4,4,4,3],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  },
  Gabu: {
    stage: 3, class: 'data', crests: [0],
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {water: .75, plant: 1.5, fire: 1.125}
  },
  Piyo: {
    stage: 3, class: 'vaccine', crests: [],
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
  },
  Terrier: {
    stage: 3, class: 'vaccine', crests: [],
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {evil: 1.5, metal: 2} // TEMP : MEtal should not be here
  },
  Pulse: {
    stage: 3, class: 'vaccine',
    stats: [5,6,4,4,4,5,5,6],
    evolutions: evolutions['agu'],
    types: {earth: 2, water: .5}
  },
  Lala: {
    stage: 3, class: 'data',
    stats: [5,5,5,5,5,5,5,5],
    evolutions: evolutions['agu'],
    types: {fire: 2, water: .5}
  },
  Haguru: {
    stage: 3, class: 'virus', crests: [],
    stats: [5,5,7,5,6,5,5,3],
    evolutions: evolutions['agu'],
    types: {}
  },
  PicoDevi: {
    stage: 3, class: 'virus', crests: [],
    stats: [5,5,5,5,5,5,5,8],
    evolutions: evolutions['agu'],
    types: {holy: 2, fire: 1.5}
  },

  // ADULT
  Grey: {
    stage: 4, class: 'vaccine', crests: [0],
    stats: [6,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  }
}
import { evolutions } from "./evolutions.db"

export const dgmnDB = {
  // BABY I
  Bota: {
    stage: 1, attr: 'Free',
    stats: {HP:2, ATK:1, DEF:0, INT: 0, RES: 0, HIT: 1, AVO: 0, SPD: 1},
    evolutions: evolutions['Bota'],
    types: {},
    fields: {DR: 1},
    attack: 'bubbles',
    hatchFields: {DR:1}
  },
  Jyari: {
    stage: 1, attr: 'Free',
    stats: {HP:2, ATK:2, DEF:0, INT:0, RES:0, HIT:0, AVO:0, SPD:1},
    evolutions: ['Gigi'],
    types: {},
    fields: {DR: 1},
    attack: 'bubbles',
    hatchFields: {DR:2,NA:1}
  },
  Yura: {
    stage: 1, attr: 'Free',
    stats:{HP:2, ATK:1, DEF:0, INT: 1, RES: 1, HIT: 0, AVO: 0, SPD: 0},
    evolutions: ['Bud'],
    types: {},
    fields: {JT: 1},
    attack: 'bubbles',
    hatchFields: {JT:1}
  },
  Doki: {
    stage: 1, attr: 'Free',
    stats: [2,1,0,0,0,0,1,1],
    evolutions: [],
    types: {},
    fields: {NS: 1},
    attack: 'bubbles'
  },
  Zuru: {
    stage: 1, attr: 'Free',
    stats: [2,1,0,1,0,0,1,0],
    evolutions: [],
    types: {},
    fields: {NA: 1},
    attack: 'bubbles'
  },
  Pururu: {
    stage: 1, attr: 'Free',
    stats: [2,1,0,0,0,1,0,1],
    evolutions: [],
    types: {},
    fields: {WG: 1},
    attack: 'bubbles'
  },
  Choro: {
    stage: 1, attr: 'Free',
    stats: {HP:2, ATK:1, DEF:1, INT: 0, RES: 1, HIT: 0, AVO: 0, SPD: 0},
    evolutions: ['Capri'],
    types: {},
    fields: {ME: 1},
    attack: 'bubbles',
    hatchFields: {ME:1}
  },
  Pitch: {
    stage: 1, attr: 'Free',
    stats: {HP:2, ATK:0, DEF:1, INT: 0, RES: 1, HIT: 0, AVO: 1, SPD: 0},
    evolutions: [],
    types: {},
    fields: {DS: 1},
    attack: 'bubbles'
  },
  Poyo: {
    stage: 1, attr: 'Free',
    stats: {HP:2, ATK:1, DEF:0, INT: 1, RES: 1, HIT: 0, AVO: 0, SPD: 0},
    evolutions: [],
    types: {},
    fields: {VB: 1},
    attack: 'bubbles'
  },

  // BABY II
  Koro: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    evolutions: ['Agu'],
    types:{},
    fields: {DR: 2},
    evoFields: {DR: 2}
  },
  Bud: {
    stage: 2, attr: 'Free',
    stats: {HP:6, ATK:1, DEF:1, INT: 2, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    evolutions: ['Lala'],
    types:{},
    fields: {JT: 2},
    evoFields: {JT: 2}
  },
  Tane: {},
  Bibi: {},
  Pagu: {},
  Poro: {},
  Capri: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    evolutions: ['Haguru'],
    types:{},
    fields: {ME: 2},
    evoFields: {ME: 2}
  },
  Puka: {},
  Toko: {},

  // CHILD
  Agu: {
    stage: 3, attr: 'vaccine',
    stats: {HP:6, ATK:3, DEF:2, INT: 2, RES: 2, HIT: 3, AVO: 2, SPD: 3},
    evolutions: [],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2},
    fields: {DR: 3},
    evoFields: {DR: 5},
    attack: 'babyFlame'
  },
  Gabu: {
    stage: 3, class: 'Data',
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {water: .75, plant: 1.5, fire: 1.125}
  },
  Piyo: {
    stage: 3, class: 'Vaccine',
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
  },
  Terrier: {
    stage: 3, class: 'vaccine',
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {evil: 1.5, metal: 2} // TEMP : MEtal should not be here
  },
  Pulse: {
    stage: 3, class: 'Vaccine',
    stats: [5,6,4,4,4,5,5,6],
    evolutions: evolutions['agu'],
    types: {earth: 2, water: .5}
  },
  Lala: {
    stage: 3, attr: 'Data',
    stats: {HP:5, ATK:4, DEF:3, INT: 5, RES: 4, HIT: 4, AVO: 4, SPD: 3},
    evolutions: [],
    types: {fire: 2, water: .5},
    fields: {JT: 3},
    evoFields: {JT: 5},
    attack: 'nutsShoot'
  },
  Haguru: {
    stage: 3, attr: 'Virus',
    stats: {HP:5, ATK:5, DEF:7, INT: 5, RES: 6, HIT: 5, AVO: 5, SPD: 3},
    evolutions: [],
    types: {},
    fields: {ME: 3},
    evoFields: {ME: 5},
    attack: 'darknessGear'
  },
  PicoDevi: {
    stage: 3, class: 'Virus',
    stats: [5,5,5,5,5,5,5,8],
    evolutions: evolutions['agu'],
    types: {holy: 2, fire: 1.5}
  },

  // ADULT
  Grey: {
    stage: 4, class: 'vaccine',
    stats: [6,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  }
}
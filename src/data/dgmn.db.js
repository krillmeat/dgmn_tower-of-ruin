import { BABY_I_DB } from "./DGMN/babyI.dgmn.db"
import { evolutions } from "./evolutions.db"

export const dgmnDB = {
  // BABY I
  ...BABY_I_DB,

  // BABY II
  Koro: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    evolutions: ['Agu','ToyAgu'],
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
  Bibi: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    evolutions: ['Pulse'],
    types: {},
    fields: {NS: 2},
    evoFields: {NS: 2}
  },
  Pagu: {},
  Poro: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 2},
    evolutions: ['Hawk'],
    types: {},
    fields: {WG: 2},
    evoFields: {WG: 2}
  },
  Capri: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    evolutions: ['Haguru','ToyAgu','Kote'],
    types:{},
    fields: {ME: 2},
    evoFields: {ME: 2}
  },
  Puka: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    evolutions: ['Gani'],
    types:{},
    fields: {DS: 2},
    evoFields: {DS: 2}
  },
  Toko: {
    stage: 2, attr: 'Free',
    stats: {HP:4, ATK:2, DEF:2, INT: 1, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    evolutions: ['Pata'],
    types:{},
    fields: {VB: 2},
    evoFields: {VB: 2}
  },
  PetiMera: {
    stage: 2, attr: 'Free',
    stats: {HP:4,ATK:1,DEF:1,INT:2,RES:2,HIT:1,AVO:2,SPD:1},
    evolutions: ['Agu'],
    types:{},
    fields: {DR:1, NA:1 },
    evoFields: {DR:1, NA:2 }
  },

  // CHILD
  Agu: {
    stage: 3, attr: 'Vaccine',
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
  ToyAgu: {
    stage: 3, attr: 'Vaccine',
    stats: {HP:5,ATK:5,DEF:5,INT:5,RES:5,HIT:5,AVO:5,SPD:5},
    evolutions:[],
    types:{},
    fields: {ME:2,DR:1},
    evoFields:{ME:3,DR:2},
    attack: 'toyFlame'
  },
  Kote: {
    stage: 3, attr: 'Data',
    stats: {HP:5,ATK:5,DEF:5,INT:5,RES:5,HIT:5,AVO:5,SPD:5},
    evolutions:[],
    types:{},
    fields: {ME:2,VB:1},
    evoFields:{ME:3,VB:2},
    attack: 'thunderKote'
  },
  PicoDevi: {
    stage: 3, class: 'Virus',
    stats: [5,5,5,5,5,5,5,8],
    evolutions: evolutions['agu'],
    types: {holy: 2, fire: 1.5}
  },

  // ADULT
  Grey: {
    stage: 4, class: 'Vaccine',
    stats: [6,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  }
}
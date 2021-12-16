import { evolutions } from "./evolutions.db"

export const dgmnDB = {
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
    types: {water: .75, plant: 1.5}
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
    types: {holy: 2}
  },
  Grey: {
    stage: 4, class: 'vaccine', crests: [0],
    stats: [6,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  }
}
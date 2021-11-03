import { evolutions } from "./evolutions.db"

export const dgmnDB = {
  Agu: {
    stage: 3, class: 'vaccine', crests: [0],
    stats: [5,5,5,5,5,5,5,5],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  },
  Gabu: {
    stage: 3, class: 'data', crests: [0],
    stats: [5,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
  },
  Grey: {
    stage: 4, class: 'vaccine', crests: [0],
    stats: [6,5,5,5,5,5,5,6],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  }
}
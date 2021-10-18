import { evolutions } from "./evolutions.db"

export const dgmnDB = {
  Agu: {
    stage: 3, class: 'vaccine', crests: [0],
    stats: [5,5,5,5,5,5,5,5],
    evolutions: evolutions['agu'],
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
  }
}
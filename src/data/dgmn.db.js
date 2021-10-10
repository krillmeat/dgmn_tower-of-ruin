import { evolutions } from "./evolutions.db"

export const dgmnDB = {
  agu: {
    stage: 3, class: 'vaccine', crests: [0],
    stats: [5,5,5,5,5,5,5,5,5],
    evolutions: evolutions['agu'],
  },
  grey: {
    stage: 4, class: 'vaccine', crests: [0],
    stats: [5,5,5,5,5,5,5,5,10],
    evolutions: evolutions['agu'],
  }
}
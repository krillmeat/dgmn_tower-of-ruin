export const itemsDB = {
  smallMeat: {
    displayName: 'Meat S',
    usable: ['battle','dungeon'],
    target: 'party',
    hitsAll: false,
    description: 'Heal HP of 1 DGMN by 10',
    effect: {
      type: 'heal',
      stat: 'HP',
      amount: 10
    }
  },
  atkPluginC: {
    displayName: 'ATK+ C',
    usable: ['battle'],
    target: 'party',
    hitsAll: false,
    description: 'Boost 1 DGMN ATK by 1 in Battle'
  },
  boosterDRs: {
    displayName: '1 DR FP',
    usable: ['dungeon'],
    target: 'party',
    hitsAll: false,
    description: 'Give 1 DGMN 1 Dragon Roar Field Point',
    effect: {
      type: 'booster',
      field: 'DR',
      amount: 1
    }
  }
}

export const itemChart = {
  meat: {
    common: ['smallMeat']
  },
  beetle: {
    common: ['atkPluginC']
  },
  booster: {
    common: ['boosterDRs']
  }
}

export const itemByName = {
  "Meat S": 'smallMeat',
  "ATK+ C": 'atkPluginC',
  "1 DR FP": 'boosterDRs'
}

export const treasureChartDB = {

}

export const rarityChartDB = ['common','uncommon','rare','extraRare']
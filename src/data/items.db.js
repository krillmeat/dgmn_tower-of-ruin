export const itemsDB = {
  smallMeat: {
    displayName: 'Meat S',
    usable: ['battle','dungeon'],
    target: 'your-dgmn',
    description: 'Heal HP of 1 DGMN by 10',
    effect: {
      type: 'heal',
      stat: 'HP',
      amount: 10
    }
  },
  atkPluginC: {
    displayName: 'ATK Plugin C',
    usable: ['battle'],
    target: 'your-dgmn'
  },
  boosterDRs: {
    displayName: '1 DR FP',
    usable: ['dungeon'],
    target: 'your-dgmn',
    description: 'Give 1 DGMN 1 Dragon Roar Field Point'
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

export const treasureChartDB = {

}

export const rarityChartDB = ['common','uncommon','rare','extraRare']
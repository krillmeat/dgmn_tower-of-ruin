// import Attack from "../classes/battle/attack";
import Dgmn from "../classes/dgmn/dgmn";
import Attack from "../classes/dgmn/attack";


const FREE_TEAM = [
  {
    speciesName: 'Bota',
    currentLevel: 2,
    currentStats: {HP:5, ATK: 2, DEF: 1, INT: 1, RES: 1, HIT: 2, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  {
    speciesName: 'Yura',
    currentLevel: 2,
    currentStats: {HP:5, ATK: 2, DEF: 1, INT: 2, RES: 2, HIT: 1, AVO: 1, SPD: 1},
    attacks: [new Attack('bubbles')]
  },
  {
    speciesName: 'Zuru',
    currentLevel: 2,
    currentStats: {HP:5, ATK: 2, DEF: 1, INT: 2, RES: 1, HIT: 1, AVO: 2, SPD: 1},
    attacks: [new Attack('bubbles')]
  }
]



export const DEBUG_DGMN = FREE_TEAM;

export const DEBUG_YOUR_TEAM = [{
  speciesName: 'Bota',
  currentStats: {HP:500, ATK: 200, DEF: 100, INT: 200, RES: 100, HIT: 100, AVO: 200, SPD: 100}
},
{
  speciesName: 'Yura',
  currentStats: {HP:500, ATK: 200, DEF: 100, INT: 200, RES: 100, HIT: 100, AVO: 200, SPD: 100}
},
{
  speciesName: 'Choro',
  currentStats: {HP:500, ATK: 200, DEF: 100, INT: 200, RES: 100, HIT: 100, AVO: 200, SPD: 100}
}]


export const setupMockDgmn = () => {
  let dgmnList = [ new Dgmn(0,'FLARE','Agu',0),
  // new Dgmn(1,'BLITZ','Grey',1),
  // new Dgmn(1,'FEATHER','Piyo',1),
  // new Dgmn(1,'TUFT','Terrier',1),
  new Dgmn(1,'SPROUT','Lala',1),
  // new Dgmn(2,'FROST','Gabu',2)
  new Dgmn(2,'GEAR','Haguru',2)
];

  // MOCK DGMN

  dgmnList[0].level = 10;
  dgmnList[0].permAttacks = [
    new Attack('babyFlame'),
    new Attack('bubbles')
  ];
  dgmnList[0].permAttacks[0].currCost = 3;
  dgmnList[0].permAttacks[1].currCost = 24;
  dgmnList[0].buildDgmn();
  dgmnList[0].currHP = dgmnList[0].currStats[0];


  // GREYMON
  // dgmnList[1].level = 7;
  // dgmnList[1].permAttacks = [
  //   new Attack('megaFlame'),
  //   new Attack('babyFlame'),
  //   new Attack('bubbles')
  // ];
  // dgmnList[1].permAttacks[0].currCost = 8;
  // dgmnList[1].permAttacks[1].currCost = 4;
  // dgmnList[1].permAttacks[2].currCost = 30;
  // dgmnList[1].buildDgmn();

  // PIYO
  // dgmnList[1].level = 7;
  // dgmnList[1].permAttacks = [
  //   new Attack('magicalFire'),
  //   new Attack('bubbles')
  // ];
  // dgmnList[1].permAttacks[0].currCost = 8;
  // dgmnList[1].permAttacks[1].currCost = 30;
  // dgmnList[1].buildDgmn();

  // dgmnList[2].level = 4;
  // dgmnList[2].buildDgmn();
  // dgmnList[2].currHP = dgmnList[2].currStats[0];
  // dgmnList[2].permAttacks = [
  //   new Attack('petitFire'),
  //   new Attack('bubbles')
  // ]

  // TERRIER
  // dgmnList[1].level = 7;
  // dgmnList[1].permAttacks = [
  //   // new Attack('petitTwister'),
  //   new Attack('babyFlame'),
  //   new Attack('bubbles')
  // ];
  // dgmnList[1].permAttacks[0].currCost = 8;
  // dgmnList[1].permAttacks[1].currCost = 30;
  // dgmnList[1].buildDgmn();

  // LALA
  dgmnList[1].level = 10;
  dgmnList[1].permAttacks = [
    new Attack('nutsShoot'),
    new Attack('bubbles')
  ];
  dgmnList[1].permAttacks[0].currCost = 8;
  dgmnList[1].permAttacks[1].currCost = 30;
  dgmnList[1].buildDgmn();
  dgmnList[1].currHP = dgmnList[1].currStats[0];

  // GABU
  // dgmnList[2].level = 4;
  // dgmnList[2].buildDgmn();
  // dgmnList[2].currHP = dgmnList[2].currStats[0];
  // dgmnList[2].permAttacks = [
  //   new Attack('babyFlame'),
  //   new Attack('bubbles')
  // ]

  // dgmnList[2].permAttacks[0].currCost = 6;

  // HAGURU
  dgmnList[2].level = 10;
  dgmnList[2].buildDgmn();
  dgmnList[2].currHP = dgmnList[2].currStats[0];
  dgmnList[2].permAttacks = [
    new Attack('darknessGear'),
    new Attack('bubbles')
  ]

  dgmnList[2].permAttacks[0].currCost = 6;

  return dgmnList;
}

export const setupMockEnemyDgmn = () => {
  let dgmnList = [new Dgmn(4,'ENEMY','Gabu',0,true), new Dgmn(5,'ENEMY','PicoDevi',1,true), new Dgmn(6,'ENEMY','Pulse',2,true)];

  dgmnList[0].level = 5;
  dgmnList[0].buildDgmn();
  dgmnList[0].currHP = dgmnList[0].currStats[0];
  dgmnList[0].permAttacks = [new Attack('babyFlame')];

  dgmnList[1].level = 5;
  dgmnList[1].permAttacks = [new Attack('picoDarts')];
  dgmnList[1].buildDgmn();
  dgmnList[1].currHP = dgmnList[1].currStats[0];

  dgmnList[2].level = 5;
  dgmnList[2].buildDgmn();
  dgmnList[2].permAttacks = [new Attack('elecRush')];
  dgmnList[2].currHP = dgmnList[2].currStats[0];

  return dgmnList;
}
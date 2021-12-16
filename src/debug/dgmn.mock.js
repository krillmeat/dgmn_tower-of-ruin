import Attack from "../classes/attack";
import Dgmn from "../classes/dgmn";

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
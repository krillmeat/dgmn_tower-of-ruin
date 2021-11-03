import Attack from "../classes/attack";
import Dgmn from "../classes/dgmn";

export const setupMockDgmn = () => {
  let dgmnList = [ new Dgmn(0,'FLAME','Agu',0),
  new Dgmn(1,'BLITZ','Grey',1),
  // new Dgmn(2,'FROST','Gabu',2)
];

  // MOCK DGMN

  dgmnList[0].level = 12;
  dgmnList[0].permAttacks = [
    new Attack('babyFlame'),
    new Attack('bubbles')
  ];
  dgmnList[0].permAttacks[0].currCost = 3;
  dgmnList[0].permAttacks[1].currCost = 24;
  dgmnList[0].buildDgmn();


  dgmnList[1].level = 7;
  dgmnList[1].permAttacks = [
    new Attack('megaFlame'),
    new Attack('babyFlame'),
    new Attack('bubbles')
  ];
  dgmnList[1].permAttacks[0].currCost = 8;
  dgmnList[1].permAttacks[1].currCost = 4;
  dgmnList[1].permAttacks[2].currCost = 30;
  dgmnList[1].buildDgmn();

  // dgmnList[2].level = 4;
  // dgmnList[2].buildDgmn();
  // dgmnList[2].permAttacks = [
  //   new Attack('petitFire'),
  //   new Attack('bubbles')
  // ]

  // dgmnList[2].permAttacks[0].currCost = 6;

  return dgmnList;
}

export const setupMockEnemyDgmn = () => {
  let dgmnList = [new Dgmn(4,'ENEMY','Agu',0,true)];

  dgmnList[0].level = 8;
  dgmnList[0].buildDgmn();

  return dgmnList;
}
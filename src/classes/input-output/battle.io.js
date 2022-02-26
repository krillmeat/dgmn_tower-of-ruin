import IO from "./io";

class BattleIO extends IO{
  constructor(battleAH,...args){
    super(...args);
    this.battleAH = battleAH;
  }

  actionKeyHandler = upDown => {
    console.log("ACTION IN BATTLE");
  }

}

export default BattleIO;
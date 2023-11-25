import IO from "../../classes/input-output/io";

class TownIO extends IO{
  constructor(townAH,...args){
    super(...args);
    this.townAH = townAH;
    this.menuAH;
  }

  actionKeyHandler = upDown => {
    this.townAH.enterTower()
  }
}

export default TownIO;

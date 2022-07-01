import ListMenu from "./list-menu";

class BossVictoryMenu extends ListMenu{
  constructor(currFloor,...args){
    super(...args);
    this.currFloor = currFloor;
  }
}

export default BossVictoryMenu;
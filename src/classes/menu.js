// TODO - I would love to figure out how to not include gameAH and systemAH in here, but fetching and refreshing the screen seem too important for menus to ignore

import MenuUtility from "./menu/menu.util";

class Menu{
  constructor(systemAH,gameAH,parentAH){
    this.currentState;

    this.systemAH = systemAH;
    this.gameAH = gameAH;
    this.parentAH = parentAH;

    this.menuUtility = new MenuUtility();
  }
}

export default Menu;
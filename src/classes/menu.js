import MenuUtility from "./menu/menu.util";
import ContinueCursor from "./menu/continue-cursor";

class Menu{
  constructor(systemAH,gameAH,parentAH){
    this.currSubMenu;
    this.subMenus = {}

    this.systemAH = systemAH;
    this.gameAH = gameAH;
    this.parentAH = parentAH;

    this.menuUtility = new MenuUtility();
  }

  addSubMenu = (label,menu) => {
    this.subMenus[label] = menu;
  }

  removeSubMenu = label => {
    if(this.subMenus[label]) delete this.subMenus[label];
  }

  buildIconImages = labels => {
    let images = {};

    for(let label of labels){
      images[label] = {
        selected: this.systemAH.fetchImage(`${label}Selected`),
        deselected: this.systemAH.fetchImage(`${label}Deselected`)
      }
    }

    return images;
  }

  drawContinueCursor = (continueCursorImg,drawCB) => {
    this.continueCursor = new ContinueCursor(continueCursorImg,this.menuCanvas?.paintCanvas,drawCB);
    this.continueCursor.blink();
  }
}

export default Menu;
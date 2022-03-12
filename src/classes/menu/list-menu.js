import config from "../../config";
import Menu from "../menu";

class ListMenu extends Menu{
  constructor(listHeight=1,...args){
    super(...args);
    this.menuList;
    this.listHeight = listHeight;
    this.currentIndex = 0;
  }

  setMenuItem = dir => {
    console.log("REPLACE");
  }

  drawCursor = (listIndex,offsetX,offsetY) => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage('miniCursor'),(offsetX*8) * config.screenSize,(((listIndex*this.listHeight) + offsetY)*8)*config.screenSize)
  }

  getYOffsetForIndex = listIndex => {
    return (this.listHeight * listIndex * 8) * config.screenSize;
  }
}

export default ListMenu;
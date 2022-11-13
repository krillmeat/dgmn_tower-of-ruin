import CFG from "../../config";
import GameCanvas from "../canvas";
import SubMenu from "./sub-menu";

class IconMenu extends SubMenu{
  constructor(coord,iconList,...args){
    super(...args);
    this.currIcon = 0;
    this.menuChart;
    this.iconList = iconList;
    this.images;
    this.coord = coord; // Allow extenders to access
    this.disabledIcons = []; // Add a Label in here to disable the Icon altogether

    this.menuCanvas = new GameCanvas(`${this.label}-menu`,this.iconList.length * 16 ,16 )
    this.menuCanvas.x = coord[0] * 8 * CFG.screenSize;
    this.menuCanvas.y = coord[1] * 8 * CFG.screenSize;
  }

  nextIcon = () => {
    let newIndex = this.currIcon < this.iconList.length - 1 ? this.currIcon + 1 : 0;
    this.drawIcons(newIndex);
    this.currIcon = newIndex;
  }

  prevIcon = () => {
    let newIndex = this.currIcon > 0 ? this.currIcon - 1 : this.iconList.length - 1;
    this.drawIcons(newIndex);
    this.currIcon = newIndex;
  }

  selectIcon = () => {
    this.currIcon = 0;
    this.isActive = false;
  }

  getCurrLabel = () => {
    return this.iconList[this.currIcon];
  }

  clearIcons = () => {
    this.menuCanvas.blackFill();
  }

  drawIcons = selected =>{
    this.clearIcons();
    for(let i = 0; i < this.iconList.length; i++){
      let img = selected === i ? this.images[this.iconList[i]].selected : this.images[this.iconList[i]].deselected;
      if(this.disabledIcons.indexOf(this.iconList[i]) !== -1 ) img = this.images[this.iconList[i]].disabled;
      this.menuCanvas.paintImage(img,(i*16)*CFG.screenSize,0);
    }
  }

}

export default IconMenu;
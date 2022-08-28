import config from "../../config";
import MapUtility from "../dungeon/utility/map.util";
import TextArea from "../text-area";
import ListMenu from "./list-menu";

class BossVictoryMenu extends ListMenu{
  constructor(currFloor,...args){
    super(...args);
    this.currFloor = currFloor;
    this.dgmnIndex = 0;

    this.currUpgradeIndex = 0;

    this.mapUtility = new MapUtility();

    this.inFPSelection = false;
    this.learnedAttackTxt = new TextArea(1,12,18,1);

    this.fetchImageCB;
    this.redrawParentCB;
    this.onDone;
  }

  drawList = () => { // Default
    for(let i = 0; i < this.listItems.length; i++){
      for(let r = 0; r < 8; r++){
        let image = 'rewardIconDeselected';
        if(r > this.mapUtility.getBossRewardLevel(this.currFloor)) image = 'rewardIconNull';
        this.drawIcon(i,r,image);
      }
    }

    this.drawIcon(this.currIndex,this.currUpgradeIndex,'rewardIconSelected');
  }

  drawCurrIcon = () => {

  }

  drawIcon = (row,col,image) => {
    this.menuCanvas.paintImage(this.fetchImageCB(image),(col+9)*config.tileSize,(2*row)*config.tileSize);
  }

  moveUp = () => {
    if(!this.inFPSelection){
      if(this.currIndex > 0){
        this.currIndex--;
        this.drawMenu();
        this.redrawParentCB();
      }
    } else{
      console.log("MOVE UP FP CHOICE")
    }
  }

  moveDown = () => {
    if(!this.inFPSelection){
      if(this.currIndex < 2){
        this.currIndex++;
        this.drawMenu();
        this.redrawParentCB();
      }
    } else{
      console.log("MOVE DOWN FP CHOICE")
    }
  }
}

export default BossVictoryMenu;
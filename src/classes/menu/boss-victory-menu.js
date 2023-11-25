import CFG from "../../config";
import { FIELD_LABELS } from "../../data/fields.db";
import MapUtility from "../../dungeon/utils/map.util";
import TextArea from "../text-area";
import ListMenu from "./list-menu";
import MenuCanvas from "./menu-canvas";

const REWARD_MESSAGES = [
  "Permanently upgrade FP",
  "Permanently upgrade XP",
  "Permanently upgrade EN",
]


  /**------------------------------------------------------------------------
   * BOSS VICTORY MENU
   * ------------------------------------------------------------------------
   * Menu for the Boss Rewards Screen
   * @param {Number} currFloor  Dungeon's Current Floor
   * ----------------------------------------------------------------------*/
class BossVictoryMenu extends ListMenu{
  constructor(currFloor,...args){
    super(...args);
    this.currFloor = currFloor;
    this.dgmnIndex = 0;

    this.currUpgradeIndex = 0;

    this.mapUtility = new MapUtility();
    this.menuCanvas = new MenuCanvas(`${this.label}-menu`,160,144);

    this.inFPSelection = false;
    this.FPIndex = 0;
    this.infoTxt = new TextArea(4,14,16,4);
    this.learnedAttackTxt = new TextArea(1,12,18,1);

    this.FPText = [
      new TextArea(10,3,2,1),
      new TextArea(10,4,2,1),
      new TextArea(10,5,2,1),
      new TextArea(10,6,2,1),
      new TextArea(10,7,2,1),
      new TextArea(10,8,2,1),
      new TextArea(10,9,2,1),
      new TextArea(10,10,2,1)
    ]

    this.fetchImageCB;
    this.redrawParentCB;
    this.onDone;

    this.init();
  }

  init = () => {
    this.infoTxt.instantText(this.menuCanvas.ctx,REWARD_MESSAGES[0])
  }

  clearInfoTxt = () => {
    console.log("?");
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(4*CFG.tileSize,14*CFG.tileSize,16*CFG.tileSize,4*CFG.tileSize);
  }

  /**------------------------------------------------------------------------
   * DRAW LIST                                                     [OVERRIDE]
   * ------------------------------------------------------------------------
   * Draws the "List" of Icons for the Reward Grid
   * ----------------------------------------------------------------------*/
  drawList = () => { 
    for(let i = 0; i < this.listItems.length; i++){
      for(let r = 0; r < 8; r++){
        let image = 'rewardIconDeselected';
        if(r > this.mapUtility.getBossRewardLevel(this.currFloor)) image = 'rewardIconNull';
        this.drawIcon(i,r,image);
      }
    }

    this.drawIcon(this.currIndex,this.currUpgradeIndex,'rewardIconSelected');
  }

  drawMenu = () => { 
    this.drawList()
    if(this.inFPSelection){ this.drawFPMenu() }
  }

  drawFPMenu = () => {
    this.menuCanvas.paintImage(this.fetchImageCB('bossRewardFieldChoice'),0,0);
    this.menuCanvas.paintImage(this.fetchImageCB('miniCursor'),7*CFG.tileSize,((this.FPIndex)+3)*CFG.tileSize);
    for(let i in this.FPText){
      this.FPText[i].instantText(this.menuCanvas.ctx,FIELD_LABELS[i],'white');
    }
  }

  drawIcon = (row,col,image) => {
    this.menuCanvas.paintImage(this.fetchImageCB(image),(col+11)*CFG.tileSize,((2*row)+2)*CFG.tileSize);
  }

  launchFPSelection = () => {
    this.inFPSelection = true;
    this.drawMenu();
    this.redrawParentCB();
  }

  prevChoice = () => {
    if(!this.inFPSelection){
      if(this.currIndex > 0){
        this.currIndex--;
        this.clearInfoTxt();
        this.infoTxt.instantText(this.menuCanvas.ctx,REWARD_MESSAGES[this.currIndex]);
      }
    } else{ 
      if(this.FPIndex > 0) this.FPIndex--;
    }

    this.drawMenu();
    this.redrawParentCB();
  }

  nextChoice = () => {
    if(!this.inFPSelection){
      if(this.currIndex < 2){ // TODO - Might make sense to make this dynamic
        this.currIndex++;
        this.clearInfoTxt();
        this.infoTxt.instantText(this.menuCanvas.ctx,REWARD_MESSAGES[this.currIndex]);
      }
    } else{ 
      if(this.FPIndex < 8) this.FPIndex++;
    }

    this.drawMenu();
        this.redrawParentCB();
  }

  selectChoice = (message,onDone) => {
    this.clearInfoTxt();
    this.infoTxt.timedText(this.menuCanvas.ctx,message,this.drawMenu);
    setTimeout(()=>{ onDone() },3000);
  }

  drawDgmnPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * CFG.screenSize,32*CFG.screenSize,(32-1)*CFG.screenSize);
}
}

export default BossVictoryMenu;

import { debugLog } from "../../utils/log-utils";
import Menu from "../menu";
import BattleMenuCanvas from "./canvas/battle-menu-canvas";

class BattleMenu extends Menu{
  constructor(...args){
    super(...args);
    this.battleAH = this.parentAH;
    this.menuCanvas = new BattleMenuCanvas('battle-menu-canvas',160,144);

    this.buttonCoordinates = [14,16]

    this.menuChart = {
      level: 'dgmn',
      index: 0,
      root: ['digiBeetle','dgmn'],
      digiBeetle: [],
      dgmn: ['attack','defend','stats'] // TODO - Add Back
    }
  }

  init = () => {
    debugLog("++ Initializing Battle Menu...");
    // TODO - Right now, all of this sets up to be a start on the Dgmn Menu, when it should be the DigiBeetle
    this.menuState = "dgmn";
    this.menuCanvas.setTopMessage("Attack");
    this.menuCanvas.drawBottomSection(this.battleAH.getDgmnDataByIndex(0,['speciesName','nickname','currentHP','currentEN','currentLevel','portrait']));
    this.setCurrentButton("attack","dgmn");
  }

  setCurrentButton = (selected) => {
    this.menuChart.index = this.menuChart[this.menuChart.level].indexOf(selected);
    let images = this.getMenuIconImages(this.menuChart.level);
    this.menuCanvas.drawMenuButtons(selected,images,this.buttonCoordinates);
    this.battleAH.drawBattleCanvas();
  }

  // TODO - Pull into Menu Proper
  getMenuIconImages = (level) => {
    let images = {};
    for(let label of this.menuChart[level]){
      images[label] = {
        selected: this.systemAH.fetchImage(`${label}Selected`),
        deselected: this.systemAH.fetchImage(`${label}Deselected`)
      }
    }

    return images;
  }
}

export default BattleMenu;
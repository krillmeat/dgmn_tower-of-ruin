import DigiBeetleAH from "./action-handlers/digibeetle.ah"
import DigiBeetleCanvas from "./digibeetle-canvas"

import {digiBeetleImages} from "../data/images.db";
import { debugLog } from "../utils/log-utils";
import config from "../config";

class DigiBeetle{
  constructor(dungeonAH){

    this.digiBeetleAH = new DigiBeetleAH({
      initCB: this.init,
      addItemToToolBoxCB: this.addItemToToolBox,
      getToolBoxItemsCB: this.getToolBoxItems,
      hideCanvasCB: this.hideCanvas,
      showCanvasCB: this.showCanvas,
      getToolBoxTypeCB: this. getToolBoxType
    });
    this.dungeonAH;
    this.gameAH;
    this.systemAH;

    this.digiBeetleCanvas;

    this.toolBox = {
      version: 'dodo',
      items: ['smallMeat','smallMeat','boosterDRs']
    }

  }

  init = () => {
    this.initCanvas();
    this.loadDigiBeetleImages();
  }

  initSystemAH = actionHandler =>{ this.systemAH = actionHandler; }
  initGameAH = actionHandler => { this.gameAH = actionHandler; }
  initDungeonAH = actionHandler =>{ this.dungeonAH = actionHandler; }

  initCanvas = () => {
    this.digiBeetleCanvas = new DigiBeetleCanvas(this.dungeonAH.getCurrentDirection,'digibeetle-canvas',16,16,64,64, false, this.gameAH.refreshScreen);
  }

  hideCanvas = () => {
    this.digiBeetleCanvas.x = -1000;
  }

  showCanvas = () => {
    this.digiBeetleCanvas.x = 64 * config.screenSize;
  }

  addItemToToolBox = item => {
    this.toolBox.items.push(item);
    debugLog("Toolbox : ",this.toolBox.items);
  }

  loadDigiBeetleImages = () => {
    let allImages = [];
    for(let img = 0; img < digiBeetleImages.length; img++){
      allImages.push(digiBeetleImages[img]);
    }

    this.systemAH.loadImages(allImages, ()=>{
      this.drawDigiBeetle();
      this.onDigiBeetleImagesLoaded();
    });
  }

  onDigiBeetleImagesLoaded = () => {
    this.gameAH.addCanvasObject(this.digiBeetleCanvas);
    this.onLoaded();
  }

  drawDigiBeetle = () => {
    this.digiBeetleCanvas.frames.down = [this.systemAH.fetchImage('digiBeetleDown0'),this.systemAH.fetchImage('digiBeetleDown1')];
    this.digiBeetleCanvas.frames.up = [this.systemAH.fetchImage('digiBeetleUp0'),this.systemAH.fetchImage('digiBeetleUp1')];
    this.digiBeetleCanvas.frames.right = [this.systemAH.fetchImage('digiBeetleRight0'),this.systemAH.fetchImage('digiBeetleRight1')];
    this.digiBeetleCanvas.frames.left = [this.systemAH.fetchImage('digiBeetleLeft0'),this.systemAH.fetchImage('digiBeetleLeft1')];
    this.digiBeetleCanvas.animateBeetle('down');
  }

  getToolBoxItems = () => { return this.toolBox.items }
  getToolBoxType = () => { return this.toolBox.version }

  onLoaded = () => {
    
  }
}

export default DigiBeetle;
import DigiBeetleAH from "./action-handlers/digibeetle.ah"
import DigiBeetleCanvas from "./digibeetle-canvas"

import {digiBeetleImages} from "../data/images.db";

class DigiBeetle{
  constructor(dungeonAH){

    this.digiBeetleAH = new DigiBeetleAH({
      initCB: this.init,
      addItemToToolBoxCB: this.addItemToToolBox
    });
    this.dungeonAH;
    this.gameAH;
    this.systemAH;

    this.digiBeetleCanvas;

    this.toolBox = {
      version: 'dodo',
      items: []
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

  addItemToToolBox = item => {
    this.toolBox.push(item);
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

  onLoaded = () => {
    
  }
}

export default DigiBeetle;
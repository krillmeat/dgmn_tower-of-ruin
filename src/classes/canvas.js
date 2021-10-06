import config from "../config";
import {debugLog} from '../utils/log-utils';

class GameCanvas{
  constructor(canvasClass,width,height, hasIdleAnimation){
    this.canvasClass = canvasClass;
    this.width = width * config.screenSize;
    this.height = height * config.screenSize;
    this.elem = this.buildCanvas();
    this.ctx;

    this.imageUrlStack = {};
    this.imageStack = {};
    this.imagesLoaded = false;

    this.hasIdleAnimation = hasIdleAnimation;
    this.idleAnimationImages = {};
    this.idleAnimationRate = 0; // TODO - Gather from Database?
  }

  /**------------------------------------------------------------------------
   * IDLE ANIMATE
   * ------------------------------------------------------------------------
   * Creates a time-based animation that switches between two different images
   * TODO - Switch over to "IDLE" version
   * ------------------------------------------------------------------------
   * @param {Number} speed  How fast the animation will check to change
   * ----------------------------------------------------------------------*/
  animate = speed => {
    let counter = 0;
    setInterval( () => {
      this.clearCanvas();
      if(counter % 4 === 0){
        this.paintImage(this.imageStack);
      }
      counter++;
    },speed);
  }

  /**------------------------------------------------------------------------
   * LOAD IMAGES
   * ------------------------------------------------------------------------
   * Grabs all of the images from the Image Stack and loads all of them
   * When finished, triggers a callback
   * ------------------------------------------------------------------------
   * @param {Function} callback Callback function from method caller
   * ----------------------------------------------------------------------*/
  loadImages = callback => {
    let loadedImages = {};
    let loadedCount = 0;
    let totalImages = Object.keys(this.imageUrlStack).length;
    for(let img in this.imageUrlStack){
      loadedImages[img] = new Image();
      loadedImages[img].onload = () => {
        if(++loadedCount >= totalImages){
          callback(loadedImages);
        }
      };
      loadedImages[img].src = this.imageUrlStack[img];
    }
  }

  /**------------------------------------------------------------------------
   * CLEAR CANVAS
   * ------------------------------------------------------------------------
   * Clears the Canvas and returns it to a blank slate
   * ----------------------------------------------------------------------*/
  clearCanvas = () => {
    this.ctx.clearRect(0,0,this.elem.width,this.elem.height);
  }

  /**------------------------------------------------------------------------
   * BUILD CANVAS
   * ------------------------------------------------------------------------
   * Creates the Canvas Element with the correct properties
   * ----------------------------------------------------------------------*/
  buildCanvas = () => {
    let canvasElem = document.createElement('canvas');
        canvasElem.width = this.width;
        canvasElem.height = this.height;
        canvasElem.classList.add(this.canvasClass);
    this.ctx = canvasElem.getContext('2d');
    return canvasElem;
  }

  /**------------------------------------------------------------------------
   * PAINT CANVAS
   * ------------------------------------------------------------------------
   * Paints one canvas onto another
   * TODO - Dimensions, offset, etc.
   * ------------------------------------------------------------------------
   * @param {Canvas} canvas The canvas to be painted
   * ----------------------------------------------------------------------*/
  paintCanvas = canvas => {
    this.ctx.clearRect(0,0,this.elem.width,this.elem.height);
    this.ctx.drawImage(canvas,0,0,canvas.width,canvas.height);
  }

  /**------------------------------------------------------------------------
   * PAINT IMAGE
   * ------------------------------------------------------------------------
   * Takes a list of images and adds them one at a time to the canvas
   * ------------------------------------------------------------------------
   * @param {Object} images Object of images to be drawn
   * ----------------------------------------------------------------------*/
  paintImage = images => {
    for(let img in images){
      let imgHeight = (images[img].height / 8) * config.screenSize;
      let imgWidth = (images[img].width / 8) * config.screenSize;
      this.ctx.drawImage(images[img],0,0,imgWidth,imgHeight);
    }
  }
}

export default GameCanvas;
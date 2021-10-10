import config from "../config";
import {debugLog} from '../utils/log-utils';

class GameCanvas{
  constructor(canvasClass, width, height, x, y, hasIdleAnimation, gameScreenRedrawCallback){
    this.canvasClass = canvasClass;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width * config.screenSize;
    this.height = height * config.screenSize;
    this.elem = this.buildCanvas();
    this.ctx;

    this.imageUrlStack = [];
    this.imageStack = [];
    this.imagesLoaded = false;

    this.hasIdleAnimation = hasIdleAnimation;
    this.idleAnimationImages = [];
    this.idleAnimationRate = 0; // TODO - Gather from Database?

    this.triggerGameScreenRedraw = () => {
      if(gameScreenRedrawCallback) gameScreenRedrawCallback() 
    }
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
    let currentFrame = 0;
    setInterval( () => {
      this.clearCanvas();
      // if(counter % 4 === 0){
        this.paintImage(this.imageStack[currentFrame]);
        this.triggerGameScreenRedraw();
        currentFrame++;
        if(currentFrame >= this.imageStack.length) currentFrame = 0;
      // }
      counter++;
    },speed);
  }


  loadImageStack = (imgStack) => {
    // THIS IS TEMPED FOR SPECIFIC MOCKS
    this.imageUrlStack = imgStack;
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
    let loadedImages = [];
    let loadedCount = 0;
    let totalImages = this.imageUrlStack.length;
    for(let i = 0; i < totalImages; i++){
      loadedImages.push( new Image() );
      loadedImages[i].onload = () => {
        if(++loadedCount >= totalImages){
          callback(loadedImages);
        }
      };
      loadedImages[i].src = this.imageUrlStack[i];
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
    this.ctx.drawImage(canvas.elem,canvas.x,canvas.y,canvas.width,canvas.height);
  }

  /**------------------------------------------------------------------------
   * PAINT IMAGE
   * ------------------------------------------------------------------------
   * Takes a list of images and adds them one at a time to the canvas
   * ------------------------------------------------------------------------
   * @param {Object} images Object of images to be drawn
   * @param {Boolean} isFlipped Should the Image be reversed (used for Battle DGMN)
   * ----------------------------------------------------------------------*/
  paintImage = (image, isFlipped) => {
      let imgHeight = (image.height / 8) * config.screenSize;
      let imgWidth = (image.width / 8) * config.screenSize;
      if(isFlipped){
         this.ctx.scale(-1,1);
         this.ctx.translate((imgWidth * -1),0);
      }
      this.ctx.drawImage(image,0,0,imgWidth,imgHeight);
  }
}

export default GameCanvas;
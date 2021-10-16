import config from "../config";
import {fontData} from "../data/font.db"

/**------------------------------------------------------------------------
 * TEXT MANAGER
 * ------------------------------------------------------------------------
 * Handles all Text displays
 * ------------------------------------------------------------------------
 * @param {Array} colors List of Images that correlate to the font image
 * @param {Number} rows
 * @param {Number} cols
 * @param {Number} x
 * @param {Number} y
 * @param {Function} colorizeCallback
 * ----------------------------------------------------------------------*/
class TextManager {
  constructor(colors, rows, cols,x,y,colorizeCallback){
    this.colors = colors;
    this.rows = rows;
    this.cols = cols;
    this.x = x || 0;
    this.y = y || 0;

    this.colorize = char => { 
      let fontIndex = 0;
      if(colorizeCallback)
        fontIndex = colorizeCallback(char) 
      return fontIndex;
    }
  }

  getFontCoord = char => {
    return fontData[char];
  }

  clearTextBox = canvas => {
    canvas.ctx.clearRect((this.x * 8) * config.screenSize,(this.y * 8) * config.screenSize,this.cols * 7 * config.screenSize,this.rows * 7 * config.screenSize);
    canvas.ctx.fillStyle = '#00131a';
    canvas.ctx.fillRect((this.x * 8) * config.screenSize,(this.y * 8) * config.screenSize,this.cols * 7 * config.screenSize,this.rows * 7 * config.screenSize);
  }

  instantPaint = (canvas, message) => {
    let ctx = canvas.ctx;
    let splitMessage = this.replaceSpecials(message);
    this.clearTextBox(canvas);
    for(let i = 0; i < splitMessage.length; i++){
      let char = splitMessage[i];
      let charX = fontData[char][0] * 64;
      let charY = fontData[char][1] * 64;
      let fontIndex = this.colorize(char);
      // image, sX, sY, sW, sH, dX, dY, dW, dH || s = source | d = destination
      ctx.drawImage(this.colors[fontIndex],charX,charY,64,64,((8 * config.screenSize) * i) + ((this.x * 8) * config.screenSize), (this.y * 8) * config.screenSize, 8 * config.screenSize, 8 * config.screenSize );
    }
  }

  replaceSpecials = message => {
    // Eventually, I might have to swap this stuff out for a loop method
    let modString = message;
        modString = modString.replace('.M','^');
        modString = modString.replace('.hp','%');
        modString = modString.replace('.en','@');
    let modArray = modString.split('');
    if(modArray.indexOf('^') !== -1) modArray[modArray.indexOf('^')] = 'dotM';
    if(modArray.indexOf('%') !== -1) modArray[modArray.indexOf('%')] = 'hp';
    if(modArray.indexOf('@') !== -1) modArray[modArray.indexOf('@')] = 'en';
    if(modArray.indexOf(' ') !== -1) modArray[modArray.indexOf(' ')] = 'space';
    return modArray;
  }

  progressivePaint = speed => {
    // Paints one letter at a time. Used for messages, talking, etc.
  }

  paintToCanvas = canvas => {
    // canvas.
  }
}

export default TextManager;

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

  /**------------------------------------------------------------------------
   * INSTANT PAINT
   * ------------------------------------------------------------------------
   * Draws text instantly on the screen.
   * Often used by menus for data, and not for in-game dialogue.
   * ------------------------------------------------------------------------
   * @param {GameCanvas}  canvas   GameCanvas the text should be painted on
   * @param {String}      message  Text to be printed
   * ----------------------------------------------------------------------*/
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

  /**------------------------------------------------------------------------
   * SLOW PAINT
   * ------------------------------------------------------------------------
   * Draws text one character at a time.
   * Used mostly for dialogue.
   * ------------------------------------------------------------------------
   * @param {GameCanvas}  canvas   GameCanvas the text should be painted on
   * @param {String}      message  Text to be printed
   * @param {Function}    triggerRedraw Callback to redraw the screen
   * ----------------------------------------------------------------------*/
  slowPaint = (canvas, message, triggerRedraw) => {
    let ctx = canvas.ctx;

    let splitWords = message.split(" ");
    for(let i = 0; i < splitWords.length; i++){
      splitWords[i] = this.replaceSpecials(splitWords[i]);
    }
    this.clearTextBox(canvas);
    let c = 0; // Paint column
    let r = 0; // Paint row
    let word = 0;
    let char = 0;
    let paintInterval = setInterval(()=>{
      
      this.drawCharacter(ctx,splitWords[word][char],c,r);
      triggerRedraw();

      char++;
      c++;

      if(c === this.cols){ c = 0; r++ }
      if(r === this.rows){ /* TODO - Next frame... */ }

      if(char >= splitWords[word].length){ 
        if(c !== 0){
          this.drawCharacter(ctx, 'space', c, r);
          triggerRedraw();
          c++;
        }

        // If next word exists and its length plus the current spot is greater than the space available...
        //    go to a new row
        if(word + 1 <= splitWords.length - 1 && splitWords[word+1].length + c > this.cols){
          r++;
          c = 0;
        }

        char = 0; 
        word++; 
      }

      if(word >= splitWords.length){ clearInterval(paintInterval) } // Out of words, it's totally done

    },config.textSpeed * 33);
  }

  replaceSpecials = message => {
    // TODO - This is awful
    let modString = message;
        modString = modString.replaceAll('.M','^');
        modString = modString.replaceAll('.hp','%');
        modString = modString.replaceAll('.en','@');
    let modArray = modString.split('');

    for(let i = 0; i < modArray.length; i++){
      if(modArray[i] === '^') modArray[i] = 'dotM';
      if(modArray[i] === '%') modArray[i] = 'hp';
      if(modArray[i] === '@') modArray[i] = 'en';
      if(modArray[i] === ' ') modArray[i] = 'space';
      if(modArray[i] === '!') modArray[i] = 'exclamation';
      if(modArray[i] === '.') modArray[i] = 'period';
    }

    return modArray;
  }

  drawCharacter = (ctx,char,c,r) =>{
    ctx.drawImage(this.colors[0],
      fontData[char][0] * 64,fontData[char][1] * 64,
      64,64,
      ((8 * config.screenSize) * c) + ((this.x * 8) * config.screenSize), ((8 * config.screenSize) * r) + (this.y * 8) * config.screenSize,
      8 * config.screenSize, 8 * config.screenSize );
  }

  progressivePaint = speed => {
    // Paints one letter at a time. Used for messages, talking, etc.
  }

  paintToCanvas = canvas => {
    // canvas.
  }
}

export default TextManager;

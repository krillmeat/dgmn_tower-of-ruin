import config from "../config";
import { fontImages, fontData } from "../data/font.db";

class TextArea{
  constructor(x,y,width,height=1, colorizeCB){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.colorImages = {
      white: fontImages[1],
      green: fontImages[2],
      black: fontImages[0],
      darkGreen: fontImages[3]
    }

  /**------------------------------------------------------------------------
   * COLORIZE CALLBACK
   * ------------------------------------------------------------------------
   * Pass in the character and see if it should be a different color
   * ----------------------------------------------------------------------*/
    this.colorizeCB = colorizeCB ? (char,wholeString,index) => { return colorizeCB(char,wholeString,index) } : () => { return'none' };
  }

  /**------------------------------------------------------------------------
   * INSTANT TEXT
   * ------------------------------------------------------------------------
   * Sets up the message to be paintable
   *  TODO - Need to handle multi-line stuff
   * ------------------------------------------------------------------------
   * @param {Canvas.ctx}  ctx     Canvas ctx to draw on
   * @param {String}      message Text to paint
   * @param {String}      color   Which Color to write in
   * ----------------------------------------------------------------------*/
  // instantText = (ctx,message,color) => {
  //   let charArray = this.createCharArray(message);
  //   let h = 0;
  //   for(let w = 0; w < charArray.length; w++){
  //     let coord = this.getCharCoordinates(charArray[w]);

  //     // Colorizing - Pass in the character to see if there are special conditions
  //     //              If not, just use the original color
  //     let callbackColor = this.colorizeCB(charArray[w],charArray,w);
  //         callbackColor = callbackColor === "none" ? this.colorImages[color] : this.colorImages[callbackColor];
      
  //     // image, sX, sY, sW, sH, dX, dY, dW, dH || s = source | d = destination
  //     ctx.drawImage(callbackColor,
  //                   coord[0] * 64,coord[1] * 64,64,64,  // Original Font Image has Chars at 64px x 64px
  //                   ((w + this.x) * (8 * config.screenSize)),((h + this.y) * (8 * config.screenSize)),
  //                   8 * config.screenSize, 8 * config.screenSize);
  //   }
  // }

  instantText = (ctx,message,color) => {
    let wordArray = message.split(" ");
    let row = 0; let col = 0;

    for(let w = 0; w < wordArray.length; w++){
      let charArray = this.createCharArray(wordArray[w]);
      for(let c = 0; c < charArray.length; c++){
        this.drawChar(ctx,charArray[c],col,row,color);
        row = col + 1 >= this.width ? row + 1 : row;
        col = col + 1 >= this.width ? 0 : col + 1;
      }
      if(col !== 0){
        this.drawChar(ctx,'space',col,row,color);
        col++;
        if(col >= this.width) row = 0;
      }
      if(wordArray[w] < wordArray.length && wordArray[w].length + col > this.width){ row++; col = 0 }
    }
  }

  /**------------------------------------------------------------------------
   * TIMED TEXT
   * ------------------------------------------------------------------------
   * Sets up the message to be paintable
   * ------------------------------------------------------------------------
   * @param {Canvas.ctx}  ctx     Canvas ctx to draw on
   * @param {String}      message Text to paint
   * ----------------------------------------------------------------------*/
  timedText = (ctx,message,drawCB) => {
    let wordArray = message.split(" ");
    let word = 0; let char = 0;
    let r = 0; let c = 0;

    let paintInterval = setInterval(()=>{
      let charArray = this.createCharArray(wordArray[word]);  // Split word into Chars

      // Draw Char and Refresh Screen
      this.drawChar(ctx,charArray[char],c,r);
      drawCB();

      char++; // Iterate Char
      r = c + 1 >= this.width ? r + 1 : r;  // Move Row up if at the end of the Column
      c = c + 1 >= this.width ? 0 : c + 1;  // Move Column spot (goes to next row if out of room)

      if(char >= charArray.length){ // Done with Word
        word++; char = 0; // Go to next Word
        if(c !== 0) { // Draw a Space at the end of the word, but not if it's the first word on a new Row
          this.drawChar(ctx,'space',c,r); drawCB(); c++; 
          if(c >= this.width) r = 0 // In case of Space at the end of a Row
        }
        if(word < wordArray.length && wordArray[word].length + c > this.width){ r++; c = 0} // Prevents word from splitting across rows
      }
      
      if(word >= wordArray.length) clearInterval(paintInterval); // Done with Message
    },config.textSpeed * 33);
  }

  /**------------------------------------------------------------------------
   * DRAW CHARACTER
   * ------------------------------------------------------------------------
   * Draws a Character to the Text Area Canvas
   * ------------------------------------------------------------------------
   * @param {Canvas.ctx}  ctx   Canvas ctx to draw on
   * @param {String}      char  Character to Draw
   * @param {Number}      col   Column to draw at
   * @param {Number}      row   Row to draw at
   * @param {String}      color Color of text to draw
   * ----------------------------------------------------------------------*/
  drawChar = (ctx,char,col,row,color='white') => {
    let coord = this.getCharCoordinates(char);
    ctx.drawImage(this.colorImages[color],
                  coord[0] * 64, coord[1] * 64, 64,64,
                  (col+this.x)*config.tileSize,(row+this.y)*config.tileSize,config.tileSize,config.tileSize);
  }

  /**------------------------------------------------------------------------
   * CREATE CHARACTER ARRAY
   * ------------------------------------------------------------------------
   * Sets up the message to be paintable
   * ------------------------------------------------------------------------
   * @param {String}  message  Text to be painted
   * @returns Array of characters that can be painted
   * ----------------------------------------------------------------------*/
  createCharArray = message => {
    return this.returnSpecialCharacters(this.splitMessage(this.replaceSpecialCharacters(message)));
  }

  /**------------------------------------------------------------------------
   * REPLACE SPECIAL CHARACTERS
   * ------------------------------------------------------------------------
   * Goes through a Message and replaces Special Characters so it can be
   * split up easily
   * ------------------------------------------------------------------------
   * @param {String}  message  Text to be printed
   * @returns Message with the special characters swapped out
   * ----------------------------------------------------------------------*/
  replaceSpecialCharacters = message => {
    let modifiedMessage;
        modifiedMessage = message.replace(/\.M/g,'^');
        modifiedMessage = modifiedMessage.replace(/\.hp/g,'%');
        modifiedMessage = modifiedMessage.replace(/\.en/g,'$');
        modifiedMessage = modifiedMessage.replace(/\.lv/g,'@');
        modifiedMessage = modifiedMessage.replace(/\!/g,'#');
        modifiedMessage = modifiedMessage.replace(/\./g,'£');

    return modifiedMessage;
  }

  /**------------------------------------------------------------------------
   * RETURN SPECIAL CHARACTERS
   * ------------------------------------------------------------------------
   * Goes through the split up Char Array and puts the special characters
   * back so they are useable
   * ------------------------------------------------------------------------
   * @param {Array} charArray Array of individual characters
   * @returns Char Array with the special characters swapped out
   * ----------------------------------------------------------------------*/
  returnSpecialCharacters = charArray => {
    let modifiedCharArray = charArray;

    for(let i = 0; i < modifiedCharArray.length; i++){
      let char = modifiedCharArray[i];
      if(char === "^"){ modifiedCharArray[i] = "dotM" 
      } else if(char === " "){ modifiedCharArray[i] = "space" 
      } else if(char === "%"){ modifiedCharArray[i] = "hp"
      } else if(char === "$"){ modifiedCharArray[i] = "en" 
      } else if(char === "@"){ modifiedCharArray[i] = "lv" 
      } else if(char === "#"){ modifiedCharArray[i] = "exclamation" 
      } else if(char === "£"){ modifiedCharArray[i] = "period" 
      } else if(char === "-"){ modifiedCharArray[i] = "dash" }
    }

    return modifiedCharArray;
  }

  /**------------------------------------------------------------------------
   * SPLIT MESSAGE
   * ------------------------------------------------------------------------
   * Takes a message and splits it into individual Characters
   * ------------------------------------------------------------------------
   * @param {String}  message  Text to be printed
   * @returns Array of characters
   * ----------------------------------------------------------------------*/
  splitMessage = message => {
    return message.split("");
  }

  /**------------------------------------------------------------------------
   * GET CHARACTER COORDIANTES
   * ------------------------------------------------------------------------
   * Sets up the message to be paintable
   * ------------------------------------------------------------------------
   * @param {String}  char  Character to find
   * @returns Array of coordinates for the Character Location
   * ----------------------------------------------------------------------*/
  getCharCoordinates = char => {
    return fontData[char];
  }
}

export default TextArea;
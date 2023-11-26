import CFG from "../config";
import { fontImages, fontData } from "../data/font.db";
import { warningLog } from "../utils/log-utils";

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
    this.colorizeCB = colorizeCB ? (char,wholeString,index) => { return colorizeCB(char,wholeString,index) } : undefined;
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
  instantText = (ctx,message,color) => {
    let wordArray = message.split(" ");
    let row = 0; let col = 0;

    for(let w = 0; w < wordArray.length; w++){
      let charArray = this.createCharArray(wordArray[w]);
      for(let c = 0; c < charArray.length; c++){
        let modColor = this.colorizeCB ? this.colorizeCB(charArray[c],wordArray[w],c) : color;
            modColor = modColor === undefined || modColor === 'none' ? color : modColor; // Protect against bad colorizers
        this.drawChar(ctx,charArray[c],col,row,modColor);
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
    },CFG.textSpeed * 33);
  }

  /**------------------------------------------------------------------------
   * MULTI TEXT
   * ------------------------------------------------------------------------
   * Takes an array of Messages, and prints them all, one by one
   * ------------------------------------------------------------------------
   * @param {Canvas.ctx}  ctx         Canvas ctx to draw on
   * @param {Array}       messages    List of Messages
   * @param {Function}    drawCB      Parent's Draw Callback
   * @param {Function}    beforeEach  Function to run before each iteration
   * ----------------------------------------------------------------------*/
  multiText = (ctx,messages,drawCB,beforeEach) => {
    beforeEach();
    let currentMessage = messages[0];
    this.timedText(ctx,currentMessage,drawCB); // Timed Text draw the message
    messages.splice(0,1); // Remove currently printing message

    // If not done with messages, run it again after the delay
    setTimeout(()=>{if(messages && messages.length !== 0 && messages[0]) this.multiText(ctx,messages,drawCB,beforeEach)}, (currentMessage.length + 10) * 50);
  }

  /**------------------------------------------------------------------------
   * DRAW CHARACTER
   * ------------------------------------------------------------------------
   * Draws a Character to the Text Area Canvas
   * ------------------------------------------------------------------------
   * @param {Canvas.ctx}  ctx   Canvas ctx to draw on
   * @param {String}      char  Character to Draw
   * @param {Number}      col   Column to draw at : default = 0
   * @param {Number}      row   Row to draw at : default = 0
   * @param {String}      color Color of text to draw : default = "white"
   * ----------------------------------------------------------------------*/
  drawChar = (ctx,char,col=0,row=0,color='white') => {
    if(!ctx || !char){ warningLog('drawChar is missing a parameter'); return; }
    let coord = this.getCharCoordinates(char);
    ctx.drawImage(this.colorImages[color],
                  coord[0] * 64, coord[1] * 64, 64,64,
                  (col+this.x)*CFG.tileSize,(row+this.y)*CFG.tileSize,CFG.tileSize,CFG.tileSize);
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
   * TODO - Has to be a Regex way to do this way cleaner
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
   * TODO - Has to be a Regex way to do this way cleaner
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
      } else if(char === "-"){ modifiedCharArray[i] = "dash"
      } else if(char === '+'){ modifiedCharArray[i] = "plus" }
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
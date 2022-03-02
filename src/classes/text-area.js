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
   * CREATE CHARACTER ARRAY
   * ------------------------------------------------------------------------
   * Sets up the message to be paintable
   *  TODO - Need to handle multi-line stuff
   * ------------------------------------------------------------------------
   * @param {Canvas.ctx}  ctx     Canvas ctx to draw on
   * @param {String}      message Text to paint
   * @param {String}      color   Which Color to write in
   * ----------------------------------------------------------------------*/
  instantText = (ctx,message,color) => {
    let charArray = this.createCharArray(message);
    let h = 0;
    for(let w = 0; w < charArray.length; w++){
      let coord = this.getCharCoordinates(charArray[w]);

      // Colorizing - Pass in the character to see if there are special conditions
      //              If not, just use the original color
      let callbackColor = this.colorizeCB(charArray[w],charArray,w);
          callbackColor = callbackColor === "none" ? this.colorImages[color] : this.colorImages[callbackColor];
      
      // image, sX, sY, sW, sH, dX, dY, dW, dH || s = source | d = destination
      ctx.drawImage(callbackColor,
                    coord[0] * 64,coord[1] * 64,64,64,  // Original Font Image has Chars at 64px x 64px
                    ((w + this.x) * (8 * config.screenSize)),((h + this.y) * (8 * config.screenSize)),
                    8 * config.screenSize, 8 * config.screenSize);
    }
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
      } else if(char === "@"){ modifiedCharArray[i] = "lv" }
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
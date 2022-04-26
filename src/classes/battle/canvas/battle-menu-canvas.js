import config from "../../../config";
import GameCanvas from "../../canvas";
import TextArea from "../../text-area";

import MenuUtility from "../../menu/menu.util";

class BattleMenuCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.menuUtility = new MenuUtility();

    this.topTxt = new TextArea(0,1,20);
    this.dgmnNicknameTxt = new TextArea(4,14,10);
    this.dgmnSpeciesNameTxt = new TextArea(4,15,16);
    this.dgmnHPTxt = new TextArea(4,16,4,1, (char,wholeString,index) => { return this.dgmnHPENTxtColorize(char,wholeString,index) });
    this.dgmnENTxt = new TextArea(4,17,4,1, (char,wholeString,index) => { return this.dgmnHPENTxtColorize(char,wholeString,index) });
    this.dgmnLVTxt = new TextArea(16,14,4,1, (char,wholeString,index) => { return this.dgmnHPENTxtColorize(char,wholeString,index) });
  }

  setTopMessage = message => {
    this.ctx.clearRect(0,8*config.screenSize, 160*config.screenSize,8*config.screenSize);
    this.topTxt.instantText(this.ctx,message,'white');
  }

  /**------------------------------------------------------------------------
   * DRAW BOTTOM SECTION
   * ------------------------------------------------------------------------
   * Draws the Bottom Section of the Battle Screen for a Dgmn
   *  TODO - Right now, this is called from the Battle Menu as if it's the only
   *         way the bottom can be, but it can be Beetle, or Clear, etc.
   * ------------------------------------------------------------------------
   * @param {Object}  dgmnData  Object of properties the Bottom Section needs
   * ----------------------------------------------------------------------*/
  drawBottomSection = dgmnData => {
    this.ctx.clearRect(0,14*8*config.screenSize,20*8*config.screenSize,4*8*config.screenSize);
    this.drawNickname(this.dgmnNicknameTxt,dgmnData.nickname);
    this.dgmnSpeciesNameTxt.instantText(this.ctx,dgmnData.speciesName+".MON","green");
    this.dgmnHPTxt.instantText(this.ctx,".hp"+this.menuUtility.prependZeros(dgmnData.currentHP,3),"white");
    this.dgmnENTxt.instantText(this.ctx,".en"+dgmnData.currentEN,"white");
    this.drawLevel(this.dgmnLVTxt,dgmnData.currentLevel);
    this.drawDgmnPortrait(dgmnData.portrait);
  }

  /**------------------------------------------------------------------------
   * DRAW NICKNAME
   * ------------------------------------------------------------------------
   * Draws the Nickname of the Dgmn in a Text Area
   * ------------------------------------------------------------------------
   * @param {String}  nickname Nickname of the Dgmn
   * ----------------------------------------------------------------------*/
  drawNickname = (textArea,nickname) => {
    textArea.instantText(this.ctx,nickname,"white");
  }

  /**------------------------------------------------------------------------
   * DRAW LEVEL
   * ------------------------------------------------------------------------
   * Draws the Level of the Dgmn in a Text Area
   * ------------------------------------------------------------------------
   * @param {Number}  level Current Level of the Dgmn
   * ----------------------------------------------------------------------*/
  drawLevel = (textArea,level) => {
    textArea.instantText(this.ctx,".lv"+this.menuUtility.prependZeros(level,3),"white");
  }

 /**------------------------------------------------------------------------
   * DRAW DGMN PORTRAIT
   * ------------------------------------------------------------------------
   * Draws the Portrait of the Dgmn in the Bottom Section
   * ------------------------------------------------------------------------
   * @param {Image} portraitImg Portrait Image Elem for the Dgmn
   * ----------------------------------------------------------------------*/
  drawDgmnPortrait = portraitImg => {
    this.ctx.drawImage(portraitImg,0,0,256,248,
                       0, 112 * config.screenSize,32*config.screenSize,(32-1)*config.screenSize);
  }

 /**------------------------------------------------------------------------
   * DRAW MENU BUTTONS
   * ------------------------------------------------------------------------
   * Gets the correct images for a Menu and Draws them where they need to go
   * Sets the correctly selected Button as well
   * ------------------------------------------------------------------------
   * @param {String}  selected  Which Button is selected
   * @param {Object}  images    Object of select and deselect Images
   * @param {Array}   coord     Coordinates for the start of the buttons [0,0]
   * ----------------------------------------------------------------------*/
  drawMenuButtons = (selected,images,coord) => {
    let buttonCount = Object.keys(images).length;
    this.ctx.clearRect((coord[0] * 8)*config.screenSize,(coord[1] * 8)*config.screenSize,
                       (buttonCount*16)*config.screenSize,16*config.screenSize);
    let offset = 0;
    for(let image in images){
      let img = image === selected ? images[image].selected : images[image].deselected;
      this.ctx.drawImage(img, ((offset * 16 ) + (coord[0] * 8))*config.screenSize,(coord[1] * 8)*config.screenSize, 
                        16*config.screenSize,16*config.screenSize);
      offset++;
    }
  }

  /**------------------------------------------------------------------------
   * PAINT CURRENT CURSOR
   * ------------------------------------------------------------------------
   * Draws the cursor at the correct index
   * ------------------------------------------------------------------------
   * @param {Number}  battleIndex Spot the Dgmn is in
   * @param {Image}   image       Cursor Image
   * ----------------------------------------------------------------------*/
  paintCurrentCursor = (battleIndex,image) => {
    this.paintImage(image,80*config.screenSize,(24+(battleIndex*32))*config.screenSize);
  }

  // TODO - Moved to Target Select
  clearCurrentCursors = isEnemy => {
    let xOffset = !isEnemy ? 72 : 56;
    this.ctx.clearRect(xOffset*config.screenSize,16*config.screenSize,
      24*config.screenSize,96 * config.screenSize);
  }

  // TODO - Moved to Target Select
  setCurrentTargetCursor = (battleIndex,image) => {
    this.clearCurrentCursors(true);
    this.paintImage(image,
    64*config.screenSize, ((battleIndex * 32) + 24)*config.screenSize);
  }

  // TEXT AREA CALCS
  dgmnHPENTxtColorize = (char,wholeString,index) => {
    let color = 'none';
    if(char === 'hp' || char === 'en' || char === 'lv'){ color = 'green' 
    } else if( (char === '0' && index === 1) || (char === '0' && index === 2 && wholeString[1] === '0') ){ color = 'darkGreen'}
    return color;
  }
}

export default BattleMenuCanvas;
import GameCanvas from "../../classes/canvas";
import TextArea from "../../classes/text-area";
import ContinueCursor from "../../classes/menu/continue-cursor";

/**------------------------------------------------------------------------
 * DUNGEON TEXT CANVAS
 * ------------------------------------------------------------------------
 * Handles the Text Box that pops up when exploring the Dungeon
 * ------------------------------------------------------------------------
 * SUPER
 * @param {String}  canvasClass               Class Name for the Canvas
 * @param {Number}  width                     Width of the Canvas (x Screen Size)
 * @param {Number}  height                    Height of the Canvas (x Screen Size)
 * @param {Number}  x                         X Position of the Canvas (x Screen Size)
 * @param {Number}  y                         Y Position of the Canvas (x Screen Size)
 * @param {Boolean} hasIdleAnimation          True if Canvas should animate
 * @param {Func}    gameScreenRedrawCallback  Callback to Redraw Game Canvas
 * ----------------------------------------------------------------------*/
class DungeonTextCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.dungeonTxt = new TextArea(0,14,20,4);  // Action Text Area
  }

  /**------------------------------------------------------------------------
   * DRAW CONTINUE CURSOR 
   * ------------------------------------------------------------------------
   * Draws the blinking down arrow when Text is ready to be continued
   * TODO - Already exists in Menu Canvas, should I just move it to Game Canvas? 
   * ------------------------------------------------------------------------
   * @param {Image} continueCursorImg Ref to Cursor Image
   * @param {Func}  drawCB            CB for Canvas redraw 
   * ----------------------------------------------------------------------*/
  drawContinueCursor = (continueCursorImg,drawCB) => {
    this.continueCursor = new ContinueCursor(continueCursorImg,this.paintCanvas,drawCB);
    this.continueCursor.blink();
  }
}

export default DungeonTextCanvas;

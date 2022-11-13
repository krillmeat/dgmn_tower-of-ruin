import CFG from "../../config";
import GameCanvas from "../../classes/canvas";

/**------------------------------------------------------------------------
 * FLOOR CANVAS
 * ------------------------------------------------------------------------
 * Canvas for the Dungeon Floor
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
class FloorCanvas extends GameCanvas{
  constructor(...args){
    super(...args);
  }

  /**------------------------------------------------------------------------
   * DRAW ROOM
   * ------------------------------------------------------------------------
   * Paints a Room
   * ------------------------------------------------------------------------
   * @param {Image} image     What to draw
   * @param {Array} position  Where to draw [0,0]
   * ----------------------------------------------------------------------*/
   drawRoom = (image,position) => {
    let roomX = position[1] * 16 * 8;
    let roomY = position[0] * 16 * 8;
    this.paintImage(image,roomX * CFG.screenSize, roomY * CFG.screenSize);
  }

  /**------------------------------------------------------------------------
   * DRAW TILE
   * ------------------------------------------------------------------------
   * Paints an image on 1 specific tile
   * ------------------------------------------------------------------------
   * @param {Image} image What to draw
   * @param {Array} room  Coordinates of the Room
   * @param {Array} tile  Coordinates of the Tile
   * ----------------------------------------------------------------------*/
  drawTile = (image,room,tile) => {
    let roomXOffset = room[1] * 16 * 8;
    let roomYOffset = room[0] * 16 * 8;
    let tileXOffset = tile[1] * 16;
    let tileYOffset = tile[0] * 16;
    this.paintImage(image,(roomXOffset+tileXOffset)*CFG.screenSize,(roomYOffset+tileYOffset)*CFG.screenSize);
  }

  /**------------------------------------------------------------------------
   * REDRAW
   * ------------------------------------------------------------------------
   * Standard Refresh of Dungeon Screen
   * ------------------------------------------------------------------------
   * @param {Image} image     What to draw
   * @param {Array} position  Where to draw [0,0]
   * ----------------------------------------------------------------------*/
  redraw = () => {
    this.blackFill();
    this.paintCanvas(this)
  }
}

export default FloorCanvas;

import GameCanvas from "../canvas";
import config from '../../config';

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
    this.paintImage(image,roomX * config.screenSize, roomY * config.screenSize);
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
    this.paintImage(image,(roomXOffset+tileXOffset)*config.screenSize,(roomYOffset+tileYOffset)*config.screenSize);
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
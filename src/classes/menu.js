import MenuUtility from "./menu/menu.util";
import ContinueCursor from "./menu/continue-cursor";
import GameCanvas from "./canvas";

/**------------------------------------------------------------------------
 * MENU
 * ------------------------------------------------------------------------
 * Parent Menu that contains specific Sub Menus
 * ----------------------------------------------------------------------*/
class Menu{
  constructor(systemAH,gameAH,parentAH,menuLabel){
    this.currState = 'loading';                   // Current Spot in the Menu
    this.currSubMenu;                             // Label of the current Sub Menu
    this.subMenus = {}                            // Object containing all Sub Menus
    this.menuLabel = menuLabel;                   // Label of THIS Menu

    this.systemAH = systemAH;                     // AH for the System
    this.gameAH = gameAH;                         // AH for the Game
    this.parentAH = parentAH;                     // AH for the Menu's Parent Class

    this.menuCanvas = new GameCanvas(menuLabel,160,144);  // Canvas for the Menu
    this.menuUtility = new MenuUtility();         // Utilities for all Menus
  }
    
  /**------------------------------------------------------------------------
   * INITIALIZER
   * ------------------------------------------------------------------------
   * Gets the Menu Ready to go
   * ------------------------------------------------------------------------
   * @param {String}  backImage Name of Image to draw in the background
   * ----------------------------------------------------------------------*/
  init = (backImage) => {
    if(backImage) this.menuCanvas.paintImage(this.systemAH.fetchImage(backImage),0,0)
  }
    
  /**------------------------------------------------------------------------
   * ADD SUB MENU
   * ------------------------------------------------------------------------
   * Add a Sub Menu to the parent Menu
   * ------------------------------------------------------------------------
   * @param {String}  label  Name/Label for the sub menu
   * @param {SubMenu} menu  Sub Menu Class Instance
   * ----------------------------------------------------------------------*/
  addSubMenu = (label,menu) => {
    this.subMenus[label] = menu;
  }
  
  /**------------------------------------------------------------------------
   * REMOVE SUB MENU
   * ------------------------------------------------------------------------
   * Remove a Sub Menu to the parent Menu
   * ------------------------------------------------------------------------
   * @param {String}  label  Name/Label for the sub menu
   * ----------------------------------------------------------------------*/
  removeSubMenu = label => {
    if(this.subMenus[label]) delete this.subMenus[label];
  }
  
  /**------------------------------------------------------------------------
   * BUILD ICON IMAGES
   * ------------------------------------------------------------------------
   * Fetches images used by Icon Sub Menus
   * ------------------------------------------------------------------------
   * @param {Array}  labels  List of icon labels
   * ----------------------------------------------------------------------*/
  buildIconImages = labels => {
    let images = {};

    for(let label of labels){
      images[label] = {
        selected: this.systemAH.fetchImage(`${label}Selected`),
        deselected: this.systemAH.fetchImage(`${label}Deselected`)
      }
    }

    return images;
  }
  
  /**------------------------------------------------------------------------
   * DRAW CONTINUE CURSOR
   * ------------------------------------------------------------------------
   * Paints the Continue Cursor on the screen, to let the player know they
   *   can hit 'action' to move on
   * ------------------------------------------------------------------------
   * @param {Image}     continueCursorImg Image of the Continue Cursor
   * @param {Function}  drawCB            Callback function for where to draw
   * ----------------------------------------------------------------------*/
  drawContinueCursor = (continueCursorImg,drawCB) => {
    this.continueCursor = new ContinueCursor(continueCursorImg,this.menuCanvas?.paintCanvas,drawCB);
    this.continueCursor.blink();
  }

  /**------------------------------------------------------------------------
   * ATTACH IMAGE CALLBACKS
   * ------------------------------------------------------------------------
   * Attaches the Image-related Callbacks to a Sub Menu
   * ------------------------------------------------------------------------
   * @param {String}  label SubMenu Label
   * ----------------------------------------------------------------------*/
  attachImageCallbacks = label => {
    this.subMenus[label].fetchImageCB = img => { return this.systemAH.fetchImage(img) }
    this.subMenus[label].redrawParentCB = () => { this.drawMenu() }
  }

  /**------------------------------------------------------------------------
   * DRAW BACKGROUND
   * ------------------------------------------------------------------------
   * Draws a solid image over the current Canvas
   * ------------------------------------------------------------------------
   * @param {String}  imageName Name of the Image to Draw
   * ----------------------------------------------------------------------*/
  drawBackground = imageName => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage(imageName),0,0);
  }

  getState = () => this.currState
}

export default Menu;

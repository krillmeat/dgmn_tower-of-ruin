// titleScreen
import { debugLog } from "../../utils/log-utils";
import TitleAH from "../action-handlers/title.ah";
import TitleIO from "../input-output/title.io";
import Menu from "../menu";
import ListMenu from "../menu/list-menu";
import MenuCanvas from "../menu/menu-canvas";

class TitleMenu extends Menu{
  constructor(...args){
    super(...args);

    this.menuCanvas = new MenuCanvas('titleMenu',160,144); 
    this.titleAH = new TitleAH({
      startNewGameCB: this.startNewGame
    })
    this.titleMenuIO = new TitleIO();

    this.atTitle = true;                                  // Whether or not the Title Screen is currently showing
  }

  init = () => {
    // TODO - I need to make this a general function...
    this.menuCanvas.paintImage(this.systemAH.fetchImage('titleScreen'),0,0)
    this.addSubMenu('titleMain',new ListMenu([4,13],1,10,1,['New Game','Continue'],this.systemAH.fetchImage('miniCursor'),null,'titleMain'));
    this.subMenus.titleMain.isVisible = true;
    this.subMenus.titleMain.isActive = true;
    this.subMenus.titleMain.cursorOffset = 1;
    this.subMenus.titleMain.drawMenu();
    this.drawMenu();

    // TODO - Can I do this in the constructor?
    this.titleMenuIO.gameAH = this.gameAH;
    this.titleMenuIO.titleAH = this.titleAH;
  }

  /**------------------------------------------------------------------------
   * DRAW MENU
   * ------------------------------------------------------------------------
   * Draws all of the currently Visible Menus' Canvases
   * ----------------------------------------------------------------------*/
     drawMenu = () => {
      for(let key in this.subMenus){
        if(this.subMenus[key].isVisible){
          this.menuCanvas.paintCanvas(this.subMenus[key].menuCanvas);
        } 
      }

      this.gameAH.refreshScreen();
    }

    
    /**------------------------------------------------------------------------
     * START NEW GAME
     * ------------------------------------------------------------------------
     * Runs all the logic for when a New Game is Selected
     * TODO - This is all skipping along farther than the actual game will
     * ----------------------------------------------------------------------*/
    startNewGame = () => {
      debugLog("Starting New Game...");
      this.gameAH.startNewGame();
    }
}

export default TitleMenu;

import { townDgmnPortraits, townImages } from "../data/images.db";
import GameCanvas from "../classes/canvas";
import TownMenu from "./town.menu";
import TownAH from "./helpers/town.ah";
import TownIO from "./helpers/town.io";
import { debugLog } from "../utils/log-utils";

/**------------------------------------------------------------------------
 * TOWN
 * ------------------------------------------------------------------------
 * The Game's Hub-world, filled with different areas to Chat, Shop, etc.
 * One of the three main Root Classes
 * ------------------------------------------------------------------------
 * @param {Class} systemAH  Action Handler for the System
 * @param {Class} gameAH    Action Handler for the Game
 * ----------------------------------------------------------------------*/
class Town{
  constructor(systemAH,gameAH){
    this.systemAH = systemAH; this.gameAH = gameAH;
    this.state = 'tower'; // TODO - Default to Map 
    this.inTown = false;  // Used by the Key Manager

    // Town Action Handler
    this.townAH = new TownAH({
      drawTownCB: this.drawTown,
      enterTowerCB: this.enterTower
    });

    this.townIO = new TownIO(this.townAH);

    this.townCanvas = new GameCanvas('dungeon-canvas',160,144);
    this.townMenu = new TownMenu(systemAH,gameAH,this.townAH,'town');

    // Current Levels of your Town's different spots
    this.townLevels = {
      tower: 0
    }
  }

  /**------------------------------------------------------------------------
   * INITIALIZE
   * ------------------------------------------------------------------------
   * Kicks things off
   * ----------------------------------------------------------------------*/
  init = () => {
    this.systemAH.startLoading(()=>{
      this.gameAH.addCanvasObject(this.townCanvas);

      this.systemAH.loadImages(townImages.concat(townDgmnPortraits), ()=>{
        this.inTown = true; // Let the Key Manager know you're in Town
        this.townMenu.buildScene('tower',this.townLevels.tower); // TODO - should default to Map
        this.drawTown();
        this.systemAH.stopLoading();
      });
    });
  }

  /**------------------------------------------------------------------------
   * ENTER TOWER                                                [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Initiates the Dungeon setup and Town clean-up
   * ----------------------------------------------------------------------*/
  enterTower = () => {
    debugLog("Entering Tower...");
    this.inTown = false; // Let the Key Manager know you've left Town
    // Call Game Dungeon Starter
    this.gameAH.buildDungeon();
  }

  /**------------------------------------------------------------------------
   * DRAW TOWN                                                  [[EXPORTED ]]
   * ------------------------------------------------------------------------
   * Paints the Town Elements to the Canvas and refreshes the Game Screen
   * ----------------------------------------------------------------------*/
  drawTown = () => {
    this.townCanvas.paintCanvas(this.townMenu.menuCanvas);
    this.gameAH.refreshScreen();
  }
}

export default Town;

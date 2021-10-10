import { debugLog } from "../utils/log-utils";
import Battle from "./battle";
import GameCanvas from "./canvas";
import Dgmn from "./dgmn";

class Game{
  constructor(paintToScreenCallback){
    debugLog('Game Created...');
    this.battle;

    this.gameCanvas = new GameCanvas('game-canvas',160,144);
    this.renderTimer;

    this.objectList = [];
  }

  bootGame = () => {
    // Shrug for now
  }

  startBattle = () => {
    debugLog("Starting Battle...");
    // TODO - ALL OF THIS IS TEMP RIGHT NOW
    this.battle = new Battle([
      new Dgmn(0,'agu',5),new Dgmn(1,'grey',5),new Dgmn(2,'agu',6)
    ],[
      new Dgmn(0,'agu',5)
    ],this.onBattleLoad,this.addToObjectList,this.drawGameScreen);
  }

  onBattleLoad = () => {
    console.log("Battle Loaded...");
    this.drawGameScreen();
  }

  addToObjectList = newObject => {
    this.objectList.push(newObject);
  }

  drawGameScreen = () => {
    this.gameCanvas.clearCanvas();
    for(let obj of this.objectList){
      this.gameCanvas.paintCanvas(obj);
    }
  }
}

export default Game;
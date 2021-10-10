import { debugLog } from "../utils/log-utils";

import BackgroundCanvas from "./background-canvas";
import Dgmn from "./dgmn";
import config from "../config";

class Battle {
  constructor(dgmnList,enemyDgmnList,loadedCallback,addObjectCallback,gameScreenRedrawCallback){
    this.dgmnList = dgmnList;
    this.enemyDgmnList = enemyDgmnList;

    this.loadedState = {
      battleBackgroundLoaded: false,
      party: {
        loadingDgmn: false,
        imagesLoaded: false,
        dgmnLoaded: false,
        dgmnLoadedCount: false
      },
      enemy: {
        loadingDgmn: false,
        imagesLoaded: false,
        dgmnLoaded: false,
        dgmnLoadedCount: false
      }
    }

    this.battleBackground = new BackgroundCanvas('background-canvas',160,144);

    this.triggerGameScreenRedraw = () => { gameScreenRedrawCallback() }
    this.addObject = newObject => { addObjectCallback(newObject) }
    
    this.loadBattle(loadedCallback);
  }

  /**------------------------------------------------------------------------
   * LOAD BATTLE
   * ------------------------------------------------------------------------
   * Interval used to load all images and data for a Battle
   * ------------------------------------------------------------------------
   * @param {Function} loadedCallback Function called after everything is loaded
   * ----------------------------------------------------------------------*/
  loadBattle = loadedCallback => {
    debugLog("-- Loading Battle");

    // Load Background
    this.battleBackground.loadImages(images => {
      this.battleBackground.imageStack = images;
      this.battleBackground.paintImage(this.battleBackground.imageStack[0]);
      this.loadedState.battleBackgroundLoaded = true;
      this.addObject(this.battleBackground);
    });

    // Start Interval
    let loadingInterval = setInterval(() => {

      // Load Party Dgmn
      if(this.loadedState.battleBackgroundLoaded && !this.loadedState.party.loadingDgmn){
        debugLog("---- Background Loaded");
        this.loadedState.party.loadingDgmn = true;
        this.loadDgmn(this.dgmnList,false);
      }

      // Load Enemy Dgmn
      if(this.loadedState.party.imagesLoaded && !this.loadedState.enemy.loadingDgmn){
        debugLog("---- Party Images Loaded");
        this.loadedState.enemy.loadingDgmn = true;
        this.addDgmnToObjectList(this.dgmnList,false);
        this.loadDgmn(this.enemyDgmnList,true);
      }

      // Done Loading
      if(this.loadedState.enemy.imagesLoaded){
        debugLog("---- Enemy Images Loaded");
        this.addDgmnToObjectList(this.enemyDgmnList,true);
      }
      
      // Every done? Stop Loading
      if(this.isBattleLoaded()){
        loadedCallback();
        clearInterval(loadingInterval);
      }
    }, 100);
  }

  addDgmnToObjectList = (dgmnList, isEnemy) => {
    for(let i = 0; i < dgmnList.length; i++){
      this.addObject(dgmnList[i].battleCanvas);
      if(i === dgmnList.length - 1){
        isEnemy ? 
          this.loadedState.enemy.dgmnLoaded = true : 
          this.loadedState.party.dgmnLoaded = true;
      }
    }
  }

  loadDgmn = (dgmnList,isEnemy) => {
    for(let i = 0; i < dgmnList.length; i++){
      let dgmn = dgmnList[i];
      dgmn.initBattleCanvas(this.triggerGameScreenRedraw);
      dgmn.battleCanvas.x = isEnemy ? 
                            2 * (16 * config.screenSize) : 
                            6 * (16 * config.screenSize);
      dgmn.battleCanvas.y = (16 * config.screenSize)+( (33 * i * config.screenSize));

      dgmn.battleCanvas.loadImages(images => {
        isEnemy ? 
          this.loadedState.enemy.dgmnLoadedCount++ : 
          this.loadedState.party.dgmnLoadedCount++;
        dgmn.battleCanvas.imageStack = images;
        dgmn.battleCanvas.paintImage(dgmn.battleCanvas.imageStack[0],isEnemy);
        let speed = 1000 - (Math.floor(dgmn.baseStats[8]*2) * 33); // DGMN with a higher base speed will idle faster
        dgmn.battleCanvas.animate(speed);
        isEnemy ? 
          this.loadedState.enemy.imagesLoaded = this.loadedState.enemy.dgmnLoadedCount >= dgmnList.length : 
          this.loadedState.party.imagesLoaded = this.loadedState.party.dgmnLoadedCount >= dgmnList.length;
      });
    }
  }

  isBattleLoaded = () => {
    return (this.loadedState.battleBackgroundLoaded && 
            this.loadedState.party.dgmnLoaded && 
            this.loadedState.enemy.dgmnLoaded);
  }

  generateEnemies = encounterData => {
    // new Dgmn / enemy
  }

  attack = (target, attacker) => {

  }
}

export default Battle;
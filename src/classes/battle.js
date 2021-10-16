import { debugLog } from "../utils/log-utils";

import BackgroundCanvas from "./background-canvas";
import Dgmn from "./dgmn";
import config from "../config";
import BattleMenu from "./menu/battle-menu";
import { battleImages } from "../data/images.db";
import Attack from "./attack";

class Battle {
  constructor(dgmnList,enemyDgmnList,loadedCallback,addObjectCallback,gameScreenRedrawCallback, loadImageCallback, fetchImageCallback){
    this.battleActive = true;
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
      },
      menu: {
        loadingMenu: false,
        imagesLoaded: false
      }
    }

    this.triggerGameScreenRedraw = () => { gameScreenRedrawCallback() }
    this.addObject = newObject => { addObjectCallback(newObject) }

    this.loadImages = (imageList,callback) => { loadImageCallback(imageList,callback) }
    this.fetchImage = imageName => { return fetchImageCallback(imageName) }

    this.battleBackground = new BackgroundCanvas('background-canvas',160,144);
    this.battleMenu = new BattleMenu(this.dgmnList.concat(this.enemyDgmnList),gameScreenRedrawCallback, loadImageCallback, this.fetchImage);

    this.onLoaded = () => {loadedCallback()}
    this.loadBattle();
  }

  /**------------------------------------------------------------------------
   * LOAD BATTLE
   * ------------------------------------------------------------------------
   * Interval used to load all images and data for a Battle
   * ------------------------------------------------------------------------
   * @param {Function} loadedCallback Function called after everything is loaded
   * ----------------------------------------------------------------------*/
  loadBattle = () => {
    debugLog("-- Loading Battle");

    this.loadBattleImages(() => {
      // LOAD DATA

      this.loadDgmn(this.dgmnList,false);
      this.addDgmnToObjectList(this.dgmnList,false);

      this.loadDgmn(this.enemyDgmnList,true);
      this.addDgmnToObjectList(this.enemyDgmnList,true);

      this.addObject(this.battleMenu.menuCanvas);
      this.battleMenu.buildBattleMenus();
      this.battleMenu.paintInitialCanvas();
      
      this.onLoaded();
    });
  }

  /**------------------------------------------------------------------------
   * LOAD BATTLE IMAGES
   * ------------------------------------------------------------------------
   * Adds all of the Battle Images together into one Array and sends them
   *   to the image manager to be loaded
   * ------------------------------------------------------------------------
   * @param {Function} loadedCallback Function called after everything is loaded
   * ----------------------------------------------------------------------*/
  loadBattleImages = loadedCallback => {
    // Get all of the Dgmn-related Images together
    let allDgmn = this.dgmnList.concat(this.enemyDgmnList);
    let dgmnImages = [];
    for(let i = 0; i < allDgmn.length; i++){
      let urlOne = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Idle0.png`;
      let urlTwo = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Idle1.png`;
      let urlThree = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Portrait.png`;
      if(!dgmnImages.includes(urlOne)){
        dgmnImages.push(urlOne);
        dgmnImages.push(urlTwo);
        dgmnImages.push(urlThree);
      }
    }

    let allImages = battleImages.concat(dgmnImages); // Battle Images + Dgmn Images

    this.loadImages(allImages, () => {
      this.battleBackground.imageStack = [this.fetchImage('battleBackground')];
      this.battleBackground.paintImage(this.battleBackground.imageStack[0]);
      this.addObject(this.battleBackground);

      loadedCallback();
    });
  }

  /**------------------------------------------------------------------------
   * ADD DGMN TO OBJECT LIST
   * ------------------------------------------------------------------------
   * Sends the Dgmn canvas to the Game Screen for rendering
   * ------------------------------------------------------------------------
   * @param {Array} dgmnList List of Dgmn
   * ----------------------------------------------------------------------*/
  addDgmnToObjectList = (dgmnList) => {
    for(let i = 0; i < dgmnList.length; i++){
      this.addObject(dgmnList[i].battleCanvas);
    }
  }

  /**------------------------------------------------------------------------
   * LOAD DGMN
   * ------------------------------------------------------------------------
   * Load all of the dgmn data and Images
   * ------------------------------------------------------------------------
   * @param {Array}   dgmnList List of Dgmn
   * @param {Boolean} isEnemy Whether or not the Dgmn is Party or Enemy
   * ----------------------------------------------------------------------*/
  loadDgmn = (dgmnList,isEnemy) => {
    for(let i = 0; i < dgmnList.length; i++){
      let dgmn = dgmnList[i];
      
      // TODO - Remove this, this manually loads the Dgmn, but that shouldn't
      //        have to be done
      dgmn.buildDgmn();
      dgmn.loadDgmn({permAttacks: [new Attack('babyFlame')]})

      let imageStack = [
        this.fetchImage(`${dgmn.name.toLowerCase()}Idle0`),
        this.fetchImage(`${dgmn.name.toLowerCase()}Idle1`)
      ];

      dgmn.initBattleCanvas(this.triggerGameScreenRedraw, imageStack);
      dgmn.battleCanvas.x = isEnemy ? 
                            2 * (16 * config.screenSize) : 
                            6 * (16 * config.screenSize);
      dgmn.battleCanvas.y = (16 * config.screenSize)+( (32 * i * config.screenSize));
      dgmn.battleCanvas.paintImage(dgmn.battleCanvas.imageStack[0],0,0,isEnemy);
      let speed = 1200 - (Math.floor(dgmn.baseStats[8]*2) * 33);
      dgmn.battleCanvas.animate(speed);
    }
  }

  generateEnemies = encounterData => {
    // new Dgmn / enemy
  }

  /**------------------------------------------------------------------------
   * ATTACK
   * ------------------------------------------------------------------------
   * Have one Dgmn attack another
   * ------------------------------------------------------------------------
   * @param {Dgmn}    target    Dgmn getting hit by the attack
   * @param {Dgmn}    attacker  Dgmn doing the attacking
   * @param {Attack}  attack    Attack being used  
   * ----------------------------------------------------------------------*/
  attack = (target, attacker, attack) => {
    let atkDefDiff = attacker.currStats[2] / target.currStats[3];
    let preMods = ( ( atkDefDiff * attacker.level ) / 2 ) * attack.power;
    let postMods = preMods * 1; // TODO - Add all of the mods
    target.currHP -= postMods;
    this.battleMenu.updateAllStatusBars();
  }

  keyTriage = key => {
    if(key === 'action'){
      this.actionKeyHandler();
    } else if(key === 'cancel'){
      this.cancelKeyHandler();
    } else if(key === 'right'){
      this.rightKeyHandler();
    } else if(key === 'left'){
      this.leftKeyHandler();
    }
  }

  actionKeyHandler = () => {
    if(this.battleMenu.currentState === 'dgmn'){
      if(this.battleMenu.menus.dgmn.currentIndex === 0){
        this.battleMenu.launchDgmnAttackMenu();
      }
    } else if(this.battleMenu.currentState === 'attack'){
      let chosenAttack = this.battleMenu.dgmnAttackMenu.attackList[this.battleMenu.dgmnAttackMenu.currentChoice];
      this.battleMenu.selectedAttack = chosenAttack;
      console.log("SELECTED ATTACK = ",this.battleMenu.selectedAttack);
      this.battleMenu.launchSelectTarget();
    } else if(this.battleMenu.currentState === 'targetSelect'){
      this.battleMenu.menuCanvas.ctx.clearRect( 8 * (8 * config.screenSize), 2 * (8 * config.screenSize), 2 * (8 * config.screenSize), 12 * (8 * config.screenSize) );
      this.triggerGameScreenRedraw();
      this.attack(this.enemyDgmnList[this.battleMenu.menus.targetSelect.currentIndex],this.dgmnList[this.battleMenu.currentDgmnActor],this.battleMenu.selectedAttack);
    }
  }

  rightKeyHandler = () => {
    if(this.battleMenu.currentState === 'dgmn'){
      let newIndex = this.battleMenu.menus.dgmn.currentIndex === this.battleMenu.menus.dgmn.totalIcons -1 ? 0 : this.battleMenu.menus.dgmn.currentIndex + 1;
      this.battleMenu.setCurrentIcon(newIndex);
    } 
  }

  leftKeyHandler = () => {
    if(this.battleMenu.currentState === 'dgmn'){
      let newIndex = this.battleMenu.menus.dgmn.currentIndex === 0 ? this.battleMenu.menus.dgmn.totalIcons -1 : this.battleMenu.menus.dgmn.currentIndex - 1;
      this.battleMenu.setCurrentIcon(newIndex);
    } 
  }

  cancelKeyHandler = () => {
    if(this.battleMenu.currentState === 'attack'){
      this.battleMenu.currentState = 'dgmn';
      this.battleMenu.closeDgmnAttackMenu();
    }
  }
}

export default Battle;
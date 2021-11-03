import { debugLog } from "../utils/log-utils";

import BackgroundCanvas from "./background-canvas";
import config from "../config";
import BattleMenu from "./menu/battle-menu";
import { battleImages } from "../data/images.db";
import Attack from "./attack";
import { comboRanks, powerRanks } from "../data/ranks.db";
import { attacksDB } from "../data/attacks.db";
import GameCanvas from "./canvas";

class Battle {
  constructor(dgmnList,enemyDgmnList,loadedCallback,addObjectCallback,gameScreenRedrawCallback, loadImageCallback, fetchImageCallback){
    this.battleActive = true;
    this.dgmnList = dgmnList;
    this.enemyDgmnList = enemyDgmnList;
    this.battleResult = 'ongoing';
    this.turn = 0;

    this.attackActions = {};

    this.triggerGameScreenRedraw = () => { gameScreenRedrawCallback() }
    this.addObject = newObject => { addObjectCallback(newObject) }

    this.loadImages = (imageList,callback) => { loadImageCallback(imageList,callback) }
    this.fetchImage = imageName => { return fetchImageCallback(imageName) }

    this.loadedAttacks = [];

    this.battleBackground = new BackgroundCanvas('background-canvas',160,144);
    this.battleMenu = new BattleMenu(this.dgmnList.concat(this.enemyDgmnList),gameScreenRedrawCallback, loadImageCallback, this.fetchImage);

    this.attackCanvas = new GameCanvas('attack-canvas',160,144);

    this.onLoaded = () => {loadedCallback()}
    this.loadBattle();
  }

  /**------------------------------------------------------------------------
   * LOAD BATTLE
   * ------------------------------------------------------------------------
   * Loads all data and then preps the menus.
   * Relies on all Battle Images being loaded
   * ----------------------------------------------------------------------*/
  loadBattle = () => {
    debugLog("-- Loading Battle");

    this.loadBattleImages(() => {

      // Load Player Dgmn
      this.loadDgmn(this.dgmnList,false);
      this.addDgmnToObjectList(this.dgmnList,false);

      // Load Enemy Dgmn
      this.loadDgmn(this.enemyDgmnList,true);
      this.addDgmnToObjectList(this.enemyDgmnList,true);

      // Setup Initial Battle Menu
      this.addObject(this.battleMenu.menuCanvas);
      this.battleMenu.buildBattleMenus();
      this.battleMenu.fullMenuPaint();

      // Load Attack Canvas
      this.addObject(this.attackCanvas);
      
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
      // TODO - I need to push these to an array, and loop them, rather than declaring each
      let urlOne = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Idle0.png`;
      let urlTwo = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Idle1.png`;
      let attackUrl = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Attack.png`;
      let hurtUrl = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Hurt.png`;
      let urlThree = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Portrait.png`;
      if(!dgmnImages.includes(urlOne)){
        dgmnImages.push(urlOne);
        dgmnImages.push(urlTwo);
        dgmnImages.push(urlThree);
        dgmnImages.push(attackUrl);
        dgmnImages.push(hurtUrl);
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

      let imageStack = [
        this.fetchImage(`${dgmn.name.toLowerCase()}Idle0`),
        this.fetchImage(`${dgmn.name.toLowerCase()}Idle1`),
        this.fetchImage(`${dgmn.name.toLowerCase()}Attack`),
        this.fetchImage(`${dgmn.name.toLowerCase()}Hurt`)
      ];

      dgmn.initBattleCanvas(this.triggerGameScreenRedraw, imageStack);
      dgmn.battleCanvas.x = isEnemy ? 
                            2 * (16 * config.screenSize) : 
                            6 * (16 * config.screenSize);
      dgmn.battleCanvas.y = (16 * config.screenSize)+( (32 * i * config.screenSize));
      dgmn.battleCanvas.paintImage(dgmn.battleCanvas.imageStack[0],0,0,isEnemy);
      let speed = 1200 - (Math.floor(dgmn.baseStats[7]*2) * 33);
      dgmn.battleCanvas.animate(speed);
    }
  }

  /**------------------------------------------------------------------------
   * GENERATE ENEMIES
   * ------------------------------------------------------------------------
   * Builds the Encounter Enemies based off data
   * ----------------------------------------------------------------------*/
  generateEnemies = encounterData => {
    // new Dgmn / enemy
  }

  /**------------------------------------------------------------------------
   * GENERATE ENEMY ATTACKS
   * ------------------------------------------------------------------------
   * Builds the Enemy Attacks and adds them to the Actions
   * ----------------------------------------------------------------------*/
  generateEnemyAttacks = () => {
    // TODO - This is manual right now, needs to have a BUNCH of logic and Data here...
    this.attackActions[4] = {
      attacker: this.enemyDgmnList[0],
      target: this.dgmnList[0],
      attack: new Attack('babyFlame')
    }
  }

  /**------------------------------------------------------------------------
   * SETUP ORDER
   * ------------------------------------------------------------------------
   * Organizes the Battle Order for Dgmn based on their Speed
   * ----------------------------------------------------------------------*/
  setupOrder = () => {
    let order = this.dgmnList.concat(this.enemyDgmnList);

    for(let i = 0; i < order.length; i++){
      for(let r = 0; r < order.length - 1; r++){
        let temp = order[r];
        let currSpeed = order[r].currStats[7];
        let nextSpeed = order[r+1].currStats[7];
        if(currSpeed < nextSpeed){
          order[r] = order[r+1];
          order[r+1] = temp;
        }
      }
    }

    return order;
  }

  buildAttackImageList = attackList => {
    let imagesList = [];
    for(const prop in attackList){
      let attackName = attackList[prop].attack.attackName;
      if(!this.loadedAttacks.includes(attackName)){
        this.loadedAttacks.push(attackName);
        for(let r = 0; r < attacksDB[attackName].animationFrameCount; r++){
          let url = `./sprites/Battle/Attacks/${attackName}${r+1}.png`;
          if(!imagesList.includes(url)) imagesList.push(url);
        }
      }
    }
    return imagesList;
  }

  loadAttacks = () => {

    this.battleMenu.clearBottomData(true);

    let attackImageList = this.buildAttackImageList(this.attackActions);

    if(attackImageList.length !== 0){
      this.loadImages(attackImageList, () => {
        this.runAttacks();
      });
    } else{ this.runAttacks() }
  }

  /**------------------------------------------------------------------------
   * RUN ATTACKS
   * ------------------------------------------------------------------------
   * Once all of the Attacks have been chosen, and the Enemy Attacks have
   *   been generated, run through the Attacks
   * ----------------------------------------------------------------------*/
  runAttacks = () => {
    let turnOrder = this.setupOrder();
    let i = 0;
    let prevI = -1;

    // Runs every frame and checks for the currently attacking Dgmn to be 'done'
    let attackInterval = setInterval(()=>{
      if(i !== prevI){
        prevI = i;
        if(!turnOrder[i].isDead){
          this.attack(this.attackActions[turnOrder[i].dgmnId]);
        }
      }
  
      if(this.attackActions[turnOrder[i].dgmnId].status === 'done') i++

      if(i === turnOrder.length){
        this.startNewTurn();
        clearInterval(attackInterval);
      } else if(this.battleResult !== 'ongoing'){ // If the battle is ever switched "off", stop Attacks
        clearInterval(attackInterval);
      }
      
    }, 33);

  }

  /**------------------------------------------------------------------------
   * ATTACK
   * ------------------------------------------------------------------------
   * Have one Dgmn attack another
   * TODO - Split this up a bunch
   * ------------------------------------------------------------------------
   * @param {Object}  attackAction  The Attack Action Object
   * ----------------------------------------------------------------------*/
  attack = (attackAction) => {
    let target = attackAction.target;
    let attacker = attackAction.attacker;
    let attack = attackAction.attack;
    debugLog(`-- ${attacker.nickname} uses ${attack.attackName} on ${target.nickname}`);

    // Reduce EN / Cost
    attack.currCost--;
    let enCost = Math.floor( ( 100 / 4 ) / attack.maxCost );
        enCost = enCost <= 0 ? 1 : enCost;
    attacker.currEN -= enCost;

    // Handle Types
    let typeMod = target.types[attack.type] || 1;
    let totalDamage = 0;


    // Loop through the Hit Count and do Damage
    for(let i = 0; i < attack.hits; i++){

      // Handle Combo
      let comboMod = .75;
      if(typeMod === 1){
        target.currCombo++;
      } else if(typeMod > 1){
        target.currCombo += 2; }
      let comboLetter = this.getComboLetter(target.currCombo);
      target.comboLetter = comboLetter;
      comboMod = comboRanks[comboLetter];

      // Update Statuses and Messaging
      let topMessage = ``;
      if(typeMod > 1){ topMessage += 'Strong Attack!' } else if(typeMod < 1){ topMessage +=  'Weak Attack. ' }
      if(attack.hits > 1){ topMessage += `${attack.hits} hits! ` }
      this.battleMenu.setTopText(topMessage);
      this.battleMenu.dgmnStatusList[ this.battleMenu.getStatusIndex(target.dgmnId) ].setCombo(this.battleMenu.menuCanvas,target.comboLetter,this.fetchImage('fontsWhite'));

      // Calculate Damage
      let damage = attack.calculateDamage(target.currStats[3],attacker.currStats[2],attacker.level);
      let postMods = damage * typeMod * comboMod; // TODO - Add all of the mods
      let rando = Math.floor( Math.random() * (4 - 1) + 1); // Add in a Random number from 1-3
      let finalDamage = Math.floor(postMods) + rando ; 
      debugLog("---- Attack Damage = ",finalDamage);

      totalDamage += finalDamage;

      // Handle "effects"
      if(typeMod > 1){
        // Target is Weak, do some work
      }
    }

    target.currHP -= totalDamage;

    // Handle Bottom information
    this.battleMenu.clearBottomData(true);
    this.battleMenu.setDgmnPortrait(attacker.name);
    let attackMessage = attacker.isEnemy ? `Enemy ${attacker.name}.MON used ${attack.displayName}!` : `${attacker.nickname} used ${attack.displayName}!`;
    this.battleMenu.bottomTextManager.slowPaint(this.battleMenu.menuCanvas,attackMessage,this.triggerGameScreenRedraw);

    attack.animate(target,attacker,this.triggerGameScreenRedraw,this.attackCanvas,this.fetchImage,
      () => {
      this.attackCanvas.clearCanvas();
      attackAction.status = 'done';
    })

    if(target.currHP <= 0) this.knockOut(target);
    this.battleMenu.updateAllStatusBars();
  }

  /**------------------------------------------------------------------------
   * KNOCK OUT
   * ------------------------------------------------------------------------
   * When a Dgmn's HP reaches 0, they are KO'd
   * ------------------------------------------------------------------------
   * @param {Dgmn}  target  Dgmn that is being knocked out
   * ----------------------------------------------------------------------*/
  knockOut = target => {
    target.currHP = 0;
    target.currEN = 0;
    target.battleCanvas.isIdle = false;
    target.battleCanvas.clearCanvas();
    debugLog("Target DGMN was KO'd");
    target.isDead = true;
    this.checkAllDead(target.isEnemy);
  }

  /**------------------------------------------------------------------------
   * CHECK ALL DEAD
   * ------------------------------------------------------------------------
   * Check to see if one of the sides of Dgmn are dead
   * ------------------------------------------------------------------------
   * @param {Boolean} isEnemy If true, check the enemy side
   * ----------------------------------------------------------------------*/
  checkAllDead = isEnemy => {
    let checkList = isEnemy ? this.enemyDgmnList : this.dgmnList;
    let dgmnCount = 0;

    for(let dgmn of checkList){
      if(dgmn.isDead) dgmnCount++;
    }

    if(dgmnCount >= checkList.length){
      isEnemy ? this.battleWin() : this.battleLose();
    }
  }

  getComboLetter = combo =>{
    let letter = 'F';
    if(combo > 1 && combo < 5){
      letter = 'E';
    } else if(combo > 4 && combo < 9){
      letter = 'D';
    } else if(combo > 8 && combo < 14){
      letter = 'C';
    } else if(combo > 13 && combo < 19){
      letter = 'B';
    } else if(combo > 18 && combo < 24){
      letter = 'A';
    } else if(combo >= 25){
      letter = 'S';
    }

    return letter;
  }

  resetCombos = isEnemy => {
    let list = isEnemy ? this.enemyDgmnList : this.dgmnList;
    for(let i = 0; i < list.length; i++){
      let combo = list[i].currCombo - 5;
          combo = combo < 0 ? 0 : combo;
      let comboLetter = this.getComboLetter(combo);
      list[i].currCombo = combo;
      list[i].comboLetter = comboLetter;
      this.battleMenu.dgmnStatusList[this.battleMenu.getStatusIndex(list[i].dgmnId)].setCombo(this.battleMenu.menuCanvas,comboLetter,this.fetchImage('fontsWhite'))
    }
  }

  /**------------------------------------------------------------------------
   * START NEW TURN
   * ------------------------------------------------------------------------
   * Cleanup previous turn and setup and redraw for next turn
   * ----------------------------------------------------------------------*/
  startNewTurn = () => {
    this.turn++;
    this.attackActions = {};

    // Reset Combos - Ally, then Enemy
    this.resetCombos();
    this.resetCombos(true);

    // Reset Battle Menu
    this.battleMenu.menus.dgmn.currentIndex = 0;
    this.battleMenu.currentState = 'dgmn';
    this.battleMenu.currentDgmnActor = 0;
    this.battleMenu.setTopText( this.battleMenu.menus.dgmn.icons[0].label );
    this.battleMenu.menuCanvas.paintImage(this.fetchImage('cursor'),80 * config.screenSize,( ( 2 + (4 * (0) ) ) * (8 * config.screenSize) ) + (8 * config.screenSize));
    this.battleMenu.paintBottomData( this.dgmnList[0] );
    this.battleMenu.paintInitialIcons('dgmn');
  }

  battleWin = () => {
    this.battleResult = 'win';
    this.battleMenu.setTopText('Victory');
    debugLog('You Win!!');

    //TODO - Below

    // Calculate EXP
    // Calculate Drops
    // End Battle State
  }

  battleLose = () => {
    this.battleResult = 'lose';
    debugLog('You lost...');
    // TODO - All of the below:
    //        Reset Dgmn to Egg
    //        Put you back in town
    //        Clear Items
  }

  /**------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * KEY HANDLERS
   * ------------------------------------------------------------------------
   * ------------------------------------------------------------------------
   * Once all of the Attacks have been chosen, and the Enemy Attacks have
   *   been generated, run through the Attacks
   * ------------------------------------------------------------------------
   * ----------------------------------------------------------------------*/

  /**------------------------------------------------------------------------
   * KEY TRIAGE
   * ------------------------------------------------------------------------
   * Switch that calls the proper function when a button is pressed
   * ------------------------------------------------------------------------
   * @param {String} key  The Key that's being pressed (NOT Event Key)
   * ----------------------------------------------------------------------*/
  keyTriage = key => {
    if(key === 'action'){
      this.actionKeyHandler();
    } else if(key === 'cancel'){
      this.cancelKeyHandler();
    } else if(key === 'up'){
      this.upKeyHandler();
    } else if(key === 'right'){
      this.rightKeyHandler();
    } else if(key === 'down'){
      this.downKeyHandler();
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
      this.battleMenu.launchSelectTarget();
    } else if(this.battleMenu.currentState === 'targetSelect'){
      this.battleMenu.menuCanvas.ctx.clearRect( 8 * (8 * config.screenSize), 2 * (8 * config.screenSize), 2 * (8 * config.screenSize), 12 * (8 * config.screenSize) );
      this.triggerGameScreenRedraw();
      let dgmnId = this.dgmnList[this.battleMenu.currentDgmnActor].dgmnId;
      
      // Add Attack to Attack Actions List
      this.attackActions[dgmnId] = {
        attacker: this.dgmnList[this.battleMenu.currentDgmnActor],
        target: this.enemyDgmnList[this.battleMenu.menus.targetSelect.currentIndex],
        attack: this.battleMenu.selectedAttack,
        status: 'todo'
      }
      if(this.battleMenu.currentDgmnActor === this.dgmnList.length -1){
        
        this.generateEnemyAttacks();
        
        debugLog("Running Attacks...");
        this.loadAttacks();
      } else {
        this.battleMenu.currentState = 'dgmn';
        this.battleMenu.currentDgmnActor++;

        this.battleMenu.setupDgmn(this.battleMenu.currentDgmnActor);
      }
    }
  }

  upKeyHandler = () => {
    if(this.battleMenu.currentState === 'attack'){
      this.battleMenu.dgmnAttackMenu.selectUp(this.battleMenu.menuCanvas, this.battleMenu.dgmnAttackMenu.currentChoice - 1);
      this.triggerGameScreenRedraw();
    }
  }

  rightKeyHandler = () => {
    if(this.battleMenu.currentState === 'dgmn'){
      let newIndex = this.battleMenu.menus.dgmn.currentIndex === this.battleMenu.menus.dgmn.totalIcons -1 ? 0 : this.battleMenu.menus.dgmn.currentIndex + 1;
      this.battleMenu.setCurrentIcon(newIndex);
    } 
  }

  downKeyHandler = () => {
    if(this.battleMenu.currentState === 'attack'){
      this.battleMenu.dgmnAttackMenu.selectDown(this.battleMenu.menuCanvas, this.battleMenu.dgmnAttackMenu.currentChoice + 1);
      this.triggerGameScreenRedraw();
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

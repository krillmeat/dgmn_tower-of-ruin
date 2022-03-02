import { debugLog } from "../../utils/log-utils";

import BackgroundCanvas from "../background-canvas";
import config from "../../config";
import BattleMenu from "./battle-menu";
import { battleImages } from "../../data/images.db";
import Attack from "./attack";
import { comboRanks, powerRanks } from "../../data/ranks.db";
import { attacksDB } from "../../data/attacks.db";
import GameCanvas from "../canvas";
import { getComboLetter } from "../../utils/dgmn-utils";

class Battle {
  constructor(dgmnList,enemyDgmnList,loadedCallback,addObjectCallback,gameScreenRedrawCallback, loadImageCallback, fetchImageCallback){
    this.battleActive = true;
    this.dgmnList = dgmnList;
    this.enemyDgmnList = enemyDgmnList;
    this.battleResult = 'ongoing';
    this.turn = 0;
    this.battleLocations = {
      party: {},
      enemy: {}
    }

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
  // loadBattle = () => {
  //   debugLog("-- Loading Battle");

  //   // Loads images, and then calls the function that loads data
  //   this.loadBattleImages(this.onBattleImagesLoaded);
  // }

  /**------------------------------------------------------------------------
   * ON BATTLE IMAGES LOADED
   * ------------------------------------------------------------------------
   * Split out from the original so it can be tested
   * ----------------------------------------------------------------------*/
  onBattleImagesLoaded = () => {
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
  }

  /**------------------------------------------------------------------------
   * LOAD BATTLE IMAGES
   * ------------------------------------------------------------------------
   * Adds all of the Battle Images together into one Array and sends them
   *   to the image manager to be loaded
   * ------------------------------------------------------------------------
   * @param {Function} loadedCallback Function called after everything is loaded
   * ----------------------------------------------------------------------*/
  // loadBattleImages = loadedCallback => {
  //   // Get all of the Dgmn-related Images together
  //   let allDgmn = this.dgmnList.concat(this.enemyDgmnList);
  //   let dgmnImages = [];
  //   for(let i = 0; i < allDgmn.length; i++){
  //     // TODO - I need to push these to an array, and loop them, rather than declaring each
  //     let urlOne = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Idle0.png`;
  //     let urlTwo = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Idle1.png`;
  //     let attackUrl = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Attack.png`;
  //     let hurtUrl = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Hurt.png`;
  //     let urlThree = `./sprites/Battle/Dgmn/${allDgmn[i].name.toLowerCase()}Portrait.png`;
  //     if(!dgmnImages.includes(urlOne)){
  //       dgmnImages.push(urlOne);
  //       dgmnImages.push(urlTwo);
  //       dgmnImages.push(urlThree);
  //       dgmnImages.push(attackUrl);
  //       dgmnImages.push(hurtUrl);
  //     }
  //   }

  //   let allImages = battleImages.concat(dgmnImages); // Battle Images + Dgmn Images

  //   this.loadImages(allImages, ()=>{this.setupBattleBackground(loadedCallback)});
  // }

  /**------------------------------------------------------------------------
   * SETUP BATTLE BACKGROUND
   * ------------------------------------------------------------------------
   * This code runs after the Images are loaded in loadBattleImages
   * It references the callback from that function to wrap up all image loading
   * ----------------------------------------------------------------------*/
  // setupBattleBackground = loadedCallback => {
  //   this.battleBackground.imageStack = [this.fetchImage('battleBackground')];
  //   this.battleBackground.paintImage(this.battleBackground.imageStack[0]);
  //   this.addObject(this.battleBackground);

  //   loadedCallback();
  // }

  /**------------------------------------------------------------------------
   * ADD DGMN TO OBJECT LIST
   * ------------------------------------------------------------------------
   * Sends the Dgmn canvas to the Game Screen for rendering
   * ------------------------------------------------------------------------
   * @param {Array} dgmnList List of Dgmn
   * ----------------------------------------------------------------------*/
  // addDgmnToObjectList = (dgmnList) => {
  //   for(let i = 0; i < dgmnList.length; i++){
  //     this.addObject(dgmnList[i].battleCanvas);
  //   }
  // }

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

      // Set Locations of Dgmn
      let side = isEnemy ? 'enemy' : 'party';
      this.battleLocations[side][dgmn.battleLocation] = dgmn.dgmnId;

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
  // generateEnemies = encounterData => {
  //   // new Dgmn / enemy
  // }

  /**------------------------------------------------------------------------
   * GENERATE ENEMY ATTACKS
   * ------------------------------------------------------------------------
   * Builds the Enemy Attacks and adds them to the Actions
   * ----------------------------------------------------------------------*/
  generateEnemyAttacks = () => {

    for(let i = 0; i < 3; i++){
      if(!this.enemyDgmnList[i].isDead){
        this.attackActions[this.enemyDgmnList[i].dgmnId] = {
          attacker: this.enemyDgmnList[i],
          targets: [this.dgmnList[i]],
          attack: this.enemyDgmnList[i].permAttacks[0],
          status: 'todo'
        }
      }
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
        let currSpeed = order[r].currStats[7] * order[r].currBuffs[7];
        let nextSpeed = order[r+1].currStats[7] * order[r+1].currBuffs[7];
        if(currSpeed < nextSpeed){
          order[r] = order[r+1];
          order[r+1] = temp;
        }
      }
    }

    return order;
  }

  /**------------------------------------------------------------------------
   * BUILD ATTACK IMAGE LIST
   * ------------------------------------------------------------------------
   * Before the attacks are run, build a list of all images that need to
   *   be loaded
   * ------------------------------------------------------------------------
   * @param {Object} attackList The attacks happening in the upcoming turn
   * ----------------------------------------------------------------------*/
  buildAttackImageList = attackList => {
    let imagesList = [];
    for(const prop in attackList){
      if(!attackList[prop].defend){
        let attackName = attackList[prop].attack.attackName;
        if(!this.loadedAttacks.includes(attackName)){
          this.loadedAttacks.push(attackName);
          for(let r = 0; r < attacksDB[attackName].animationFrameCount; r++){
            let url = `./sprites/Battle/Attacks/${attackName}${r+1}.png`;
            if(!imagesList.includes(url)) imagesList.push(url);
          }
        }
      }
    }
    return imagesList;
  }

  /**------------------------------------------------------------------------
   * LOAD ATTACKS
   * ------------------------------------------------------------------------
   * After the list of images is built, load all of the required images
   * ----------------------------------------------------------------------*/
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
   * TODO - Split this out, it's getting WAY too long
   * ----------------------------------------------------------------------*/
  runAttacks = () => {
    debugLog('Attacks = ',this.attackActions);
    let turnOrder = this.setupOrder();
    let i = 0;
    let prevI = -1;

    // Runs every frame and checks for the currently attacking Dgmn to be 'done'
    let attackInterval = setInterval(()=>{
      let targets, attacker, attack;

      if(i !== prevI){
        prevI = i;
        if(!turnOrder[i].isDead){
          if(!this.attackActions[turnOrder[i].dgmnId].defend){
            targets = this.attackActions[turnOrder[i].dgmnId].targets;
            attacker = this.attackActions[turnOrder[i].dgmnId].attacker;
            attack = this.attackActions[turnOrder[i].dgmnId].attack;

            let accuracy = '';
            
            // One target and they're dead, move on. Otherwise...
            if(targets.length === 1 && targets[0].isDead){ i++ } else {

              // Run through targets
              for(let i = 0; i < targets.length; i++){
               accuracy = this.calculateAccuracy(attacker.dgmnId, targets[i].currStats[6] * targets[i].currBuffs[6], attacker.currStats[5] * attacker.currBuffs[5]);
                if(accuracy !== 'missed'){
                  let critMod = accuracy === 'critical' ? 2 : 1;
                  this.attack(targets[i], attacker, attack, critMod);
                } 
              }
              
              // If the attack didn't miss
              if(accuracy !== 'missed'){
                // Once bottom text is done painting... Animate the attack
                this.battleMenu.setAttackBottomInfo(attacker, attack, accuracy, () => {
                  setTimeout(() => {
                    attack.animate(targets,attacker,this.triggerGameScreenRedraw,this.attackCanvas,this.fetchImage, () => {
                    if(!attack.effect){ // No effect
                      this.attackActions[turnOrder[i].dgmnId].status = 'done';
                      this.finishAttack(targets);
                      } else { // With Effect
                        this.handleEffect(attack.effect, attacker, targets);
                      } // END - With Effect
                  })}, 1000);
                });
              } else{
                this.battleMenu.setAttackBottomInfo(attacker, attack, accuracy, () => {
                  setTimeout(() => {
                    this.attackActions[turnOrder[i].dgmnId].status = 'done';
                    this.finishAttack(targets);
                  }, 1000);
                })
              }
              
            }
          }else{ // Defend
            this.defend(this.attackActions[turnOrder[i].dgmnId]);
            }
          } else if((turnOrder[i].isDead && i !== turnOrder.length )) { i++ } // Current Turn is Dead and not last in turn, skip
      }
  
      if(i < turnOrder.length && this.attackActions[turnOrder[i].dgmnId].status === 'done') i++ // Turn's not over and Curent Turn is done, move on

      // At the end of the Turn
      if(i === turnOrder.length){
        this.startNewTurn();
        clearInterval(attackInterval);
      } else if(this.battleResult !== 'ongoing'){ // If the battle is ever switched "off", stop Attacks
        clearInterval(attackInterval);
      }
      
    }, 33);

  }

  /**------------------------------------------------------------------------
   * DEFEND
   * ------------------------------------------------------------------------
   * Sets the Dgmn to Defending
   * ------------------------------------------------------------------------
   * @param {Object} attackAction
   * ----------------------------------------------------------------------*/
  defend = attackAction => {
    let defender = attackAction.defender;

    defender.isDefending = true;
    this.battleMenu.setDefendBottomInfo(defender,()=>{
      setTimeout(()=>{
        attackAction.status = 'done';
      },1000);
    });
  }

  /**------------------------------------------------------------------------
   * ATTACK
   * ------------------------------------------------------------------------
   * Have one Dgmn attack another
   * TODO - Split this up a bunch
   * ------------------------------------------------------------------------
   * @param {Object}  attackAction  The Attack Action Object
   * ----------------------------------------------------------------------*/
  attack = (target, attacker ,attack, missCritMod) => {
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
      let comboMod = this.calculateCombo(target, typeMod);

      // Update Statuses and Messaging
      let topMessage = ``;
      if(typeMod > 1){ topMessage += 'Strong Attack!' } else if(typeMod < 1){ topMessage +=  'Weak Attack. ' }
      if(attack.hits > 1){ topMessage += `${attack.hits} hits! ` }
      this.battleMenu.setTopText(topMessage);
      this.battleMenu.dgmnStatusList[ this.battleMenu.getStatusIndex(target.dgmnId) ].setCombo(this.battleMenu.menuCanvas,target.comboLetter,this.fetchImage('fontsWhite'));

      totalDamage += this.calculateDamage(attacker,target,attack, typeMod, comboMod, missCritMod);
      debugLog("--- Total Attack Damage = ",totalDamage);

      // Handle "effects"
      if(typeMod > 1){
        // Target is Weak, do some work
        target.weakenedState[0] = true;
        if(target.weakenedState[1] < 3) target.weakenedState[1]++;
      }

      if(target.weakenedState[0]) this.battleMenu.dgmnStatusList[ this.battleMenu.getStatusIndex(target.dgmnId) ].setWeakened(this.battleMenu.menuCanvas,this.fetchImage(`weak${target.weakenedState[1]}`))
    }

    target.currHP -= totalDamage;
  }

  finishAttack = (targets) => {
    this.attackCanvas.clearCanvas();
    for(let i = 0; i < targets.length; i++){
      if(targets[i].currHP <= 0) this.knockOut(targets[i]);
    }
    this.battleMenu.updateAllStatusBars();
  }


  /**------------------------------------------------------------------------
   * HANDLE EFFECT
   * ------------------------------------------------------------------------
   * When an Attack has an effect, this method handles that process
   * ------------------------------------------------------------------------
   * @param {String}  effect    The effect label | buff, debuff, etc.
   * @param {Dgmn}    attacker  Dgmn doing the attack
   * @param {Array}   targets   List of Dgmn targets of the effect
   * ----------------------------------------------------------------------*/
  handleEffect = (effect,attacker,targets) => {
    debugLog("---- Running Attack Effect");

    let isBuffCapped;
    let shouldRun = '';

    if(effect[0] === 'buff'){
      shouldRun = this.buffStat(targets[0],effect[3],effect[1],effect[2]);
      isBuffCapped = shouldRun === 'capped';
    } else if(effect[0] === 'debuff'){
      
    } else if(effect[0] === 'status'){
      shouldRun = this.inflictStatus(targets[0],attacker,targets[0].nickname,effect[2],effect[1]); // TODO - send more than one target
    }

    if(shouldRun !== 'missed' && shouldRun !== ''){
      this.battleMenu.setEffectBottomInfo(effect,attacker,targets[0].nickname,isBuffCapped, () => {
        setTimeout(() => {
          this.attackActions[attacker.dgmnId].status = 'done';
          this.finishAttack(targets);
        },1000);
      });
    } else{
      this.attackActions[attacker.dgmnId].status = 'done';
      this.finishAttack(targets);
    }
  }

  /**------------------------------------------------------------------------
   * BUFF STAT
   * ------------------------------------------------------------------------
   * Increase the Buff of a Stat
   * ------------------------------------------------------------------------
   * @param {Dgmn}    dgmn    The Dgmn getting buffed
   * @param {Number}  chance  % chance of the buff happening
   * @param {Number}  stat    Index Number of the Stat to Buff
   * @param {Number}  amount  Number of stages to Buff the Stat
   * @returns Whether or not the buff happened or didn't | '', missed, capped
   * ----------------------------------------------------------------------*/
  buffStat = (dgmn, chance, stat, amount) => {
    let buffStatus = ''; // '' | capped | missed
    let shouldRun = Math.floor(Math.random() * (100 - 1) + 1) <= chance;
      if( shouldRun ){ // Check Buff Chance
        if(dgmn.currBuffs[stat] + amount <= 4) {
          dgmn.currBuffs[stat] += amount;
          buffStatus = 'yes';
          debugLog(`----- Buffing ${stat} by ${amount}`);
        } else { dgmn.currBuffs[stat] = 4; buffStatus = 'capped' }
      } else{ buffStatus = 'missed' }
    return buffStatus;
  }

  inflictStatus = (dgmn, chance, condition) => {
    let shouldInflict  = Math.floor(Math.random() * (100 - 1) + 1) <= chance;
    if(shouldInflict){
      if(!dgmn.currConditions[condition]){
        debugLog("----- Adding condition - ",condition);
        dgmn.currConditions[condition] = true;
      }
    }
    return shouldInflict;
  }

  /**------------------------------------------------------------------------
   * CALCULATE COMBO
   * ------------------------------------------------------------------------
   * Deals damage to a target
   * ------------------------------------------------------------------------
   * @param {Dgmn}    target  Dgmn that is being damaged
   * @param {Number}  typeMod Modifier for type effectiveness
   * @return {Number} Combo modifier
   * ----------------------------------------------------------------------*/
  calculateCombo = (target, typeMod) => {
    let mod = .75;
    if(typeMod === 1){
      target.currCombo++;
    } else if(typeMod > 1){
      target.currCombo += 2; }
    
    if(target.weakenedState[0]){
      target.currCombo++;
    }

    let comboLetter = getComboLetter(target.currCombo);
    target.comboLetter = comboLetter;
    mod = comboRanks[comboLetter];

    return mod;
  }

  /**------------------------------------------------------------------------
   * CALCULATE ACCURACY
   * ------------------------------------------------------------------------
   * Check the Hit and Avoid stats of the two attackers and determine
   *   whether the attack will hit or miss.
   * TODO - Not sure why attackerDgmnId is needed...
   * ------------------------------------------------------------------------
   * @param {Number}  targetAvo   The Avoid stat of the target
   * @param {Number}  attackerHit The Hit stat of the attacker
   * ----------------------------------------------------------------------*/
  calculateAccuracy = (attackerDgmnId, targetAvo, attackerHit) => {

    let accuracy = 'hit';
    let missRange = targetAvo / attackerHit;
    let critRange = attackerHit / targetAvo;
  
    if(missRange !== 1){
      missRange = missRange < 1 ? missRange * .5 : missRange * 2;
      critRange = critRange < 1 ? critRange * .5 : critRange * 2;
    }

    missRange *= 10;
    critRange *= 10;

    let rand = Math.floor( Math.random() * (1000 - 1) + 1);

    if(rand <= missRange){
      console.log("ATTACK MISSED");
      accuracy = 'missed';
    } else if(rand >= (1000 - critRange) ){
      console.log("CRITICAL HIT");
      accuracy = 'critical';
    }

    return accuracy;
  }

  /**------------------------------------------------------------------------
   * CALCULATE DAMAGE
   * ------------------------------------------------------------------------
   * Deals damage to a target
   * ------------------------------------------------------------------------
   * @param {Dgmn}    attacker  Dgmn that is dealing damage
   * @param {Dgmn}    target    Dgmn that is being damaged
   * @param {Attack}  attack    Attack being used
   * @return {Number} Damage total
   * ----------------------------------------------------------------------*/
  calculateDamage = (attacker, target, attack,typeMod,comboMod,missCritMod) => {
    let weakenedMod = target.weakenedState[0] ? 1.25 : 1;
    let defendMod = target.isDefending ? .5 : 1;
    let stats = attack.stat === 'physical' ? 
                  [target.currStats[2] * target.currBuffs[2], attacker.currStats[1] * attacker.currBuffs[1]] : 
                  [target.currStats[4] * target.currBuffs[4],attacker.currStats[3] * attacker.currBuffs[3]];
    let damage = attack.calculateDamage(stats[0],stats[1],attacker.level);
    let postMods = damage * typeMod * comboMod * weakenedMod * defendMod * missCritMod; // TODO - Add remaining mods
    let rando = Math.floor( Math.random() * (4 - 1) + 1); // Add in a Random number from 1-3
    let finalDamage = Math.floor(postMods) + rando ; 
    
    return finalDamage;
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
    target.battleCanvas.clearCanvas(); // TODO - this needs to be moved
    this.battleMenu.setDgmnKOState(target.dgmnId);
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

  /**------------------------------------------------------------------------
   * RESET COMBOS
   * ------------------------------------------------------------------------
   * Subtracts three from the current combo of a list of Dgmn
   * TODO - Weakened State should offset combo loss
   * ------------------------------------------------------------------------
   * @param {Array} dgmnList  List of Dgmn to be updated
   * ----------------------------------------------------------------------*/
  resetCombos = dgmnList => {
    for(let i = 0; i < dgmnList.length; i++){
      if(!dgmnList[i].isDead){
        let combo = dgmnList[i].currCombo - 3;
        combo = combo < 0 ? 0 : combo;
        let comboLetter = getComboLetter(combo);
        dgmnList[i].currCombo = combo;
        dgmnList[i].comboLetter = comboLetter;
        this.battleMenu.setDgmnComboState(comboLetter,dgmnList[i].dgmnId)
      } else {
        dgmnList[i].comboLetter = 'F';
        dgmnList[i].currCombo = 0;
        this.battleMenu.setDgmnComboState('F',dgmnList[i].dgmnId)
      }
      
    }
  }

  /**------------------------------------------------------------------------
   * RESET WEAKENED
   * ------------------------------------------------------------------------
   * Goes through a list of Dgmn and Updates their Weakened Status
   * ------------------------------------------------------------------------
   * @param {Array} dgmnList  List of Dgmn to be updated
   * ----------------------------------------------------------------------*/
  resetWeakened = dgmnList => {
    for(let dgmn of dgmnList){
      let weakenedState = dgmn.weakenedState;
      if(weakenedState[1] > 0){
        weakenedState[1]--;
        if(weakenedState[1] === 0){ 
          weakenedState[0] = false; 
        }
        let imageName = `weak${weakenedState[1]}`;
        let statusIndex = this.battleMenu.getStatusIndex(dgmn.dgmnId);
        // this.battleMenu.dgmnStatusList[statusIndex].setWeakened(this.battleMenu.menuCanvas,this.fetchImage(imageName));
        this.battleMenu.setDgmnWeakenedState(statusIndex,imageName)
      }
    }
  }
 
  /**------------------------------------------------------------------------
   * RESET DEFEND
   * ------------------------------------------------------------------------
   * Resets a list of Dgmn's Defense status
   * ------------------------------------------------------------------------
   * @param {Array} dgmnList  List of Dgmn to be updated
   * ----------------------------------------------------------------------*/
  resetDefend = dgmnList => {
    for(let dgmn of dgmnList){
     dgmn.isDefending = false;
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

    // Reset Weakneed State, Combos, and Defend
    this.resetWeakened(this.dgmnList.concat(this.enemyDgmnList));
    this.resetCombos(this.dgmnList.concat(this.enemyDgmnList));
    this.resetDefend(this.dgmnList.concat(this.enemyDgmnList));

    // Reset Battle Menu
    this.battleMenu.resetBattleMenuForNewTurn(this.dgmnList[0])
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
   * GO TO NEXT DGMN
   * ------------------------------------------------------------------------
   * During your turn, when selecting options, this move onto the next Dgmn
   *   in your party.
   * ----------------------------------------------------------------------*/
  goToNextDgmn = () => {
      this.battleMenu.currentState = 'dgmn';
      this.battleMenu.currentDgmnActor++;
      this.battleMenu.setCurrentIcon(0);

      this.battleMenu.setupDgmn(this.battleMenu.currentDgmnActor);
  }

  /**------------------------------------------------------------------------
   * BEGIN BATTLE
   * ------------------------------------------------------------------------
   * After all of your Dgmn's selections are made, this triggers the start
   *   of the battle phase.
   * ----------------------------------------------------------------------*/
  // beginBattle = () => {
  //   this.battleMenu.currentState = 'battling'
  //   this.generateEnemyAttacks();
    
  //   debugLog("Running Attacks...");
  //   this.loadAttacks();
  // }

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
  // keyTriage = key => {
  //   if(key === 'action'){
  //     this.actionKeyHandler();
  //   } else if(key === 'cancel'){
  //     this.cancelKeyHandler();
  //   } else if(key === 'up'){
  //     this.upKeyHandler();
  //   } else if(key === 'right'){
  //     this.rightKeyHandler();
  //   } else if(key === 'down'){
  //     this.downKeyHandler();
  //   } else if(key === 'left'){
  //     this.leftKeyHandler();
  //   }
  // }

  actionKeyHandler = () => {
    if(this.battleMenu.currentState === 'dgmn'){
      if(this.battleMenu.menus.dgmn.currentIndex === 0){
        this.battleMenu.launchDgmnAttackMenu();
      } else if(this.battleMenu.menus.dgmn.currentIndex === 1){ // Defending
        this.battleMenu.clearCurrentDgmnCursors();
        this.attackActions[this.dgmnList[this.battleMenu.currentDgmnActor].dgmnId] = {
          defend: true,
          defender: this.dgmnList[this.battleMenu.currentDgmnActor],
          status: 'todo'
        }
        this.battleMenu.menuCanvas.ctx.clearRect( 8 * (8 * config.screenSize), 2 * (8 * config.screenSize), 2 * (8 * config.screenSize), 12 * (8 * config.screenSize) );

        // Check whether to move to next Dgmn or begin Battle Phase
        if(this.battleMenu.currentDgmnActor === this.dgmnList.length -1){
          this.beginBattle();
        } else {
         this.goToNextDgmn();
        }
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
      let attackTargets = this.battleMenu.selectedAttack.targets === 'single' ? 
                            [this.enemyDgmnList[this.battleMenu.menus.targetSelect.currentIndex]] : 
                            this.enemyDgmnList;
      this.attackActions[dgmnId] = {
        attacker: this.dgmnList[this.battleMenu.currentDgmnActor],
        targets: attackTargets,
        attack: this.battleMenu.selectedAttack,
        status: 'todo'
      }

      // Check whether to move to next Dgmn or begin Battle Phase
      if(this.battleMenu.currentDgmnActor === this.dgmnList.length -1){
        this.beginBattle();
      } else {
        this.goToNextDgmn();
      }
    }
  }

  upKeyHandler = () => {
    if(this.battleMenu.currentState === 'attack'){
      this.battleMenu.dgmnAttackMenu.selectUp(this.battleMenu.menuCanvas, this.battleMenu.dgmnAttackMenu.currentChoice - 1);
      this.triggerGameScreenRedraw();
    } else if(this.battleMenu.currentState === 'targetSelect'){
      this.battleMenu.targetSelect(-1,this.battleLocations);
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
    } else if(this.battleMenu.currentState === 'targetSelect'){
      this.battleMenu.targetSelect(1,this.battleLocations);
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

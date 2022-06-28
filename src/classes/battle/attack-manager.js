import { attacksDB } from "../../data/attacks.db";
import { powerRanks } from "../../data/ranks.db";
import { debugLog } from "../../utils/log-utils";
import AttackCanvas from "./canvas/attack-canvas";
import AttackUtility from "../dgmn/utility/attack.util";
import DgmnUtility from "../dgmn/utility/dgmn.util";

/**------------------------------------------------------------------------
* ATTACK MANAGER
 * ------------------------------------------------------------------------
 * Handles the Actions related to Attacking, as well as other battle Actions
 *   (Defend, Status Effect, etc.)
 * ----------------------------------------------------------------------*/
class AttackManager{
  constructor(){
    this.attackActions = {}; 
    this.attackCanvas;
    this.attackUtility = new AttackUtility();
    this.dgmnUtility = new DgmnUtility();
  }

  initAH = (systemAH,battleAH,dgmnAH) => {
    this.systemAH = systemAH;
    this.battleAH = battleAH;
    this.dgmnAH = dgmnAH;

    this.attackCanvas = new AttackCanvas(this.battleAH.drawBattleCanvas,'attack',96,96,32,16);
  }

  /**------------------------------------------------------------------------
   * ADD ACTION
   * ------------------------------------------------------------------------
   * Adds an Action to the Attack Actions
   * TODO - This should 100% take in an Object
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId      dgmnID associated with the Action
   * @param {String}  attackName  Name of the Attack
   * @param {Array}   targets     List of IDs of Targets
   * @param {String}  power       Letter value of the Attack's Power
   * ----------------------------------------------------------------------*/
  addAction = (dgmnId,actionData) => {
    this.attackActions[dgmnId] = actionData;
    this.attackActions[dgmnId].status = 'pending';
    if(!actionData.isDefend){
      this.attackActions[dgmnId].targetIndex = this.attackActions[dgmnId].targetIndex.length === 1 ? this.attackActions[dgmnId].targetIndex[0] : 'all';
    }
  }

  /**------------------------------------------------------------------------
   * REMOVE ACTION
   * ------------------------------------------------------------------------
   * Removes an Action from the Attack Actions
   * TODO - Don't know why yet, might not need  (maybe on KO?)
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId  dgmnID associated with the Action
   * ----------------------------------------------------------------------*/
  removeAction = dgmnId => {
    this.attackActions[dgmnId] = {};
  }

  /**------------------------------------------------------------------------
   * ATTACK LOOP
   * ------------------------------------------------------------------------
   * Goes through the Actions and runs them all
   * TODO - Always try and break this up
   * ------------------------------------------------------------------------
   * @param {Array} turnOrder Order of Dgmn's Actions, based on SPD
   * ----------------------------------------------------------------------*/
  attackLoop = turnOrder => {
    debugLog("Attack Loop...");
    let i = 0;
    let attackInterval = setInterval(()=>{
      let attacker = turnOrder[i];
      let action = this.attackActions[attacker];

      // TODO - These conditionals are getting complicated, split them into utilities/AH
      if(action && // Has an Action
        (action.isDefend || // Defend OR...
        ((action.targets.length === 1 && !this.dgmnAH.getIsDead(action.targets[0])) || action.targets.length !== 1) ) && // If only 1 Target, they're not dead
        !this.dgmnAH.getIsDead(attacker)){ // And the ATTACKER isn't Dead...
        if(action.status === 'pending'){ // Action hasn't been run yet
          this.takeAction(attacker,action);
        } else if(action.status === 'done'){ // Action is finished, move on
          i++;
        }
      } else{ debugLog("No Action for "+attacker); i++  } // Dgmn has no Action, move on

      if(this.battleAH.checkBattleCondition() !== 'ongoing' || i >= turnOrder.length){
        clearInterval(attackInterval);
        setTimeout(()=>{
          // TODO - Split into 1 function that you pass win/lose into
          if(this.battleAH.checkBattleCondition() === 'win'){
            this.battleAH.battleWin(); 
          } else if(this.battleAH.checkBattleCondition() === 'lose'){
            this.battleAH.battleLose();
          } else{ this.battleAH.newTurn() }
        },2000);
      }
    }, 200);
  }

  /**------------------------------------------------------------------------
   * BUILD ATTACK IMAGE LIST
   * ------------------------------------------------------------------------
   * Puts together an Array of Strings with the Image URLs
   * TODO - Candidate for Battle Utility
   * ------------------------------------------------------------------------
   * @param {String}  attackName  Camel Case name of the Attack
   * @returns Array of Image URLs
   * ----------------------------------------------------------------------*/
  buildAttackImageList = attackName => {
    let images = [];

    for(let i = 0; i < attacksDB[attackName].animationFrameCount; i++){
      images.push("Attacks/"+attackName+""+(i+1));
    }

    return images;
  }

  /**------------------------------------------------------------------------
   * TRIGGER ANIMATION
   * ------------------------------------------------------------------------
   * Sets up the requirements for the Attack Canvas to draw an Attack
   * ------------------------------------------------------------------------
   * @param {String}  attacker    dgmnID of actor (TODO - change name)
   * @param {String}  attackName  Camel Case name of the Attack
   * ----------------------------------------------------------------------*/
  triggerAnimation = (attacker,attackName,targets) => {
    let images = this.buildAttackImageList(attackName);
    let loadedImages = [];
    this.systemAH.loadImages(images,()=>{
      let frames = attacksDB[attackName].animationFrames;
      for(let i = 0; i < frames.length; i++){ 
        loadedImages.push({
          img: this.systemAH.fetchImage(frames[i][0]),
          frameCount: frames[i][1]
        })
      }
      this.attackCanvas.animateAttack(this.attackActions[attacker].targetIndex,!this.dgmnUtility.isEnemy(attacker),loadedImages,()=>{this.animationDone(attacker,targets)})
    });
  }

  /**------------------------------------------------------------------------
   * ANIMATION DONE
   * ------------------------------------------------------------------------
   * Runs the post-animation logic for the Attack
   * Mostly handles marking the Action as Done and cleaning up
   * TODO - Why use targets and attackActions[attacker].targets ?
   * ------------------------------------------------------------------------
   * @param {String}  attacker  dgmnID of actor (TODO - change name)
   * ----------------------------------------------------------------------*/
  animationDone = (attacker,targets) => {
    let targetData;
    this.dgmnAH.idleDgmn(attacker);
    for(let target of targets){ 
      if(!this.dgmnAH.getIsDead(target)) this.dgmnAH.idleDgmn(target) 
    }

    if(this.attackActions[attacker].targetIndex === 'all'){
      for(let target of this.attackActions[attacker].targets){
        if(this.dgmnAH.checkKO(target)){
          targetData = this.dgmnAH.getDgmnData(target,['speciesName','stage'],true);
          this.battleAH.addRewards( targetData.speciesName ); // TODO - This causes an error
          // Hitting all enemies will trigger the checkKO(target) check, which returns true when a DGMN was already dead
        }
      }
    } else{
      if(this.dgmnAH.checkKO(this.attackActions[attacker].targets[0])){
        let isTargetEnemy = this.dgmnUtility.isEnemy(this.attackActions[attacker].targets[0]);
        if(isTargetEnemy){ 
          targetData = this.dgmnAH.getDgmnData(this.attackActions[attacker].targets[0],['speciesName','stage'],isTargetEnemy);
          this.battleAH.addRewards( targetData.speciesName );
        } else{
          debugLog("Your DGMN Died");
        }
        
      }
    }
    this.battleAH.drawAllStatuses();
    this.attackCanvas.clearCanvas();

    setTimeout(()=>{ this.attackActions[attacker].status = 'done'; },500) // Pause, for dramatic effect
  }

  /**------------------------------------------------------------------------
   * TAKE ACTION
   * ------------------------------------------------------------------------
   * Runs logic for taking an Action.
   * Can Attack, Defend, or take Status Effect
   * ------------------------------------------------------------------------
   * @param {String}  attacker  dgmnID of actor (TODO - change name)
   * @param {Object}  action    Collection of necessary data for Action
   * ----------------------------------------------------------------------*/
  takeAction = (attacker,action) => {
    this.attackActions[attacker].status = 'acting';
    let dgmnData = this.dgmnAH.getDgmnData(attacker,['nickname','speciesName'],attacker.charAt(0) === 'e');
    let species = dgmnData.speciesName;
    let message = "";

    if(!action.isDefend){
      this.takeAttack(attacker,action,(attackMessage)=>{
        message = attackMessage;
      });
    } else{
      message = this.dgmnAH.getDgmnData(attacker,['nickname'],attacker.charAt(0) === 'e').nickname+' defends';
    }
    
    
    this.battleAH.drawActionText(species,message);
    setTimeout(()=>{ // Wait a second for the text to display before starting the animation
      if(!action.isDefend){
        this.dgmnAH.showDgmnFrame(attacker,'Attack');
        for(let target of action.targets){ 
          if(!this.dgmnAH.getIsDead(target)){ // If they're not dead TODO - This one needs a shortcut
            this.dgmnAH.showDgmnFrame(target,'Hurt') 
          }  
        }
        this.triggerAnimation(attacker,action.attackName,action.targets);
      } else { this.attackActions[attacker].status = 'done'; }
    },1200);
  }

  // TODO - Needs to know if it's multi-hit/multi-target
  buildActionMessage = (nickname,attackName,accuracy) => {
    let message = '';
    if(accuracy === 1 ){ // Normal Accuracy
      message = nickname+" used "+this.attackUtility.getDisplayName(attackName)+"!";
    } else if(accuracy === 2) { // Critical Hit
      message = nickname+" used "+this.attackUtility.getDisplayName(attackName)+"! CRITICAL HIT!";
    } else if(accuracy === 0){
      message = nickname+" used "+this.attackUtility.getDisplayName(attackName)+"... But missed.";
    }

    return message;
  }

  /**------------------------------------------------------------------------
   * TAKE ATTACK
   * ------------------------------------------------------------------------
   * Runs the Attack Action Steps
   * ------------------------------------------------------------------------
   * @param {String}  attacker  dgmnID of actor (TODO - change name)
   * @param {Object}  action    Collection of necessary data for Action
   * ----------------------------------------------------------------------*/
  takeAttack = (attacker,action,messageCB) => {
    debugLog(`${attacker} using ${action.attackName} on ${action.targets}`);

    // Drain DGMN Energy TODO - Is this right? Can't happen per target or hit
    this.drainEnergy(attacker,action.attackName);

    for(let i in action.targets ){ // Multi-target
      for(let h = 0; h < action.hits; h++){  // Multi-hit
        let attackerData = this.dgmnAH.getDgmnData(attacker,['currentStats','currentLevel','nickname'],attacker.charAt(0) === 'e');
        let targetData = this.dgmnAH.getDgmnData(action.targets[i],['currentStats','combo','speciesName','weak','isDead'],action.targets[i].charAt(0) === 'e');

        if(!targetData.isDead){

          let attackerATK = this.attackUtility.getStat(action.attackName) === 'physical' ? attackerData.currentStats.ATK : attackerData.currentStats.INT;
          let targetDEF = this.attackUtility.getStat(action.attackName) === 'physical' ? targetData.currentStats.DEF : targetData.currentStats.RES;

          let baseDMG = this.calcBaseDMG( attackerATK, attackerData.currentLevel, powerRanks[action.power], action.hits,  targetDEF); // TODO - ATK/INT and DEF/RES
          let modTotal = 1;
  
          // Miss & Crit
          let accuracyMod = this.calculateAccuracy(attackerData.currentStats.HIT,targetData.currentStats.AVO);
      
          if(accuracyMod !== 0){ // Don't run any special mods or anything if you Miss
            // Type
            let typeMod = this.dgmnUtility.getTypeMod(action.type,targetData.speciesName);
            if(typeMod > 1 && !this.isDgmnDefending(action.targets[i])) { // If Type Mod is over 1 (they're weak) and they're not Defending
              this.dgmnAH.modifyWeak(action.targets[i],1);
            }
  
            // WEAK
            let weakMod = targetData.weak > 0 ? 1.125 : 1;
  
            // Combo
            this.dgmnAH.modifyCombo(action.targets[i],this.getComboDelta());
            let comboLetter = this.attackUtility.getComboLetter(this.calculateCombo(targetData.combo,typeMod,weakMod > 1));
            let comboMod = this.attackUtility.getComboMod(comboLetter);

            // Defending
            let defendMod = this.isDgmnDefending(action.targets[i]) ? .5 : 1;

            // Early Stage Mod
            let earlyStageMod = this.dgmnUtility.isEnemy(attacker) ? this.calcEarlyStageMod( targetData.speciesName ) : 1;
  
            modTotal = comboMod * typeMod * weakMod * accuracyMod * defendMod * earlyStageMod;
  
            debugLog(`    MODS = ${comboMod} x ${typeMod} x ${weakMod} x ${accuracyMod} x ${defendMod} x ${earlyStageMod} = ${modTotal}`);
          }
          
          let rand = Math.floor(Math.random() * (3 - 1) + 1 ); // Adds a random number from 1-2, to give some variance
  
          let finalDMG = accuracyMod === 0 ? 0 : ( Math.round(baseDMG * modTotal) + rand );
          this.dealDMG(action.targets[i],finalDMG);
  
          let message = this.buildActionMessage(attackerData.nickname,action.attackName,accuracyMod);
          messageCB(message);
  
          // TODO - Effects go here
        } else { i++ } // If they're Dead, move on
      }
    }
  }

  drainEnergy = (attacker,attackName) => {
    let reduceBy = Math.ceil(100 / 4 / this.attackUtility.getMaxCost(attackName));
    this.dgmnAH.useAttack(attacker,reduceBy,attackName);
  }

  calcEarlyStageMod = (targetSpecies) => {
    return this.dgmnUtility.getStage(targetSpecies) < 3 ? .5 : 1;
  }

  calculateAccuracy = (attackerHIT,targetAVO) => {
    let accuracyMod = 1;

    let missRange = targetAVO / attackerHIT;
    let critRange = attackerHIT / targetAVO;

    if(missRange !== 1){ // If AVO and HIT are not the same
      missRange = missRange < 1 ? missRange * .5 : missRange * 2; // HIT higher than AVO ? Halve Miss range : Double Miss Range
      critRange = critRange < 1 ? critRange * .5 : critRange * 2; // AVO higher than HIT ? Halve Crit range : Double Crit Range
    }

    missRange *= 10;
    critRange *= 10;

    let rand = Math.floor( Math.random() * (1000 - 1) + 1 ); // Random Number from 1 to 1000

    if(rand <= missRange){ // MISS
      debugLog("    Attack missed...")
      accuracyMod = 0;
    } else if(rand >= (1000 - critRange)){
      debugLog("    CRITICAL HIT!")
      accuracyMod = 2;
    }

    return accuracyMod;
  }

  calculateCombo = (prevCombo,typeMod = 1,isWEAK = false) => {
    return prevCombo + this.getComboDelta(typeMod,isWEAK);
  }

  getComboDelta = (typeMod = 1, isWEAK = false) => {
    let delta = 1;

    if(isWEAK) delta++;

    if(typeMod > 1) { delta++
    } else if(typeMod < 1){ delta = 0 }

    return delta;
  }

  /**------------------------------------------------------------------------
   * CALCULATE BASE DAMAGE
   * ------------------------------------------------------------------------
   * Uses Base DMG formula to calculate DMG before any modifiers
   * TODO - Currently ignores Stat Buffs
   * ------------------------------------------------------------------------
   * @param {Number}  attackerATK ATK/INT stat of the Attacker
   * @param {Number}  attackerLV  Level of the Attacker
   * @param {Number}  attackPWR   Attack Power of the Attack itself
   * @param {Number}  targetDEF   DEF/RES stat of the Attacker
   * @returns Calculated DMG Number
   * ----------------------------------------------------------------------*/
  calcBaseDMG = (attackerATK, attackerLV, attackPWR, attackHits, targetDEF) => {
    // FORMULA: ⌈( ( ATK / DEF ) * (LV / 2 ) ) * PWR⌉
    // The reason you have /2 is because the "weight" of that variable needs to be weaker
    let baseDMG = Math.ceil(( ( (attackerATK / targetDEF) * (attackerLV/4) ) * attackPWR ) / attackHits);

    debugLog(`  BASE DMG = ⌈( ( (${attackerATK}/${targetDEF}) x (${attackerLV}/2) ) x ${attackPWR}) / ${attackHits}⌉ = ${baseDMG} `);
    return baseDMG;
  }

  /**------------------------------------------------------------------------
   * DEAL DAMAGE
   * ------------------------------------------------------------------------
   * Calls the DGMN Manager to remove HP from the Target
   * ------------------------------------------------------------------------
   * @param {String}  target  dgmnID of actor
   * @param {Number}  dmg     Amount of DMG to be dealt
   * ----------------------------------------------------------------------*/
  dealDMG = (target,dmg) => {
    debugLog("  Dealt "+dmg+"DMG to "+target);
    this.dgmnAH.dealDMG(target,dmg);
  }

  isDgmnDefending = dgmnId => {
    if(this.attackActions[dgmnId]) return (this.attackActions[dgmnId].isDefending)
    
    return false
  }
}

export default AttackManager;
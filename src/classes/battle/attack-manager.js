import { attacksDB } from "../../data/attacks.db";
import { powerRanks } from "../../data/ranks.db";
import { debugLog } from "../../utils/log-utils";
import AttackCanvas from "./canvas/attack-canvas";
import AttackUtility from "../dgmn/utility/attack.util";

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
  }

  initAH = (systemAH,battleAH,dgmnAH) => {
    this.systemAH = systemAH;
    this.battleAH = battleAH;
    this.dgmnAH = dgmnAH;

    this.attackCanvas = new AttackCanvas(this.battleAH.drawBattleCanvas,'attack',64,96,32,16);
  }

  /**------------------------------------------------------------------------
   * ADD ACTION
   * ------------------------------------------------------------------------
   * Adds an Action to the Attack Actions
   * ------------------------------------------------------------------------
   * @param {String}  dgmnId      dgmnID associated with the Action
   * @param {String}  attackName  Name of the Attack
   * @param {Array}   targets     List of IDs of Targets
   * @param {String}  power       Letter value of the Attack's Power
   * ----------------------------------------------------------------------*/
  addAction = (dgmnId,attackName,targetIndex,targets,power) => {
    this.attackActions[dgmnId] = {};
    this.attackActions[dgmnId].attackName = attackName;
    this.attackActions[dgmnId].targets = targets;
    this.attackActions[dgmnId].power = power;
    this.attackActions[dgmnId].status = 'pending';
    this.attackActions[dgmnId].targetIndex = targetIndex.length === 1 ? targetIndex[0] : 'all';
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

      if(action){ // Make sure the Attacker has an action
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
    }, 1000);
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
      images.push("./sprites/Battle/Attacks/"+attackName+""+(i+1)+".png");
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
  triggerAnimation = (attacker,attackName) => {
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
      this.attackCanvas.animateAttack(this.attackActions[attacker].targetIndex,true,loadedImages,()=>{this.animationDone(attacker)})
    });
  }

  /**------------------------------------------------------------------------
   * ANIMATION DONE
   * ------------------------------------------------------------------------
   * Runs the post-animation logic for the Attack
   * Mostly handles marking the Action as Done and cleaning up
   * ------------------------------------------------------------------------
   * @param {String}  attacker  dgmnID of actor (TODO - change name)
   * ----------------------------------------------------------------------*/
  animationDone = (attacker) => {
    if(this.attackActions[attacker].targetIndex === 'all'){
      this.battleAH.drawAllStatuses();
      for(let target of this.attackActions[attacker].targets){
        this.dgmnAH.checkKO(target);
      }
    } else{
      this.battleAH.drawDgmnStatusMeter(this.attackActions[attacker].targets[0].charAt(0)==='e',this.attackActions[attacker].targetIndex,'hp');
      this.dgmnAH.checkKO(this.attackActions[attacker].targets[0]);
    }
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
    if(!action.isDefend){
      this.takeAttack(attacker,action);
    }
    let dgmnData = this.dgmnAH.getDgmnData(attacker,['nickname','speciesName'],attacker.charAt(0) === 'e');
    let species = dgmnData.speciesName;
    let message = this.buildActionMessage(dgmnData,action.attackName);
    this.battleAH.drawActionText(species,message);
    setTimeout(()=>{ // Wait a second for the text to display before starting the animation
      this.triggerAnimation(attacker,action.attackName);
    },1200);
  }

  buildActionMessage = (dgmnData,attackName) => {
    let message = dgmnData.nickname+" used "+this.attackUtility.getDisplayName(attackName)+"!";

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
  takeAttack = (attacker,action) => {
    debugLog(`${attacker} using ${action.attackName} on ${action.targets}`);
    for(let i in action.targets ){
      let attackerData = this.dgmnAH.getDgmnData(attacker,['currentStats','currentLevel'],attacker.charAt(0) === 'e');
      let targetDEF = this.dgmnAH.getDgmnData(action.targets[i],['currentStats'],action.targets[i].charAt(0) === 'e').currentStats.DEF;
      let baseDMG = this.calcBaseDMG( attackerData.currentStats.ATK, attackerData.currentLevel, powerRanks[action.power],  targetDEF); // TODO - ATK/INT and DEF/RES

      let finalDMG = baseDMG; // TODO - Mods
      this.dealDMG(action.targets[i],finalDMG);
    }
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
  calcBaseDMG = (attackerATK, attackerLV, attackPWR, targetDEF) => {
    // FORMULA: ( ( ATK / DEF ) * (LV / 2 ) ) * PWR
    // The reason you have /2 is because the "weight" of that variable needs to be weaker
    let baseDMG = ( (attackerATK / targetDEF) * (attackerLV/2) ) * attackPWR;

    debugLog(`    ((${attackerATK}/${targetDEF}) x (${attackerLV}/2)) x ${attackPWR} = ${baseDMG}`);
    baseDMG += 50; // TEMP - Help speed up testing
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

}

export default AttackManager;
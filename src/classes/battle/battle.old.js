// THIS IS A DEAD FILE AND IS ONLY BEING USED FOR REFERENCE WHEN BUILDING NEW THINGS
// I am deleting things from this file that I no longer need to reference. When it's all useless, I will delete it

class Battle {
  constructor(){

  }

  
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

}

export default Battle;

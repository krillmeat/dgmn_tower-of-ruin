import config from "../config";
import { attacksDB } from "../data/attacks.db";
import { powerRanks } from "../data/ranks.db";

class Attack{
  constructor(attackName){
    this.attackName = attackName;
    this.displayName = attacksDB[this.attackName].displayName;
    this.type = attacksDB[this.attackName].type;
    this.maxCost = attacksDB[this.attackName].maxCost;
    this.currCost = 6;

    this.power = attacksDB[this.attackName].power;
    this.targets = attacksDB[this.attackName].targets;
    this.hits = attacksDB[this.attackName].hits;
    this.stat = attacksDB[this.attackName].stat;

    this.effect = attacksDB[this.attackName].effect || null;

    this.animationFrames = attacksDB[this.attackName].animationFrames;
  }

  /**------------------------------------------------------------------------
   * CALCULATE DAMAGE
   * ------------------------------------------------------------------------
   * Calculates the amount of damage the attack will do.
   * Does NOT include modifiers like weakness, criticals, etc.
   * ------------------------------------------------------------------------
   * @param {Number} targetDefense  DEF/RES stat of the Dgmn being attacked
   * @param {Number} attackerAttack ATK/INT stat of the Dgmn attacking
   * @param {Number} attackerLevel  Level of the Dgmn attacking
   * ----------------------------------------------------------------------*/
  calculateDamage = (targetDefense, attackerAttack, attackerLevel) => {
    // FORMULA: ( ( ATK / DEF ) * (LV / 2 ) ) * PWR
    // The reason you have /2's is because the "weight" of that variable needs to be weaker
    let atkDefDiff = attackerAttack / targetDefense;
    let preMods = Math.floor( ( atkDefDiff * ( attackerLevel / 2 ) * powerRanks[this.power] ) / this.hits );
    
    return preMods;
  }

  /**------------------------------------------------------------------------
   * ANIMATE
   * ------------------------------------------------------------------------
   * Handles the Attack Animation, including changing attacker/target sprites
   * ------------------------------------------------------------------------
   * @param {Dgmn}      target    Target of the attack
   * @param {Dgmn}      attacker  Attacker, doing the attack
   * @param {Function}  callback  Parent function to run when all done animating
   * ----------------------------------------------------------------------*/
  animate = (targets,attacker,triggerRedraw,canvas,fetchImage,callback) => {
    attacker.battleCanvas.attackAnimation();

    triggerRedraw();

    let x, y = 0;
    let target = undefined;
    let animationCounter = 0;
    let animationSection = 0;
    let currentTarget = 0;
    let targetCount = this.targets === 'single' ? 1 : 3;

    canvas.clearCanvas();

    let attackAnimation = setInterval(()=>{

      if(currentTarget < targetCount){
        target = targets[currentTarget];
        if(!target.isDead){
            target.battleCanvas.hurtAnimation();

          x = target.isEnemy ? 4 * (8 * config.screenSize ) : 12 * (8 * config.screenSize );
          y = ( 2 + ( target.battleLocation * 4 ) ) * (8 * config.screenSize );

          if(animationCounter === 0){
            canvas.clearCanvas();

            if(animationSection === this.animationFrames.length){
              currentTarget++;
              animationCounter = 0;
              animationSection = 0;
            } else{
              canvas.paintImage(fetchImage(this.animationFrames[animationSection][0]),x,y);
              triggerRedraw();
            }
            animationCounter++;
          } else if(animationCounter !== 0 && animationCounter >= this.animationFrames[animationSection][1]){
            animationSection++;
            animationCounter = 0;
          } else{
            animationCounter++;
          }
        } else{ 
          currentTarget++;
          animationCounter = 0;
          animationSection = 0;
         }
      } else{
        canvas.clearCanvas();
        triggerRedraw();
        clearInterval(attackAnimation);
        setTimeout(()=>{
          attacker.battleCanvas.isIdle = true;
          for(let i = 0; i < targetCount; i++){
            if(!targets[i].isDead) targets[i].battleCanvas.isIdle = true;
          }
          triggerRedraw();
        },200);
        setTimeout(()=>{
          callback();
        },2000);
      }

    },66);

  }

}

export default Attack;

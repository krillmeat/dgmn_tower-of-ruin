import AttackUtility from "../../classes/dgmn/utility/attack.util";
import DgmnUtility from "../../classes/dgmn/utility/dgmn.util";
import { itemByName, itemsDB } from "../../data/items.db";
import { debugLog } from "../../utils/log-utils";
import CannonCanvas from "../canvas/cannon.canvas";

class CannonManager{
  constructor(){
    this.dgmnAH; this.battleAH;
    this.cannonCanvas;
    this.attackUtility = new AttackUtility();
    this.dgmnUtility = new DgmnUtility();
  }

  
  initAH = (dgmnAH,battleAH) => {
    this.dgmnAH = dgmnAH;
    this.battleAH = battleAH;

    // this.attackCanvas = new AttackCanvas(this.battleAH.drawBattleCanvas,'attack',96,96,32,16);
    this.cannonCanvas = new CannonCanvas(this.battleAH.drawBattleCanvas,'cannon',96,96,32,16); // TODO - Those numbers could be wrong
  }

  /**------------------------------------------------------------------------
   * SHOOT
   * ------------------------------------------------------------------------
   * Handles everything that needs to happen when using an Item
   * Outsources almost all of the effects to the DGMN AH, but this function
   *   sends things on the right path
   * ------------------------------------------------------------------------
   * @param {String}  item    Name of the Item
   * @param {String}  side    Which side of Battle to use on [enemy|party]
   * @param {String}  target  List of all Targets of the Item
   * @param {Func}    onDone  Callback for when Animation is Done
   * ----------------------------------------------------------------------*/
  shoot = (item,side,target,onDone) => {
    const effect = itemsDB[itemByName[item.name]].effect;
    let effectMessage = '';

    switch(effect.type){
      case 'heal':
        this.dgmnAH.useItemOn(this.dgmnAH.getDgmnParty()[target[0]],itemByName[item.name]);
        effectMessage = `Healed DGMN ${effect.amount}${effect.stat}!`; // TODO - Get actual DGMN nickname
        break;
      default:
        effectMessage = 'Used an Item but it did bad';
        break;
    }

    this.runCannonAnimation(item.name,[effectMessage],onDone)
    
  }

  /**------------------------------------------------------------------------
   * RUN CANNON ANIMATION
   * ------------------------------------------------------------------------
   * Writes the text and does the Animation for the Cannon Shot
   * TODO - Right now, this doesn't animate any effect
   *        Should probably base everything on "onDone callbacks" and not
   *          timeouts
   * ------------------------------------------------------------------------
   * @param {String}  item          Name of the Item
   * @param {String}  effectMessage Compiled message of Item's Effect
   * @param {Func}    onDone        Callback for when Animation is Done
   * ----------------------------------------------------------------------*/
  runCannonAnimation = (item, effectMessage,onDone) => {
    this.battleAH.drawActionText('beetle',[`Gunnar fired ${item}!`])
    setTimeout(()=>{
      this.battleAH.drawActionText('beetle',effectMessage);
    },1600);

    // setInterval for actual animation

    // getItemAnimation(item) 

    setTimeout(()=>{
      this.battleAH.drawAllStatuses();
      onDone('dgmn')
    },3200)
  }
}

export default CannonManager;

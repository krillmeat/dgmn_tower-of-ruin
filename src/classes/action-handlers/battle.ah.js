/**------------------------------------------------------------------------
* BATTLE ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the Battle
 * ------
 * Action Handlers create an interface for lower-level Objects to act on
 * higher-level Objects
 * ------
 * Still trying to figure this out, because it's confusing to me, but the IDEA
 * is that you pass this Object into children, and they can send stuff back to the parent
 * ------
 * Pass in Parent Object methods to Constructor
 * ------
 * I'm thinking there should be no methods. Just callbacks in the constructors
 * ----------------------------------------------------------------------*/
 class BattleAH{
   constructor(cbObj){
    this.drawBattleCanvas = () => { cbObj.drawBattleCanvasCB() }
    this.paintToBattleCanvas = (image,x,y) => { cbObj.paintToBattleCanvasCB(image,x,y) }
    this.getDgmnDataByIndex = (dgmnIndex,data,isEnemy) => { return cbObj.getDgmnDataByIndexCB(dgmnIndex,data,isEnemy) }
    this.getDgmnAttackData = (dgmnIndex,data) => { return cbObj.getDgmnAttackDataCB(dgmnIndex,data) }
    this.selectAttack = () => { cbObj.selectAttackCB() }
    this.setCurrentAttackTarget = dir => { cbObj.setCurrentAttackTargetCB(dir) }
    this.addAction = (dgmnIndex,attackName,targetIndex,attackTargets,attackPower) => { cbObj.addActionCB(dgmnIndex,attackName,targetIndex,attackTargets,attackPower) }
    this.beginCombat = () => { cbObj.beginCombatCB() }
    this.getCurrDgmnChoice = () => { return cbObj.getCurrDgmnChoiceCB() }
    this.drawActionText = (species,message) => { cbObj.drawActionTextCB(species,message) }
    this.drawDgmnStatusMeter = (isEnemy,index,stat) => cbObj.drawDgmnStatusMeterCB(isEnemy,index,stat)
    this.drawAllStatuses = () => cbObj.drawAllStatusesCB()
    this.newTurn = () => cbObj.newTurnCB()
    this.checkBattleCondition = () => cbObj.checkBattleConditionCB()
    this.battleWin = () => cbObj.battleWinCB()
    this.battleLose = () => cbObj.battleLoseCB()
   }
 }

 export default BattleAH;
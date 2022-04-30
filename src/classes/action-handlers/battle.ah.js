/**------------------------------------------------------------------------
 * BATTLE - ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the Battle
 * ------
 * Action Handlers create an interface for lower-level Objects to act on
 * higher-level Objects
 * ------
 * The constructor (should) accept an Object that contains all of the required Callbacks
 * ------
 * NO METHODS ONLY CONSTRUCTOR
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
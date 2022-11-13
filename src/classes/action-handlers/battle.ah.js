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
    this.getBattleState = () => { return cbObj.getBattleStateCB() }
    this.drawBattleCanvas = () => { cbObj.drawBattleCanvasCB() }
    this.getDgmnDataByIndex = (dgmnIndex,data,isEnemy) => { return cbObj.getDgmnDataByIndexCB(dgmnIndex,data,isEnemy) }
    this.getDgmnAttackData = (dgmnIndex,data) => { return cbObj.getDgmnAttackDataCB(dgmnIndex,data) }
    this.addAction = (dgmnIndex,isEnemy,actionData) => cbObj.addActionCB(dgmnIndex,isEnemy,actionData)
    this.beginCombat = () => { cbObj.beginCombatCB() }
    this.drawActionText = (species,message) => { cbObj.drawActionTextCB(species,message) }
    this.drawAllStatuses = () => cbObj.drawAllStatusesCB()
    this.newTurn = () => cbObj.newTurnCB()
    this.checkBattleCondition = () => cbObj.checkBattleConditionCB()
    this.battleWin = () => cbObj.battleWinCB()
    this.battleLose = () => cbObj.battleLoseCB()
    this.addRewards = target => cbObj.addRewardsCB(target)
    this.gotoRewards = () => cbObj.gotoRewardsCB()
    this.giveCurrReward = dir => cbObj.giveCurrRewardCB(dir)
    this.levelUpNext = () => cbObj.levelUpNextCB()
    this.evolveCurrDgmn = () => cbObj.evolveCurrDgmnCB()
    this.selectBossReward = () => cbObj.selectBossRewardCB()
    this.closeGrowthMenu = () => cbObj.closeGrowthMenuCB()
    this.shootCannon = (item,target) => cbObj.shootCannonCB(item,target)
   }
 }

 export default BattleAH;
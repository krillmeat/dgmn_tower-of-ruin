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
   constructor(drawBattleCanvasCB,paintToBattleCanvasCB,getDgmnDataByIndexCB,getCurrentMenuButtonCB,setCurrentMenuButtonCB,getMenuChartCB,launchAttackSelectCB,getMenuStateCB,setCurrentAttackMenuItemCB,selectAttackCB,launchTargetSelectCB,setCurrentAttackTargetCB){
    this.drawBattleCanvas = () => { drawBattleCanvasCB() }
    this.paintToBattleCanvas = (image,x,y) => { paintToBattleCanvasCB(image,x,y) }
    this.getDgmnDataByIndex = (dgmnIndex,data) => { return getDgmnDataByIndexCB(dgmnIndex,data) }
    this.getCurrentMenuButton = () => { return getCurrentMenuButtonCB() }
    this.setCurrentMenuButton = label => { setCurrentMenuButtonCB(label) }
    this.getMenuChart = () => { return getMenuChartCB() }
    this.launchAttackSelect = () => { launchAttackSelectCB() }
    this.getMenuState = () => { return getMenuStateCB() }
    this.setCurrentAttackMenuItem = newIndex => { setCurrentAttackMenuItemCB(newIndex) }
    this.selectAttack = () => { selectAttackCB() }
    this.launchTargetSelect = data => { launchTargetSelectCB(data) }
    this.setCurrentAttackTarget = dir => { setCurrentAttackTargetCB(dir) }
   }
 }

 export default BattleAH;
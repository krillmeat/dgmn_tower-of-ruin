/**------------------------------------------------------------------------
 * DUNGEON ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the Dungeon
 * ------
 * Action Handlers create an interface for lower-level Objects to act on
 * higher-level Objects
 * ------
 * The constructor (should) accept an Object that contains all of the required Callbacks
 * ------
 * NO METHODS ONLY CONSTRUCTOR
 * ----------------------------------------------------------------------*/
 class DungeonAH{
    constructor(cbObj){
        this.getCurrentDirection = () => { return cbObj.getCurrentDirectionCB() }
        this.setCurrentDirection = newValue => { cbObj.setCurrentDirectionCB(newValue) }
        this.drawDungeon = () => cbObj.drawDungeonCB()
        this.paintFloorCanvas = canvas => { cbObj.paintFloorCanvasCB(canvas) }
        this.getDungeonState = () => { return cbObj.getDungeonStateCB() }
        this.getMoving = () => { return cbObj.getMovingCB() }
        this.setMoving = newValue => { cbObj.setMovingCB(newValue) }
        this.getCollision = () => { return cbObj.getCollisionCB() }
        this.setCollision = (dir,newValue) => { cbObj.setCollisionCB(dir,newValue) }
        this.moveFloor = (dir,upDown) => { cbObj.moveFloorCB(dir,upDown) }
        this.goUpFloor = () => { cbObj.goUpFloorCB() }
        this.startBattle = () => { cbObj.startBattleCB() }
        this.getCurrentFloor = () => { return cbObj.getCurrentFloorCB() }
        this.giveCurrReward = dir => cbObj.giveCurrRewardCB(dir)
        this.getTreasure = treasure => cbObj.getTreasureCB(treasure)
        this.closeTextBox = () => cbObj.closeTextBoxCB()
        this.bringUpMenu = () => cbObj.bringUpMenuCB()
        this.closeGrowthMenu = () => { cbObj.closeGrowthMenuCB() }
    }
}

export default DungeonAH;
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
    constructor(getCurrentDirectionCB,setCurrentDirectionCB, paintFloorCanvasCB, getDungeonStateCB, getMovingCB, setMovingCB, getCollisionCB,setCollisionCB, moveFloorCB, goUpFloorCB, startBattleCB){
        this.getCurrentDirection = () => { return getCurrentDirectionCB() }
        this.setCurrentDirection = newValue => { setCurrentDirectionCB(newValue) }
        this.paintFloorCanvas = canvas => { paintFloorCanvasCB(canvas) }
        this.getDungeonState = () => { return getDungeonStateCB() }
        this.getMoving = () => { return getMovingCB() }
        this.setMoving = newValue => { setMovingCB(newValue) }
        this.getCollision = () => { return getCollisionCB() }
        this.setCollision = (dir,newValue) => { setCollisionCB(dir,newValue) }
        this.moveFloor = (dir,upDown) => { moveFloorCB(dir,upDown) }
        this.goUpFloor = () => { goUpFloorCB() }
        this.startBattle = () => { startBattleCB() }
    }
}

export default DungeonAH;
/**------------------------------------------------------------------------
 * DUNGEON ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the Dungeon
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
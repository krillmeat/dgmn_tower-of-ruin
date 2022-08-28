/**------------------------------------------------------------------------
 * GAME ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the Game
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
// TODO - I need to split this one into a cbObj
class GameAH{
    constructor(addToObjectListCB,drawGameScreenCB,startBattleCB,getDgmnPartyCB,endBattleCB,buildDungeonCB,startNewGameCB){
        this.addCanvasObject = canvas => { addToObjectListCB(canvas) }
        this.refreshScreen = () => { drawGameScreenCB() }
        this.startBattle = () => { startBattleCB() }
        this.getDgmnParty = () => { return getDgmnPartyCB() }
        this.endBattle = () => endBattleCB()
        this.buildDungeon = () => buildDungeonCB()
        this.startNewGame = () => startNewGameCB()
    }
}

export default GameAH;
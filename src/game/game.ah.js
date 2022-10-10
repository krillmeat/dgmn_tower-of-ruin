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
    constructor(cbObj){
        this.addCanvasObject = canvas => { cbObj.addToObjectListCB(canvas) }
        this.refreshScreen = () => { cbObj.drawGameScreenCB() }
        this.startBattle = () => { cbObj.startBattleCB() }
        this.getDgmnParty = () => { return cbObj.getDgmnPartyCB() }
        this.endBattle = () => cbObj.endBattleCB()
        this.buildDungeon = () => cbObj.buildDungeonCB()
        this.startNewGame = () => cbObj.startNewGameCB()
    }
}

export default GameAH;

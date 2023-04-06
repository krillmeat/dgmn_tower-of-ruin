/**------------------------------------------------------------------------
 * TOWN - ACTION HANDLER
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
class TownAH{
  constructor(cbObj){
   this.drawTown = () => { cbObj.drawTownCB() }
   this.enterTower = () => { cbObj.enterTowerCB() }
  }
}

export default TownAH;

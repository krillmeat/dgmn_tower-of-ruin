/**------------------------------------------------------------------------
 * DIGI BEETLE ACTION HANDLER
 * ------------------------------------------------------------------------
 * Maintains Callbacks (actions) for the DigiBeetle
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
class DigiBeetleAH{
    constructor(cbObj){
      this.init = () => cbObj.initCB()
      this.addItemToToolBox = item => cbObj.addItemToToolBoxCB(item)
      this.getToolBoxItems = () => { return cbObj.getToolBoxItemsCB() }
      this.getToolBoxType = () => { return cbObj.getToolBoxTypeCB() }
      this.hideCanvas = () => cbObj.hideCanvasCB()
      this.showCanvas = () => cbObj.showCanvasCB()
    }
}

export default DigiBeetleAH;
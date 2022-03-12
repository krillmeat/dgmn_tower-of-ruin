// TODO - This whole damn thing seems flimsy

class DgmnParty{
  constructor(dgmnAH,partyList=[],isEnemy=false){
    this.dgmnList = partyList;
    this.dgmnAH = dgmnAH;
  }

  getBattleLocation = dgmnId => {
    for(let i = 0; i < this.dgmnList.length; i++){
      if(this.dgmnList[i] === dgmnId){
        return i;
      }
    }
  }

  /**------------------------------------------------------------------------
   * BUILD DGMN CANVASES
   * ------------------------------------------------------------------------
   * Creates all of the Cnavases for the Dgmn
   * These do not get added to the Object List
   * ------------------------------------------------------------------------
   * @param {Func}  fetchImageCB  Callback to fetch an image from the Img Handler
   * @param {Func}  drawBattleCanvasCB  Callback to draw Battle Canvas
   * ----------------------------------------------------------------------*/
   buildDgmnCanvases = (fetchImageCB,drawBattleCanvasCB) => {
    for(let i = 0; i < this.dgmnList.length; i++){
      let dgmn = this.dgmnAH.getDgmnData(this.dgmnList[i],['speciesName']);
      let battleLocation = this.getBattleLocation(this.dgmnList[i]);
      let dgmnImageList = [fetchImageCB(`${dgmn.speciesName.toLowerCase()}Idle0`),
                           fetchImageCB(`${dgmn.speciesName.toLowerCase()}Idle1`)];
      this.dgmnAH.initDgmnCanvas(this.dgmnList[i],drawBattleCanvasCB,dgmnImageList,battleLocation);
      this.dgmnAH.drawDgmnToCanvas(fetchImageCB(`${dgmn.speciesName.toLowerCase()}Idle1`)); // Starts at Idle1 because otherwise the first "tick" of the animation is the same as the first
      this.dgmnAH.startDgmnIdleAnimation();
    }
  }

}

export default DgmnParty;

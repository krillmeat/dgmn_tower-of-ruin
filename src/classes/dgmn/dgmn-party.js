class DgmnParty{
  constructor(partyList=[],isEnemy=false){
    this.dgmnList = partyList;
  }

  getBattleLocation = dgmnId => {
    for(let i = 0; i < this.dgmnList.length; i++){
      if(this.dgmnList[i].dgmnId === dgmnId){
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
      let dgmn = this.dgmnList[i];
      let battleLocation = this.getBattleLocation(dgmn.dgmnId);
      let dgmnImageList = [fetchImageCB(`${dgmn.speciesName.toLowerCase()}Idle0`),
                           fetchImageCB(`${dgmn.speciesName.toLowerCase()}Idle1`)];
      dgmn.initCanvas(drawBattleCanvasCB,dgmnImageList,battleLocation);
      dgmn.drawDgmnToCanvas(fetchImageCB(`${dgmn.speciesName.toLowerCase()}Idle1`)); // Starts at Idle1 because otherwise the first "tick" of the animation is the same as the first
      dgmn.startIdleAnimation();
    }
  }

}

export default DgmnParty;

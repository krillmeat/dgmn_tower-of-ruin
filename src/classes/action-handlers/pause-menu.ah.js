class PauseMenuAH{
  constructor(cbObj){
    this.getState = () => { return cbObj.getStateCB() }
    this.nextIcon = () => cbObj.nextIconCB()
    this.prevIcon = () => cbObj.prevIconCB()
    this.selectIcon = () => cbObj.selectIconCB()
    this.upListItem =  () => cbObj.upListItemCB()
    this.rightListItem = () => cbObj.rightListItemCB()
    this.downListItem = () => cbObj.downListItemCB()
    this.leftListItem = () => cbObj.leftListItemCB()
    this.selectListItem = () => cbObj.selectListItemCB()
    this.backMenu = () => cbObj.backMenuCB()
  }
}

export default PauseMenuAH;
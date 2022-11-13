class BattleMenuAH{
  constructor(cbObj){
    this.nextIcon = () => { cbObj.nextIconCB() }
    this.prevIcon = () => { cbObj.prevIconCB() }
    this.selectIcon = () => { cbObj.selectIconCB() }
    this.getCurrMenuType = () => { return cbObj.getCurrMenuTypeCB() }
    this.nextListItem = () => { cbObj.nextListItemCB() }
    this.prevListItem = () => { cbObj.prevListItemCB() }
    this.selectListItem = () => { cbObj.selectListItemCB() }
    this.setTopMessage = () => { cbObj.setTopMessageCB() }
    this.getState = () => { return cbObj.getStateCB() }
    this.levelUpNext = () => cbObj.levelUpNextCB()
    this.getMenuLabel = () => cbObj.getMenuLabelCB()
    this.goBack = () => cbObj.goBackCB()
    
  }
}

export default BattleMenuAH;
class BattleMenuAH{
  constructor(cbObj){
    this.nextIcon = () => { cbObj.nextIconCB() }
    this.prevIcon = () => { cbObj.prevIconCB() }
    this.selectIcon = () => { cbObj.selectIconCB() }
    this.getCurrMenuType = () => { return cbObj.getCurrMenuTypeCB() }
    this.nextListItem = () => { cbObj.nextListItemCB() }
    this.prevListItem = () => { cbObj.prevListItemCB() }
    this.selectListItem = () => { cbObj.selectListItemCB() }
  }
}

export default BattleMenuAH;
class BattleMenuAH{
  constructor(cbObj){
    this.nextIcon = () => { cbObj.nextIconCB() }
    this.prevIcon = () => { cbObj.prevIconCB() }
    this.getCurrMenuType = () => { return cbObj.getCurrMenuTypeCB() }
    this.selectIcon = () => { cbObj.selectIconCB() }
  }
}

export default BattleMenuAH;
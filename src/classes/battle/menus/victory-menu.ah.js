class VictoryMenuAH{
  constructor(cbObj){
    this.getState = () => { return cbObj.getCurrStateCB() }
    this.getCurrMenuType = () => { return cbObj.getCurrMenuTypeCB() }
    this.nextIcon = () => cbObj.nextEvolutionCB()
    this.prevIcon = () => cbObj.prevEvolutionCB()
  }
}

export default VictoryMenuAH;
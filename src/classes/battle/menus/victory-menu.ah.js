class VictoryMenuAH{
  constructor(cbObj){
    this.getState = () => { return cbObj.getCurrStateCB() }
    this.getCurrMenuType = () => { return cbObj.getCurrMenuTypeCB() }
    this.nextIcon = () => cbObj.nextEvolutionCB()
    this.prevIcon = () => cbObj.prevEvolutionCB()
    this.navDown = () => cbObj.navDownCB()
    this.navUp = () => cbObj.navUpCB()
    this.selectBossReward = () => cbObj.selectBossRewardCB()
  }
}

export default VictoryMenuAH;
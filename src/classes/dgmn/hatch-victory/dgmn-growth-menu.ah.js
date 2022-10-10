class DgmnGrowthMenuAH{
  constructor(cbObj){
    // this.getState = () => { return cbObj.getCurrStateCB() }
    this.getState = () => cbObj.getStateCB()
    this.giveCurrReward = dir => { cbObj.giveCurrRewardCB(dir) }
    this.prevHatch = () => { cbObj.prevHatchCB() }
    this.nextHatch = () => { cbObj.nextHatchCB() }
    this.selectHatch = () => { cbObj.selectHatchCB() }
    this.selectEvo = () => { cbObj.selectEvoCB() }
    this.confirmLevelUp = () => { cbObj.confirmLevelUpCB() }
  }
}

export default DgmnGrowthMenuAH;

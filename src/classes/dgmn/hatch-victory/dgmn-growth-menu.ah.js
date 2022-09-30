class DgmnGrowthMenuAH{
  constructor(cbObj){
    // this.getState = () => { return cbObj.getCurrStateCB() }
    this.getState = () => cbObj.getStateCB()
    this.giveCurrReward = dir => { cbObj.giveCurrRewardCB(dir) }
  }
}

export default DgmnGrowthMenuAH;

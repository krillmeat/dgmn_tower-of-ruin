class DgmnGrowthMenuAH{
  constructor(cbObj){
    // this.getState = () => { return cbObj.getCurrStateCB() }
    this.getState = () => cbObj.getStateCB()
    this.giveCurrReward = dir => { cbObj.giveCurrRewardCB(dir) }
    this.prevHatch = () => { cbObj.prevHatchCB() }
    this.nextHatch = () => { cbObj.nextHatchCB() }
    this.prevEvo = () => { cbObj.prevEvoCB() }
    this.nextEvo = () => { cbObj.nextEvoCB() }
    this.selectHatch = () => { cbObj.selectHatchCB() }
    this.selectEvo = () => { cbObj.selectEvoCB() }
    this.confirmLevelUp = () => { cbObj.confirmLevelUpCB() }
    this.nextBossReward = () => { cbObj.nextBossRewardCB() }
    this.prevBossReward = () => { cbObj.prevBossRewardCB() }
    this.selectBossReward = () => { cbObj.selectBossRewardCB() }
    this.skipEvo = () => {cbObj.skipEvoCB() }
    this.goBack = () => { cbObj.goBackCB() }
  }
}

export default DgmnGrowthMenuAH;

class DgmnAH{
  constructor(cbObj){
    this.getDgmnData = (dgmnId,dataList,isEnemy) => { return cbObj.getDgmnDataCB(dgmnId,dataList,isEnemy) }
    this.getDgmnAttackData = (dgmnId,dataList) => { return cbObj.getDgmnAttackDataCB(dgmnId,dataList) }
    this.initDgmnCanvas = (dgmnId,drawCB,imageList,battleLocation) =>  cbObj.initDgmnCanvasCB(dgmnId,drawCB,imageList,battleLocation) 
    this.getCanvas = dgmnId => { return cbObj.getCanvasCB(dgmnId) }
    this.startDgmnIdleAnimation = dgmnId =>  cbObj.animateDgmnCB(dgmnId)
    this.useAttack =(dgmnId,amount,attackName) => cbObj.useAttackCB(dgmnId,amount,attackName)
    this.dealDMG = (dgmnId,dmg) =>  cbObj.dealDMGCB(dgmnId,dmg) 
    this.checkKO = dgmnId => cbObj.checkKOCB(dgmnId)
    this.checkAllDead = isEnemy => cbObj.checkAllDeadCB(isEnemy)
    this.createDgmn = (index,data,isEnemy) => cbObj.createDgmnCB(index,data,isEnemy)
    this.generateEnemies = data => cbObj.generateEnemiesCB(data)
    this.modifyCombo = (target,comboDelta) => cbObj.modifyComboCB(target,comboDelta)
    this.modifyWeak = (target,weakDelta) => cbObj.modifyWeakCB(target,weakDelta)
    this.showDgmnFrame = (dgmnId,frame) => cbObj.showDgmnFrameCB(dgmnId,frame)
    this.idleDgmn = dgmnId => cbObj.idleDgmnCB(dgmnId)
    this.getIsDead = dgmnId => cbObj.getIsDeadCB(dgmnId)
    this.battleWrapUp = (dgmnId,rewards) => { return cbObj.battleWrapUpCB(dgmnId,rewards) }
    this.moveDgmnCanvas = (dgmnId,newX,newY) => cbObj.moveDgmnCanvasCB(dgmnId,newX,newY)
    this.stopDgmnCanvas = (dgmnId) => cbObj.stopDgmnCanvasCB(dgmnId)
    this.giveDgmnReward = (dgmnId,reward) => cbObj.giveDgmnRewardCB(dgmnId,reward)
    this.giveDgmnXP = (dgmnId,xp) => cbObj.giveDgmnXPCB(dgmnId,xp)
    this.checkLevelUp = dgmnId => cbObj.checkLevelUpCB(dgmnId)
    this.buildStatGrowth = (dgmnId,stats) => { return cbObj.buildStatGrowthCB(dgmnId,stats) }
    this.getTempDgmn = () => { return cbObj.getTempDgmnCB() }
    this.evolve = (dgmnId,speciesName) => cbObj.evolveCB(dgmnId,speciesName)
  }
}

export default DgmnAH;
class DgmnAH{
  constructor(cbObj){
    this.getDgmnData = (dgmnId,dataList,isEnemy) => { return cbObj.getDgmnDataCB(dgmnId,dataList,isEnemy) }
    this.getDgmnAttackData = (dgmnId,dataList) => { return cbObj.getDgmnAttackDataCB(dgmnId,dataList) }
    this.initDgmnCanvas = (dgmnId,drawCB,imageList,battleLocation) =>  cbObj.initDgmnCanvasCB(dgmnId,drawCB,imageList,battleLocation) 
    this.getCanvas = dgmnId => { return cbObj.getCanvasCB(dgmnId) }
    this.startDgmnIdleAnimation = dgmnId =>  cbObj.animateDgmnCB(dgmnId) 
    this.dealDMG = (dgmnId,dmg) =>  cbObj.dealDMGCB(dgmnId,dmg) 
    this.checkKO = dgmnId => cbObj.checkKOCB(dgmnId)
    this.checkAllDead = isEnemy => cbObj.checkAllDeadCB(isEnemy)
    this.createDgmn = (index,data,isEnemy) => cbObj.createDgmnCB(index,data,isEnemy)
    this.generateEnemies = () => cbObj.generateEnemiesCB()
  }
}

export default DgmnAH;
class DgmnAH{
  constructor(getDgmnDataCB,getDgmnAttackDataCB,initDgmnCanvasCB,getCanvasCB,animateDgmnCB){
    this.getDgmnData = (dgmnId,dataList,isEnemy) => { return getDgmnDataCB(dgmnId,dataList,isEnemy) }
    this.getDgmnAttackData = (dgmnId,dataList) => { return getDgmnAttackDataCB(dgmnId,dataList) }
    this.initDgmnCanvas = (dgmnId,drawCB,imageList,battleLocation) => { initDgmnCanvasCB(dgmnId,drawCB,imageList,battleLocation) }
    this.getCanvas = dgmnId => { return getCanvasCB(dgmnId) }
    this.startDgmnIdleAnimation = dgmnId => { animateDgmnCB(dgmnId) }
  }
}

export default DgmnAH;
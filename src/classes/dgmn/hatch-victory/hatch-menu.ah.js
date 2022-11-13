class HatchMenuAH{
  constructor(cbObj){
    this.getState = () => { return cbObj.getStateCB() }
    this.nextHatch = () => cbObj.nextHatchCB()
    this.prevHatch = () => cbObj.prevHatchCB()
  }
}

export default HatchMenuAH;
class HatchMenuAH{
  constructor(cbObj){
    this.getState = () => { return cbObj.getStateCB() }
  }
}

export default HatchMenuAH;
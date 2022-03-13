class AttackManager{
  constructor(){
    this.attackActions = {};  
  }

  addAction = action => {
    console.log("Adding Action = ",action);
  }

}

export default AttackManager;
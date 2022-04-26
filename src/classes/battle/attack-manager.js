class AttackManager{
  constructor(){
    this.attackActions = {};  
  }

  addAction = (dgmnId,attackName) => {
    this.attackActions[dgmnId] = {};
    this.attackActions[dgmnId].attackName = attackName;
    // this.attackActions[dgmnId].attacker = attacker;
    // this.attackActions[dgmnId].targets = targets;
  }

  removeAction = action => {
    console.log("Removing Actions = ",action);
  }

}

export default AttackManager;
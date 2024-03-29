import AttackUtility from "./utility/attack.util";

class Attack{
  constructor(attackName){
    this.attackName = attackName;
    this.attackUtility = new AttackUtility();
    
    this.displayName = this.attackUtility.getDisplayName(this.attackName);
    this.maxCost = this.attackUtility.getMaxCost(this.attackName);
    this.type = this.attackUtility.getType(this.attackName);
    this.power = this.attackUtility.getPower(this.attackName);
    this.targets = this.attackUtility.getTargets(this.attackName);
    this.hits = this.attackUtility.getHits(this.attackName);

    this.currCost = this.maxCost;
  }
}

export default Attack;
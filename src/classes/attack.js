import { attacksDB } from "../data/attacks.db";
import { powerRanks } from "../data/ranks.db";

class Attack{
  constructor(attackName){
    this.attackName = attackName;
    this.type = attacksDB[this.attackName].type;
    this.maxCost = attacksDB[this.attackName].maxCost;
    this.currCost = 6;

    this.power = attacksDB[this.attackName].power;
    this.targets = attacksDB[this.attackName].targets;
  }
}

export default Attack;
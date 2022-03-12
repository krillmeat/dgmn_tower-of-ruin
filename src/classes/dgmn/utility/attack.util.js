import { attacksDB } from "../../../data/attacks.db";

class AttackUtility{
  constructor(){}

  getDisplayName = attackName => { return attacksDB[attackName].displayName }
  getMaxCost = attackName => { return attacksDB[attackName].maxCost }
  getType = attackName => { return attacksDB[attackName].type }
  getPower = attackName => { return attacksDB[attackName].power }
  getTargets = attackName => { return attacksDB[attackName].targets }
  getHits = attackName => { return attacksDB[attackName].hits }
}

export default AttackUtility;
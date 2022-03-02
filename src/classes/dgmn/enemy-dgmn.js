import Dgmn from "./dgmn";
class EnemyDgmn extends Dgmn{
  constructor(...args){
    super(...args);
    this.isEnemy = true;
  }
}

export default EnemyDgmn;
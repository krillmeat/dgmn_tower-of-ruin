import {enemyPartyMock} from '../../mock/dgmn.mock'

class EnemyGenerator{
  constructor(dgmnAH){
    this.dgmnAH = dgmnAH;
  }

  generate = data => {
    let enemies = {};
    console.log("Generating Enemies");

    for(let i = 0; i < 3; i++){
      // Mock for now, but eventually from Data
      let dgmnData = {
        speciesName: enemyPartyMock[`edId${i}`].speciesName,
        currentStats: enemyPartyMock[`edId${i}`].currentStats
      };
      this.dgmnAH.createDgmn(i,dgmnData,true)
    }

    return enemies;
  }
}

export default EnemyGenerator;
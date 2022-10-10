import {bossEncountersDB, bossEncountersChartDB, bossEncoutnersMapDB, dgmnEncounterChartDB, dgmnEncounterDB, dgmnEncounterFieldsDB} from '../../data/encounters.db';
import MapUtility from '../../dungeon/utils/map.util';

class EnemyGenerator{
  constructor(dgmnAH){
    this.dgmnAH = dgmnAH;

    this.mapUtility = new MapUtility();
  }

  generate = (currFloor,maxFloor) => {
    let enemies = {};
    console.log("Generating Enemies on Floor ",currFloor);

    for(let i = 0; i < 3; i++){
      let stage = this.calcDgmnStage(currFloor);
      let field = this.calcDgmnField(); // TODO - Pass in mods
      let dgmnName = this.mapUtility.isBossFloor(currFloor) ? bossEncountersChartDB[bossEncoutnersMapDB.indexOf(currFloor)][i] : this.calcDgmnName(stage,field);
      let dgmnData = this.mapUtility.isBossFloor(currFloor) ?  bossEncountersDB[dgmnName] : dgmnEncounterDB[dgmnName];
      this.dgmnAH.createDgmn(i,dgmnData,true);
    }

    return enemies;
  }

  calcDgmnStage = currFloor => {
    let rando;

    // TODO - There should be a lot of logic here, but for now, it's simple
    if(currFloor < 2){ return 1
    } else if(currFloor === 2 || currFloor === 3){
      return Math.floor(Math.random() * 100) < 80 ? 1 : 2; // 80% 1 : 20% 2
    } else if(currFloor === 4){
      return Math.floor(Math.random() * 100) < 60 ? 2 : 1; // 60% 2 : 40% 1
    }

    return 1;
  }

  calcDgmnField = mods => {
    // TODO - Mods will change the percent chance to see certain DGMN, for now, all equal chance
    let rando = Math.floor(Math.random() * 8);

    return rando;
  }

  calcDgmnName = (stage,field) => {
    let dgmnArray = dgmnEncounterChartDB[stage][dgmnEncounterFieldsDB[field]].dgmnList;
    let rando = Math.floor(Math.random() * dgmnEncounterChartDB[stage][dgmnEncounterFieldsDB[field]].pre10);
    let dgmn = dgmnArray[rando];



    return dgmn
  }

}

export default EnemyGenerator;
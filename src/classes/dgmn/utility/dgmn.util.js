import { dgmnDB } from '../../../data/dgmn.db';

class DgmnUtility{
  constructor(){

  }

  getAllDgmnImages = speciesName => {
    return [`DGMN/${speciesName.toLowerCase()}Idle0`,
            `DGMN/${speciesName.toLowerCase()}Idle1`,
            `DGMN/${speciesName.toLowerCase()}Attack`,
            `DGMN/${speciesName.toLowerCase()}Hurt`,
            `DGMN/${speciesName.toLowerCase()}Portrait`]
  }

  getAllEvoImages = speciesName => {
    let allImgs = [];
    
    let evos = this.getEvolutions(speciesName);

    for(let evo of evos){
      allImgs.push(`DGMN/${evo.toLowerCase()}Idle0`)
      allImgs.push(`DGMN/${evo.toLowerCase()}Idle1`)
      allImgs.push(`DGMN/${evo.toLowerCase()}Portrait`)
    }

    return allImgs;
  }

  getTypeMod = (type,speciesName) => {
    return dgmnDB[speciesName].types[type] || 1;
  }

  getStage = speciesName => {
    console.log("SN ? ",speciesName);
    return dgmnDB[speciesName].stage;
  }

  isEnemy = dgmnId => {
    return dgmnId.charAt(0) === 'e';
  }

  checkLevelReq = level => {
    return 3 * (level);
  }

  getAllBaseStats = speciesName => {
    return dgmnDB[speciesName].stats;
  }

  getBaseStat = (speciesName,stat) => {
    return dgmnDB[speciesName].stats[stat];
  }

  getBaseFP = speciesName => {
    return dgmnDB[speciesName].fields;
  }

  getEvolutions = speciesName => {
    return dgmnDB[speciesName].evolutions;
  }

  getEvoFP = speciesName => {
    return dgmnDB[speciesName].evoFields;
  }

  checkEvolution = (dgmnData) => {
    let evolutions = dgmnDB[dgmnData.speciesName].evolutions;

    if(evolutions.length === 0) return false;

    for(let evo of evolutions){
      let evoFP = this.getEvoFP(evo);
      for(let FP in evoFP){
        if(dgmnData.currentFP[FP] < evoFP[FP]){
              return false;
            }
      }
    }

    return true;
  }

  canEvolveInto = (dgmnFP,evoSpecies) => {
    let evoFP = this.getEvoFP(evoSpecies);
    for(let FP in evoFP){
      if(dgmnFP[FP] < evoFP[FP]){
        return false;
      }
    }

    return true;
  }

}

export default DgmnUtility;
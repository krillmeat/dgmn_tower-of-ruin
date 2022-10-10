import { dgmnDB } from '../../../data/dgmn.db';
import { digiTamaDB } from '../../../data/digitama.db';

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

  getAllHatchImages = eggField => {
    let allImgs = [];
    
    let hatches = this.getEggHatches(eggField);

    for(let hatch of hatches){
      allImgs.push(`DGMN/${hatch.toLowerCase()}Idle0`)
      allImgs.push(`DGMN/${hatch.toLowerCase()}Idle1`)
      allImgs.push(`DGMN/${hatch.toLowerCase()}Portrait`)
    }

    return allImgs;
  }

  getTypeMod = (type,speciesName) => {
    return dgmnDB[speciesName].types[type] || 1;
  }

  getStage = speciesName => {
    return dgmnDB[speciesName].stage;
  }

  getAttribute = species => {
    return dgmnDB[species].attr;
  }

  isEnemy = dgmnId => {
    return dgmnId.charAt(0) === 'e';
  }

  checkLevelReq = level => {
    return 3 * (level);
  }

  getAttack = species => { return dgmnDB[species].attack }

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

  getHatchFP = species => {
    return dgmnDB[species].hatchFields;
  }

  buildInitialStats = species => {
    let stats = {HP:10, ATK:1, DEF:1, INT:1, RES:1, HIT:1, AVO:1, SPD:1};

    for(let stat in stats){
      stats[stat] += this.getAllBaseStats(species)[stat]
    }

    return stats;
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
    } return true;
  }

  canEvolveIntoAny = (dgmnFP,currSpecies) => {
    let evolutions = this.getEvolutions(currSpecies);
    for(let evo of evolutions){
      if(this.canEvolveInto(dgmnFP,evo)) return true
    } return false;
  }

  canHatchInto = (dgmnFP,hatchSpecies) => {
    let hatchFP = this.getHatchFP(hatchSpecies);
    for(let FP in hatchFP){
      if(dgmnFP[FP] < hatchFP[FP]){
        return false;
      }
    } return true;
  }

  getEggHatches = field => {
    return digiTamaDB[field];
  }

}

export default DgmnUtility;

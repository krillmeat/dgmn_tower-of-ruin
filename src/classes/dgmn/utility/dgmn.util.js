class DgmnUtility{
  constructor(){

  }

  getAllDgmnImages = speciesName => {
    return [`./sprites/Battle/Dgmn/${speciesName.toLowerCase()}Idle0.png`,
            `./sprites/Battle/Dgmn/${speciesName.toLowerCase()}Idle1.png`,
            `./sprites/Battle/Dgmn/${speciesName.toLowerCase()}Attack.png`,
            `./sprites/Battle/Dgmn/${speciesName.toLowerCase()}Hurt.png`,
            `./sprites/Battle/Dgmn/${speciesName.toLowerCase()}Portrait.png`]
  }
}

export default DgmnUtility;
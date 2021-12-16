export const getDgmnById = (id, dgmnList) => {
  for(let i = 0; i < dgmnList.length; i++){
    if(dgmnList[i].dgmnId === id) return i;
  }
  return -1;
}

export const getComboLetter = combo =>{
  let letter = 'F';
  if(combo > 1 && combo < 5){
    letter = 'E';
  } else if(combo > 4 && combo < 9){
    letter = 'D';
  } else if(combo > 8 && combo < 14){
    letter = 'C';
  } else if(combo > 13 && combo < 19){
    letter = 'B';
  } else if(combo > 18 && combo < 24){
    letter = 'A';
  } else if(combo >= 25){
    letter = 'S';
  }

  return letter;
}

export const getStatNameFromIndex = index => {
  let stat = '';
  switch(index){
    case 0:
      stat = 'HP';
      break;
    case 1:
      stat = 'ATK';
      break;
    case 2:
      stat = 'DEF';
      break;
    case 3:
      stat = 'INT';
      break;
    case 4:
      stat = 'RES';
      break;
    case 5:
      stat = 'HIT';
      break;
    case 6:
      stat = 'AVO';
      break;
    case 7:
      stat = 'SPD';
      break;
    default:
      break;
  }
  return stat;
}
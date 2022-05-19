export const getDgmnById = (id, dgmnList) => {
  for(let i = 0; i < dgmnList.length; i++){
    if(dgmnList[i].dgmnId === id) return i;
  }
  return -1;
}

// TODO - I changed the Stats, shouldn't need this anymore
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
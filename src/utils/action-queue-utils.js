export const addSpacers = (array, count) =>{
  let spacerArray = [];
  for(let i = 0; i < count; i++){
    spacerArray.push(null);
  }
  return array.push(...spacerArray);
}
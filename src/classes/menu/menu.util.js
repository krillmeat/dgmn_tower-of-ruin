class MenuUtility{
  constructor(){}

  /**------------------------------------------------------------------------
   * PREPEND ZEROS
   * ------------------------------------------------------------------------
   * Sometimes, you want a String of Numbers to have a couple of zeros in front,
   * if it's not at the max length
   * ------------------------------------------------------------------------
   * @param {Number} number Original number with no zeros
   * @param {Number} max    The number of characters that should be in the number
   * @returns New String of Numbers with zeros in front
   * ----------------------------------------------------------------------*/
   prependZeros = (number,max) => {
    let zeroCount = max - number.toString().length;
    let zeroString = "";
    for(let i = 0; i < zeroCount; i++){
      zeroString+="0";
    }
    return zeroString+number.toString();
  }
}

export default MenuUtility;
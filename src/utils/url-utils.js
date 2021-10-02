/**------------------------------------------------------------------------
 * IN DEBUG
 * ------------------------------------------------------------------------
 * Checks if Debug is acive, based on Query Parameter 
 * ------------------------------------------------------------------------
 * @returns {Boolean} Is Debug On or Not
 * ----------------------------------------------------------------------*/
export const inDebug = () => {
  return getAllQueryParams().debug === 'true';
}

/**------------------------------------------------------------------------
 * GET ALL QUERY PARAMS
 * ------------------------------------------------------------------------
 * Gathers all of the Query Params into an Object
 * Removes starting ? and splits 'name=value' into {name:value}
 * ------------------------------------------------------------------------
 * @returns {Object} All Params split into an object
 * ----------------------------------------------------------------------*/
export const getAllQueryParams = () => {
  let url = window.location.href;
  let params = url.substring(url.indexOf("?")+1);
  let paramObj = {};
  for(let param of params.split("&")){
    let split = param.split("=");
    paramObj[split[0]] = split[1];
  }
  return paramObj;
}
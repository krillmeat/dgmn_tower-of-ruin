import { inDebug } from "./url-utils";

/**------------------------------------------------------------------------
   * GAME LOG
   * ------------------------------------------------------------------------
   * Logs info for the Game, should log at all times
   * ----------------------------------------------------------------------*/
export const gameLog = (message,object) => {
  object ? console.log(`%c${message}`,'color:#75715E',object) : console.log(`%c${message}`,'color:#75715E');
}

/**------------------------------------------------------------------------
   * DEBUG LOG
   * ------------------------------------------------------------------------
   * Logs Debug Logs, which are more verbose than Game Logs
   * Used only when debug=true is set in the URL Params
   * ----------------------------------------------------------------------*/
export const debugLog = (message,object) => {
  if(inDebug())
    object ? console.log(`%c${message}`,'color:#A6E22E',object) : console.log(`%c${message}`,'color:#A6E22E');
}
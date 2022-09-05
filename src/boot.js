/**------------------------------------------------------------------------
 * BOOT
 * ------------------------------------------------------------------------
 * This is the Root JS File
 * It handles the Loading Event for the Entire System
 * ----------------------------------------------------------------------*/

import System from './system/system';
import config from './config';
import { debugLog } from './utils/log-utils';

// Once Window is Loaded, Initialize
window.onload = function(){
  init();
}

/**------------------------------------------------------------------------
 * INITIALIZE
 * ------------------------------------------------------------------------
 * Once the base Webpage is loaded, Boot up the System
 * ----------------------------------------------------------------------*/
function init(){
  debugLog(`Booting for ${config.userName}...`);
  
  let system = new System();
  setTimeout(()=> {
    system.start();
  },1000);
}

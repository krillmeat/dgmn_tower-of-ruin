/**------------------------------------------------------------------------
 * BOOT
 * ------------------------------------------------------------------------
 * This is the Root JS File
 * It handles the Loading Event for the Entire System
 * ----------------------------------------------------------------------*/

import System from './classes/system';
import config from './config';
import { debugLog } from './utils/log-utils';

// Once Window is Loaded, Initialize
window.onload = function(){
  init();
}

function init(){
  debugLog(`Booting for ${config.userName}...`);
  
  let system = new System();
  setTimeout(()=> {
    system.start();
  },1000);
}

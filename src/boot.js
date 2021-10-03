import System from './classes/system';
import config from './config';
import { debugLog } from './utils/log-utils';

window.onload = function(){
  init();
}

export function init(){
  debugLog(`Booting for ${config.userName}...`);
  
  let system = new System();
  setTimeout(()=> {
    system.start();
  },1000);
}
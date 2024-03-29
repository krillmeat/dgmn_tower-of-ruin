/**------------------------------------------------------------------------
 * BOOT
 * ------------------------------------------------------------------------
 * This is the Root JS File
 * It handles the Loading Event for the Entire System
 * ----------------------------------------------------------------------*/

import System from './system/system';
import CFG from './config';
import { debugLog } from './utils/log-utils';

// Once Window is Loaded, Initialize
window.onload = function(){
  init();
}

const setIsMobile = () => {
  if(navigator.userAgent.match(/Android/i)){
    document.body.dataset.view = 'mobile';
    let mobileControllerElem = document.querySelector(".mobile-controls");
    let windowHeight = window.innerHeight;
    let screenHeight = document.getElementById("game-screen").offsetHeight;
    mobileControllerElem.style.height = `${windowHeight - screenHeight}px`;
    mobileControllerElem.style.top = `${screenHeight}px`;
  }
}

/**------------------------------------------------------------------------
 * INITIALIZE
 * ------------------------------------------------------------------------
 * Once the base Webpage is loaded, Boot up the System
 * ----------------------------------------------------------------------*/
function init(){
  debugLog(`Booting for ${CFG.userName}...`);
  
  let system = new System();
  setTimeout(()=> {
    system.start();
    setIsMobile();
  },1000);
}

import { debugLog } from "../utils/log-utils";

/**------------------------------------------------------------------------
 * CONTROLLER CLASS
 * ------------------------------------------------------------------------
 * A Virtual Controller, which handles all inputs from all sources
 * ----------------------------------------------------------------------*/
class Controller{
  constructor(setKeyState){
    debugLog("  - Plugged In Controller...");
    this.setKeyState = (key,value) => { setKeyState(key, value) }
    this.setupMobileController();
    this.connectEventListener();
  }

  setupMobileController = () => {
    let mobileControllerElem = document.querySelector(".mobile-controls");
    if(document.body.dataset.view === 'mobile'){
      let windowHeight = window.innerHeight;
      let screenHeight = document.getElementById("game-screen").offsetHeight;
      mobileControllerElem.style.height = `${windowHeight - screenHeight}px`;
    }
    document.getElementById('action').addEventListener('touchstart', e => { this.setKeyState('ArrowRight',true) })
    document.getElementById('action').addEventListener('touchend', e => { this.setKeyState('ArrowRight',false) })
    document.getElementById('cancel').addEventListener('touchstart', e => { this.setKeyState('ArrowDown',true) })
    document.getElementById('cancel').addEventListener('touchend', e => { this.setKeyState('ArrowDown',false) })

    document.getElementById('dpad-up').addEventListener('touchstart',e => { this.setKeyState('w',true)})
    document.getElementById('dpad-up').addEventListener('touchend',e => { this.setKeyState('w',false)})
    document.getElementById('dpad-right').addEventListener('touchstart',e => { this.setKeyState('d',true)})
    document.getElementById('dpad-right').addEventListener('touchend',e => { this.setKeyState('d',false)})
    document.getElementById('dpad-down').addEventListener('touchstart',e => { this.setKeyState('s',true)})
    document.getElementById('dpad-down').addEventListener('touchend',e => { this.setKeyState('s',false)})
    document.getElementById('dpad-left').addEventListener('touchstart',e => { this.setKeyState('a',true)})
    document.getElementById('dpad-left').addEventListener('touchend',e => { this.setKeyState('a',false)})

    document.getElementById('start').addEventListener('touchstart', e => { this.setKeyState('Shift',true) })
    document.getElementById('start').addEventListener('touchend', e => { this.setKeyState('Shift',false) })
  }

  /**------------------------------------------------------------------------
   * CONNECT EVENT LISTENER
   * ------------------------------------------------------------------------
   * Sets up the Key Listeners on the Window
   * TODO - Set this up to track config values to send specific
   *        actions to the System, rather than the direct key
   * TODO - Setup Touch Events with 'touchstart' and 'touchend'
   * ----------------------------------------------------------------------*/
  connectEventListener = () => {
    window.addEventListener("keydown", e => {
      this.setKeyState(e.key,true);
    });
    window.addEventListener("keyup", e => {
      this.setKeyState(e.key,false);
    })
  }
}

export default Controller;

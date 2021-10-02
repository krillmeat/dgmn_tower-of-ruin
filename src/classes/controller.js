import { debugLog } from "../utils/log-utils";

/**------------------------------------------------------------------------
 * CONTROLLER CLASS
 * ------------------------------------------------------------------------
 * A Virtual Controller, which handles all inputs from all sources
 * ----------------------------------------------------------------------*/
class Controller{
  constructor(setKeyState){
    debugLog("Plugged In Controller...");
    this.setKeyState = (key,value) => { setKeyState(key, value) }
    this.connectEventListener();
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
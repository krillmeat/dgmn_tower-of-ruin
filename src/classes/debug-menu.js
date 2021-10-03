import { debugLog } from '../utils/log-utils';

class DebugMenu {
  constructor(){
    debugLog('Booting Debug Menu...');

    this.elem = document.getElementById("debug-menu");
    this.state = 'active';  // Is the debug menu supposed to be visible or not [active | inactive]

    this.activate();
  }

  activate(){
    this.elem.classList.add('active');
  }
}

export default DebugMenu;
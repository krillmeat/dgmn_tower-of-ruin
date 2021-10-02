import { debugLog } from '../utils/log-utils';

class DebugMenu {
  constructor(){
    debugLog('Booting Debug Menu...');

    this.state = 'active';  // Is the debug menu supposed to be visible or not [active | inactive]
  }
}

export default DebugMenu;
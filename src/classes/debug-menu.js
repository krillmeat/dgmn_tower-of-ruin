import { debugLog } from '../utils/log-utils';

class DebugMenu {
  constructor(launchBattleCallback){
    debugLog('Booting Debug Menu...');

    this.elem = document.getElementById("debug-menu");
    this.state = 'active';  // Is the debug menu supposed to be visible or not [active | inactive]

    this.activate();

    this.launchBattle = () => {
      launchBattleCallback();
    }
  }

  activate = () => {
    this.elem.classList.add('active');
    this.elem.querySelector("button.battle-launch").addEventListener('click',() => {
      this.launchBattle();
    });
  }
}

export default DebugMenu;
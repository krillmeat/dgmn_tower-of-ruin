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

    this.launchDungeon = () => {
      // launchDungeonCallback();
    }
  }

  activate = () => {
    this.elem.classList.add('active');
    this.elem.querySelector("button.battle-launch").addEventListener('click',() => {
      this.launchBattle();
    });

    this.elem.querySelector("button.dungeon-launch").addEventListener('click',()=>{
      this.launchDungeon();
    })

    this.elem.querySelector("button.mobile-switch").addEventListener('click',()=>{
      let newValue = document.body.dataset.view === 'mobile' ? 'dotcom' : 'mobile';
      document.body.dataset.view = newValue;
      if(newValue === 'mobile'){
        let mobileControllerElem = document.querySelector(".mobile-controls");
        if(document.body.dataset.view === 'mobile'){
          let windowHeight = window.innerHeight;
          let screenHeight = document.getElementById("game-screen").offsetHeight;
          mobileControllerElem.style.height = `${windowHeight - screenHeight}px`;
        }
      }
    })
  }
}

export default DebugMenu;
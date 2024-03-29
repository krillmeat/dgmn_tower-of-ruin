import Dungeon from '../dungeon/dungeon';
import { debugLog } from '../utils/log-utils';
import { DEBUG_DGMN, DEBUG_YOUR_TEAM } from '../debug/dgmn.mock';

// TODO - This whole thing is a mess...

class DebugMenu {
  constructor(game){
    debugLog('  - Booting Debug Menu...');

    this.elem = document.getElementById("debug-menu");
    this.state = 'active';  // Is the debug menu supposed to be visible or not [active | inactive]
    this.game = game;

    this.activate();

    this.launchBattle = () => {
      
      // Mock DGMN
      for(let i = 0; i < 3; i++){ 
        this.game.yourDgmn.allDgmn['dId'+i].hatchSetup();
        // this.game.yourDgmn.allDgmn['dId'+i].hatch(DEBUG_YOUR_TEAM[i].speciesName);

        this.game.yourDgmn.allDgmn['dId'+i].speciesName = DEBUG_YOUR_TEAM[i].speciesName;
        this.game.yourDgmn.allDgmn['dId'+i].currentStats = DEBUG_YOUR_TEAM[i].currentStats;
        this.game.yourDgmn.allDgmn['dId'+i].currentHP = DEBUG_YOUR_TEAM[i].currentStats.HP;
      }

      // Build Mock Dungeon
      this.game.dungeon = {
        floor: {
          isBossFloor: false,
          number: 1
        }
      }
      this.game.digiBeetle = {
        digiBeetleAH: {
          getToolBoxItems: () => { return ['smallMeat'] },
          removeItemFromToolBox: () => {}
        }
      }
      this.game.atTitle = false;
      this.game.startBattle(true);
    }

    this.launchDungeon = () => {
      this.game.buildDungeon()
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
          mobileControllerElem.style.top = `${screenHeight+80}px`;
        }
      }
    })
  }
}

export default DebugMenu;

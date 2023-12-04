import CFG from "../../config";
import { FIELD_LABELS } from "../../data/fields.db";
import MapUtility from "../../dungeon/utils/map.util";
import { debugLog } from "../../utils/log-utils";
import { getAutoAdvanceDelay } from "../../utils/text.util";
import TextArea from "../text-area";
import ListMenu from "./list-menu";
import MenuCanvas from "./menu-canvas";
import { FP_LIST } from "../../constants/FP.const";

// Shown in the Bottom Info Bar when hovering on option
const REWARD_MESSAGES = [
  "Permanently upgrade FP",
  "Permanently upgrade XP",
  "Permanently upgrade EN",
  // TODO - Reduce Level/Cost penalty
];

export const REWARD_SELECTED_MESSAGES = [
  "Select an FP to upgrade.",
  "XP Permanently upgraded!",
  "EN Permanently upgraded!"
]

  /** -------------------------------------------------------------------------------------------
   * BOSS VICTORY MENU
   * --------------------------------------------------------------------------------------------
   * Menu for the Boss Rewards Screen
   * @param {number} currFloor  Dungeon's Current Floor
   * ------------------------------------------------------------------------------------------*/
  class BossVictoryMenu extends ListMenu{
  constructor(currFloor,...args){
    super(...args);
    this.currFloor = currFloor; // Current floor of the Dungeon
    this.dgmnIndex = 0;         // Currently-viewed DGMN
    this.currUpgradeIndex = 0;  // Which Upgrade is selected

    this.mapUtility = new MapUtility();
    this.menuCanvas = new MenuCanvas(`${this.label}-menu`,160,144);

    // FP Menu
    this.inFPSelection = false;
    this.FPIndex = 0;
    this.FPText = [
      new TextArea(10,3,2,1),
      new TextArea(10,4,2,1),
      new TextArea(10,5,2,1),
      new TextArea(10,6,2,1),
      new TextArea(10,7,2,1),
      new TextArea(10,8,2,1),
      new TextArea(10,9,2,1),
      new TextArea(10,10,2,1)
    ];

    this.infoTxt = new TextArea(4,14,16,4);
    this.learnedAttackTxt = new TextArea(1,12,18,1);

    // Callbacks
    this.fetchImageCB;
    this.redrawParentCB;
    this.onDone;

    this.init();
  }

  /** -------------------------------------------------------------------------------------------
   * INITIALIZE
   * --------------------------------------------------------------------------------------------
   * Sets up the Menu's initial state
   * ------------------------------------------------------------------------------------------*/
  init = () => {
    this.infoTxt.instantText(this.menuCanvas.ctx,REWARD_MESSAGES[0])
  }

  /** -------------------------------------------------------------------------------------------
   * CLEAR INFO TEXT
   * --------------------------------------------------------------------------------------------
   * Clears the Bottom Info Bar area
   * ---------------------------------------------------------------*/ /* istanbul ignore next */
  clearInfoTxt = () => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(4*CFG.tileSize,14*CFG.tileSize,16*CFG.tileSize,4*CFG.tileSize);
  }

  /** -------------------------------------------------------------------------------------------
   * DRAW LIST                                                                        [OVERRIDE]
   * --------------------------------------------------------------------------------------------
   * Draws the "List" of Icons for the Reward Grid
   * ------------------------------------------------------------------------------------------*/
  drawList = () => { 
    for(let i = 0; i < this.listItems.length; i++){
      for(let r = 0; r < 8; r++){
        let image = 'rewardIconDeselected';
        if(r > this.mapUtility.getBossRewardLevel(this.currFloor)) image = 'rewardIconNull';
        this.drawIcon(i,r,image);
      }
    }

    this.drawIcon(this.currIndex,this.currUpgradeIndex,'rewardIconSelected');
  }

  /** -------------------------------------------------------------------------------------------
   * DRAW MENU                                                                         [OVERRIDE]
   * --------------------------------------------------------------------------------------------
   * Draws the Menu to the screen
   * ------------------------------------------------------------------------------------------*/
  drawMenu = () => { 
    this.drawList();
    if(this.inFPSelection){ this.drawFPMenu() }

    this.redrawParentCB();
  }

  /** ------------------------------------------------------------------------------------------
   * DRAW FP MENU                                                    
   * --------------------------------------------------------------------------------------------
   * Draws the Popup Menu for FP
   * ---------------------------------------------------------------*/ /* istanbul ignore next */
  drawFPMenu = () => {
    this.menuCanvas.paintImage(this.fetchImageCB('bossRewardFieldChoice'),0,0);
    this.menuCanvas.paintImage(this.fetchImageCB('miniCursor'),7*CFG.tileSize,((this.FPIndex)+3)*CFG.tileSize);
    for(let i in this.FPText){
      this.FPText[i].instantText(this.menuCanvas.ctx,FIELD_LABELS[i],'white');
    }
  }

  /** -------------------------------------------------------------------------------------------
   * DRAW ICON
   * --------------------------------------------------------------------------------------------
   * Draws a small, rectangular icon used to show the Upgrade and its unlocked levels
   * @param {number} row   Y position
   * @param {number} col   X position
   * @param {string} image Name of the Image used for the Icon
   * ---------------------------------------------------------------*/ /* istanbul ignore next */
  drawIcon = (row,col,image) => {
    this.menuCanvas.paintImage(this.fetchImageCB(image),(col+11)*CFG.tileSize,((2*row)+2)*CFG.tileSize);
  }


  /** -------------------------------------------------------------------------------------------
   * DRAW LEARNED ATTACK MESSAGE
   * --------------------------------------------------------------------------------------------
   * When a DGMN has learned a new Attack, it should say that it has
   * @param {string} attackName Name of the learned Attack
   * ------------------------------------------------------------------------------------------*/
  drawLearnedAttack = attackName => {
    this.learnedAttackTxt.instantText(this.menuCanvas.ctx, `+ ${attackName}`);
  }

  /** -------------------------------------------------------------------------------------------
   * LAUNCH FP SELECTION
   * --------------------------------------------------------------------------------------------
   * Sets the FP Menu to open so the Menu draws the Popup Menu
   * ------------------------------------------------------------------------------------------*/
  launchFPSelection = () => {
    this.inFPSelection = true;
    this.drawMenu();
  }

  /** -------------------------------------------------------------------------------------------
   * PREVIOUS CHOICE
   * --------------------------------------------------------------------------------------------
   * Handles the action for Up on the D-Pad. Used for both the main Menu, as well as the FP Menu
   * ------------------------------------------------------------------------------------------*/
  prevChoice = () => {
    if(!this.inFPSelection){ // Main Menu
      if(this.currIndex > 0){
        this.currIndex--;
        this.clearInfoTxt();
        this.infoTxt.instantText(this.menuCanvas.ctx,REWARD_MESSAGES[this.currIndex]);
      }
    } else{ // FP Menu
      if(this.FPIndex > 0) this.FPIndex--;
      // TODO - Do I want to say which is Selected and slightly change the Reward Message?
    }

    this.drawMenu();
  }

  /** -------------------------------------------------------------------------------------------
   * NEXT CHOICE
   * --------------------------------------------------------------------------------------------
   * Handles the action for Down on the D-Pad. Used for both the main Menu, as well as the FP Menu
   * ------------------------------------------------------------------------------------------*/
  nextChoice = () => {
    if(!this.inFPSelection){ // Main Menu
      if(this.currIndex < this.listItems.length - 1){
        this.currIndex++;
        this.clearInfoTxt();
        this.infoTxt.instantText(this.menuCanvas.ctx,REWARD_MESSAGES[this.currIndex]);
      }
    } else{ // FP Menu
      if(this.FPIndex < 7) this.FPIndex++;
      // TODO - Do I want to say which is Selected and slightly change the Reward Message?
    }

    this.drawMenu();
  }

  
  /** -------------------------------------------------------------------------------------------
   * SELECT CHOICE
   * --------------------------------------------------------------------------------------------
   * Handles the action for the A Button. Used for both the main Menu, as well as the FP Menu
   * @param {function}  onDone  Callback for when the message is done writing
   * ------------------------------------------------------------------------------------------*/
  selectChoice = onDone => {
    debugLog("Selecting Upgrade: ",this.currIndex);
    let message = REWARD_SELECTED_MESSAGES[this.currIndex];
    if(!this.inFPSelection){ // Main Menu
      if(this.currIndex === 0){
        this.launchFPSelection(); 
        return;
      }
    } else { // FP Menu
      message = `Permanently gained 1 ${FP_LIST[this.FPIndex]} FP!`
    }

    this.clearInfoTxt();
    this.infoTxt.timedText(this.menuCanvas.ctx,message,this.drawMenu);

    setTimeout(()=>{ onDone() },getAutoAdvanceDelay(message,2000));
  }

  /** -------------------------------------------------------------------------------------------
   * DRAW DGMN PORTRAIT
   * --------------------------------------------------------------------------------------------
   * Draws the Portrait of the Currently Shown DGMN
   * TODO - Why is this in here?
   * @param {Image} portraitImg Fetched Image of the DGMN's Portrait
   * ---------------------------------------------------------------*/ /* istanbul ignore next */
  drawDgmnPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * CFG.screenSize,32*CFG.screenSize,(32-1)*CFG.screenSize);
}
}

export default BossVictoryMenu;

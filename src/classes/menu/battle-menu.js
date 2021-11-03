import config from "../../config";
import GameCanvas from "../canvas";
import TextManager from "../text-manager";
import DgmnBattleStatus from "./dgmn-battle-status";
import DgmnPortrait from "./dgmn-portrait";
import DgmnAttackMenu from "./dgmn-attack-menu";
import { debugLog } from "../../utils/log-utils";
import { attacksDB } from "../../data/attacks.db";

class BattleMenu{
  constructor(dgmnData, gameScreenRedrawCallback, loadImageCallback, fetchImageCallback){ // TODO - I do not want (if I can help it) ANY dgmnData in this file
    this.dgmnData = dgmnData;
    this.currentState = 'dgmn'; // none | beetle | dgmn | attack | item
    this.currentDgmnActor = 0;
    this.selectedAttack;

    this.topTextManager = new TextManager([fetchImageCallback('fontsWhite')],1,20, 0,1 ); // TODO - I'm not worried about the font loading slower than anything else, but just in case, I should change this a little...
    this.bottomTextManager = new TextManager([fetchImageCallback('fontsWhite')],4,16, 4,14 );
    this.dgmnNameTextManager = new TextManager([fetchImageCallback('fontsWhite')],1,10, 4,14) ;
    this.dgmnSpeciesTextManager = new TextManager([fetchImageCallback('fontsLightGreen')],1,16, 4,15 );
    this.currDgmnHP = new TextManager([fetchImageCallback('fontsWhite'),fetchImageCallback('fontsLightGreen')],1,6, 4,16, char => {
      if(char === 'hp'){ return 1;
      } return 0; });
    this.currDgmnEN = new TextManager([fetchImageCallback('fontsWhite'),fetchImageCallback('fontsLightGreen')],1,6, 4,17, char => {
      if(char === 'en'){ return 1;
      } return 0; });

    this.dgmnStatusList = [];

    this.menus = {};

    this.menuImages = ['./sprites/Battle/Menu/dgmn-bar-white.png','./sprites/Battle/Menu/dgmn-bar-light-green.png','./sprites/Battle/Menu/attack-select-popup-base.png'];

    this.menuCanvas = new GameCanvas('battle-menu-canvas',160,144,0,0,false);
    this.menuCanvas.loadImageStack(this.menuImages);

    // this.dgmnPortraits = new DgmnPortrait(this.dgmnData,'sm'); // TODO - Find a way to load this in post, without the constructor needing any dgmnData

    this.dgmnAttackMenu = new DgmnAttackMenu( imageName => { return fetchImageCallback(imageName) } );

    this.buildStatusList();
    this.triggerGameScreenRedraw = () => { gameScreenRedrawCallback() }
    this.fetchImage = imageName => { return fetchImageCallback(imageName) }
  }

  /**------------------------------------------------------------------------
   * BUILD STATUS LIST
   * ------------------------------------------------------------------------
   * Creates the List of Status Elements (HP/EN/Spec Conditions).
   * TODO - This should be in the Battle Element
   * ----------------------------------------------------------------------*/
  buildStatusList = () => {
    for(let i = 0; i < this.dgmnData.length; i++){
      this.dgmnStatusList.push(new DgmnBattleStatus(i,this.dgmnData[i]));
    }
  }

  getStatusIndex = dgmnId => {
    let index = -1;
    for(let i = 0; i < this.dgmnStatusList.length; i++){
      if(this.dgmnStatusList[i].dgmnData.dgmnId === dgmnId){
        index = i;
      }
    }
    return index;
  }

  /**------------------------------------------------------------------------
   * SET TOP TEXT
   * ------------------------------------------------------------------------
   * Sets the small info text at the top of the screen.
   * Should mostly be used for labels, and not for blocks of text
   * ------------------------------------------------------------------------
   * @param {String}  message Text to display in the top bar
   * ----------------------------------------------------------------------*/
  setTopText = message => {
    this.topTextManager.instantPaint(this.menuCanvas,message);
  }

  /**------------------------------------------------------------------------
   * BUILD BATTLE MENUS
   * ------------------------------------------------------------------------
   * Creates the Large collection of Objects that handles all of the logic
   *   for the Battle Menu
   * ----------------------------------------------------------------------*/
  buildBattleMenus = () => {
    this.menus.beetle = [];
    this.menus.dgmn = {
      currentIndex: 0,
      totalIcons: 3,
      icons: [ 
        { label: 'Attack', activeImg: this.fetchImage('attackSelected'), inactiveImg: this.fetchImage('attackDeselected') },
        { label: 'Defend', activeImg: this.fetchImage('defendSelected'), inactiveImg: this.fetchImage('defendDeselected') },
        { label: 'Stats', activeImg: this.fetchImage('statsSelected'), inactiveImg: this.fetchImage('statsDeselected') }
      ]
    };
    this.menus.attack = {
      currentIndex: 0,
      currentPage: 0,
      currentPageMax: 0
    }
    this.menus.targetSelect = {
      currentIndex: 0
    }
  }

  /**------------------------------------------------------------------------
   * FULL MENU PAINT
   * ------------------------------------------------------------------------
   * Used on itial Paint
   * Draws the icons, labels, and dgmn data for the first Dgmn
   * ----------------------------------------------------------------------*/
  fullMenuPaint = () => {
    this.paintMenu(0);

    this.paintInitialIcons('dgmn'); // TODO - This should be set to Beetle, not DGMN

    this.updateAllStatusBars();
    this.drawAllComboLabels();
    
    // Text Management
    this.topTextManager.instantPaint(this.menuCanvas,'Attack');
  }

  /**------------------------------------------------------------------------
   * PAINT INITIAL ICONS
   * ------------------------------------------------------------------------
   * Paints the initial icons for a specific phase
   * ------------------------------------------------------------------------
   * @param {String}  phase Which Phase of icons to show 
   * ----------------------------------------------------------------------*/
  paintInitialIcons = phase => {
    this.menuCanvas.paintImage(this.menus[phase].icons[0].activeImg,(112 * config.screenSize),(128 * config.screenSize));
    this.menuCanvas.paintImage(this.menus[phase].icons[1].inactiveImg,(128 * config.screenSize),(128 * config.screenSize));
    this.menuCanvas.paintImage(this.menus[phase].icons[2].inactiveImg,(144 * config.screenSize),(128 * config.screenSize));

    this.triggerGameScreenRedraw();
  }

  /**------------------------------------------------------------------------
   * SETUP DGMN
   * ------------------------------------------------------------------------
   * Sets up the Menu for the Dgmn at a specific Index
   * ------------------------------------------------------------------------
   * @param {Number}  index Spot of the currently selecting Dgmn
   * ----------------------------------------------------------------------*/
  setupDgmn = index => {
    this.menuCanvas.ctx.clearRect( 10 * (8 * config.screenSize), 2 * (8 * config.screenSize), 4 * (8 * config.screenSize), 12 * (8 * config.screenSize));
    this.paintMenu(index);
  }

  /**------------------------------------------------------------------------
   * PAINT MENU
   * ------------------------------------------------------------------------
   * Paints the Menu for a specific Dgmn
   * ------------------------------------------------------------------------
   * @param {Number} index Spot of the currently selecting Dgmn
   * ----------------------------------------------------------------------*/
  paintMenu = index => {
    // TODO - All temporary, the inital screen should be based on Beetle Action, not DGMN action
    this.menuCanvas.paintImage(this.fetchImage('cursor'),80 * config.screenSize,( ( 2 + (4 * (index) ) ) * (8 * config.screenSize) ) + (8 * config.screenSize)); // Battle Cursor

    this.paintBottomData(this.dgmnData[index]);
  }

  /**------------------------------------------------------------------------
   * CLEAR BOTTOM DATA
   * ------------------------------------------------------------------------
   * Gets rid of the data at the bottom of the Battle Screen.
   * ----------------------------------------------------------------------*/
  clearBottomData = clearIcons => {
    if(clearIcons){
      this.menuCanvas.ctx.clearRect( 0 * (8 * config.screenSize), 14 * (8 * config.screenSize), 20 * (8 * config.screenSize), 4 * (8 * config.screenSize) );
    } else{
      this.menuCanvas.ctx.clearRect( 0 * (8 * config.screenSize), 14 * (8 * config.screenSize), 20 * (8 * config.screenSize), 2 * (8 * config.screenSize) );
      this.menuCanvas.ctx.clearRect( 0 * (8 * config.screenSize), 16 * (8 * config.screenSize), 14 * (8 * config.screenSize), 2 * (8 * config.screenSize) );
    }
  }

  /**------------------------------------------------------------------------
   * PAINT BOTTOM DATA
   * ------------------------------------------------------------------------
   * Draws the info in the bottom section of the Battle Screen.
   * ------------------------------------------------------------------------
   * @param {Dgmn}  dgmn  Dgmn who's data needs to be painted 
   * ----------------------------------------------------------------------*/
  paintBottomData = dgmn => {
    this.clearBottomData();
    this.dgmnNameTextManager.instantPaint(this.menuCanvas,dgmn.nickname);
    this.dgmnSpeciesTextManager.instantPaint(this.menuCanvas,`${dgmn.name}.MON`);
    this.currDgmnHP.instantPaint(this.menuCanvas, `.hp${dgmn.currHP}`);
    this.currDgmnEN.instantPaint(this.menuCanvas, `.en${dgmn.currEN}`);

    this.setDgmnPortrait(dgmn.name);

    this.triggerGameScreenRedraw();
  }

  /**------------------------------------------------------------------------
   * CLEAR ICON
   * ------------------------------------------------------------------------
   * Clears the Image of the icon at the proper index.
   * Used when changing selection
   * ------------------------------------------------------------------------
   * @param {Number} index  Which Icon to clear
   * ----------------------------------------------------------------------*/
  clearIcon = index => {
    this.menuCanvas.ctx.clearRect( ( 112 + (16 * index) ) * config.screenSize,
                                   128 * config.screenSize,
                                   16 * config.screenSize,
                                   16 * config.screenSize);
  }

  /**------------------------------------------------------------------------
   * SET DGMN PORTRAIT
   * ------------------------------------------------------------------------
   * Draws the Portrait of the Dgmn that is currently taking an action
   * ------------------------------------------------------------------------
   * @param {String} species Dgmn species name
   * ----------------------------------------------------------------------*/
  setDgmnPortrait = species => {
    // TODO - Clear Portrait
    this.menuCanvas.ctx.drawImage(this.fetchImage(`${species.toLowerCase()}Portrait`),
                               0,0, 32 * 8, (32 - 1) * 8, 
                               0 * 8 * config.screenSize, 14 * 8 * config.screenSize, 32 * config.screenSize, (32 - 1) * config.screenSize);
  }

  /**------------------------------------------------------------------------
   * UPDATE ALL STATUS BARS
   * ------------------------------------------------------------------------
   * Loop through all Status Bars and update All of them
   * ----------------------------------------------------------------------*/
  updateAllStatusBars = () => {
    for(let i = 0; i < this.dgmnStatusList.length; i++){
      this.updateStatusBar(this.dgmnStatusList[i],this.dgmnData[this.dgmnStatusList[i].listIndex].currHP,this.dgmnData[this.dgmnStatusList[i].listIndex].currStats[0], 'hp');
      this.updateStatusBar(this.dgmnStatusList[i],this.dgmnData[this.dgmnStatusList[i].listIndex].currEN,100, 'en');
    }
  }

  drawAllComboLabels = () => {
    let tileMod = 8 * config.screenSize;
    for(let i = 0; i < this.dgmnStatusList.length; i++){
      let battleLocationOffset = (this.dgmnStatusList[i].dgmnData.battleLocation * 4) * tileMod;
      let leftOffset = this.dgmnStatusList[i].dgmnData.isEnemy ? 0 : 16 * tileMod;
      this.menuCanvas.paintImage(this.fetchImage('comboLabel'), leftOffset, (4 * tileMod) + battleLocationOffset); 
    }
  }

  /**------------------------------------------------------------------------
   * UPDATE STATUS BAR
   * ------------------------------------------------------------------------
   * Updates either the HP or EN bar
   * ------------------------------------------------------------------------
   * @param {Object} status The DgmnBattleStatus instance
   * @param {Number} curr The current HP/EN of the Dgmn
   * @param {Number} max  The Max HP/EN of the Dgmn
   * @param {String} bar  Which bar to update : hp | en
   * ----------------------------------------------------------------------*/
  updateStatusBar = (status, curr, max, bar) => {
    let calcValue = Math.floor( (curr / max) * 18 );
    let barColor = calcValue >= 9 ? 'White' : 'LightGreen';
        barColor = curr <= 0 ? 'DarkGreen' : barColor;
    status.drawMeter(this.menuCanvas,bar,this.fetchImage(`dgmnBar${barColor}`),calcValue, barColor);
    this.triggerGameScreenRedraw();
  }

  /**------------------------------------------------------------------------
   * LAUNCH ATTACK MENU
   * ------------------------------------------------------------------------
   * Launches the Attack Menu for the Dgmn after selecting the Attack option
   * ------------------------------------------------------------------------
   * @param {Array} attackList Attacks for the Dgmn launching the Menu
   * ----------------------------------------------------------------------*/
  launchDgmnAttackMenu = attackList => {
    debugLog("Attacking")
    debugLog("-- Selecting attack...")
    this.currentState = 'attack';
    this.topTextManager.instantPaint(this.menuCanvas, 'Select Attack');
    this.menuCanvas.paintImage(this.fetchImage('battleOptionSelectBaseRight'),0,0);
    this.menuCanvas.paintImage(this.fetchImage('miniCursor'), 4 * (8 * config.screenSize),  2 * (8 * config.screenSize));

    // Build initial page
    this.dgmnAttackMenu.currentChoice = 0;
    this.dgmnAttackMenu.loadAttackList(this.dgmnData[this.currentDgmnActor].permAttacks);
    this.dgmnAttackMenu.refreshList(this.menuCanvas,0);

    this.triggerGameScreenRedraw();
  }

  /**------------------------------------------------------------------------
   * CLOSE DGMN ATTACK MENU
   * ------------------------------------------------------------------------
   * Clears away the Attack Menu
   * Can be caused by Selecting an Attack OR hitting Cancel
   * ----------------------------------------------------------------------*/
  closeDgmnAttackMenu = () => {
    this.topTextManager.instantPaint(this.menuCanvas, 'Attack');
    this.menuCanvas.ctx.clearRect( 4 * (8 * config.screenSize), 
                                   2 * (8 * config.screenSize), 
                                   16 * (8 * config.screenSize), 
                                   12 * (8 * config.screenSize) );
    // Redraw the Status Sections
    for(let i = 0; i < this.dgmnStatusList.length; i++){
      this.updateStatusBar(this.dgmnStatusList[i],this.dgmnData[this.dgmnStatusList[i].listIndex].currHP,this.dgmnData[this.dgmnStatusList[i].listIndex].currStats[0], 'hp');
      this.updateStatusBar(this.dgmnStatusList[i],this.dgmnData[this.dgmnStatusList[i].listIndex].currEN,100, 'en');
      this.dgmnStatusList[i].setCombo(this.menuCanvas,this.dgmnStatusList[i].dgmnData.comboLetter,this.fetchImage('fontsWhite'));
    }
    this.drawAllComboLabels();
    this.triggerGameScreenRedraw();
  }

  /**------------------------------------------------------------------------
   * LAUNCH SELECT TARGET
   * ------------------------------------------------------------------------
   * After selecting an Attack, show Target selection
   * ----------------------------------------------------------------------*/
  launchSelectTarget = () => {
    debugLog("-- Selecting target...");
    this.currentState = 'targetSelect';
    this.closeDgmnAttackMenu();
    let attackData = attacksDB[this.dgmnAttackMenu.attackList[this.dgmnAttackMenu.currentChoice].attackName];
    if(attackData.targets === 'single'){
      this.menuCanvas.paintImage(this.fetchImage('cursorLeft'),8 * (8 * config.screenSize),(16 * config.screenSize) + (8 * config.screenSize));
    }else{
      console.log("MULTI TARGET");
    }

    this.triggerGameScreenRedraw();
  }

  /**------------------------------------------------------------------------
   * SET CURRENT ICON
   * ------------------------------------------------------------------------
   * Sets the currently selected Battle Menu Icon.
   * Used only for main, bottom options (not inner menus)
   * ------------------------------------------------------------------------
   * @param {Number} index Which Icon to Select
   * ----------------------------------------------------------------------*/
  setCurrentIcon = index => {
    let prevIndex = this.menus[this.currentState].currentIndex;
    this.menus[this.currentState].currentIndex = index;
    this.clearIcon(prevIndex);
    this.clearIcon(index);
    this.menuCanvas.paintImage(this.menus[this.currentState].icons[prevIndex].inactiveImg, (( 112 + (16 * prevIndex) ) * config.screenSize), (128 * config.screenSize));
    this.menuCanvas.paintImage(this.menus[this.currentState].icons[index].activeImg, (( 112 + (16 * index) ) * config.screenSize), (128 * config.screenSize));

    this.topTextManager.clearTextBox(this.menuCanvas);
    this.topTextManager.instantPaint(this.menuCanvas,this.menus[this.currentState].icons[index].label);

    this.triggerGameScreenRedraw();
  }
}

export default BattleMenu;
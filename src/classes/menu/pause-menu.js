import CFG from "../../config";
import { debugLog, warningLog } from "../../utils/log-utils";
import PauseMenuAH from "../action-handlers/pause-menu.ah";
import TreasureUtility from "../../dungeon/utils/treasure.util";
import Menu from "../menu";
import TextArea from "../text-area";
import IconMenu from "./icon-menu";
import ItemsMenu from "./items-menu";
import ListMenu from "./list-menu";
import MenuCanvas from "./menu-canvas";

// TODO - This is called Pause and Main Menu, need to shift to Pause Menu exclusively (as the boot menu is the "main menu")

class PauseMenu extends Menu{
  constructor(party,dgmnAH,digiBeetleAH,...args){
    super(...args);

    this.currState = 'main';
    this.dgmnAH = dgmnAH;
    this.digiBeetleAH = digiBeetleAH;
    this.treasureUtility = new TreasureUtility();
    this.party = party;
    this.dgmnData;
    this.floorRedraw;

    this.pauseMenuAH = new PauseMenuAH({
      getStateCB: this.getState,
      nextIconCB: this.nextIcon,
      prevIconCB: this.prevIcon,
      selectIconCB: this.selectIcon,
      upListItemCB: this.upListItem,
      rightListItemCB: this.rightListItem,
      downListItemCB: this.downListItem,
      leftListItemCB: this.leftListItem,
      selectListItemCB: this.selectListItem,
      backMenuCB: this.backMenu
    });
    this.menuCanvas = new MenuCanvas('main-menu',160,144); 

    this.topTxt = new TextArea(0,0,20,1);
    this.itemDescriptionTxt = new TextArea(0,14,20,4);
  }

  launchMenu = () => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage('dungeonPauseOverlay'),0,0)
    this.addSubMenu('main',new IconMenu([16,16],['items','beetle'],'pause-main'));
    this.currSubMenu = 'main';
    this.subMenus.main.isVisible = true;
    this.subMenus.main.images = this.buildIconImages( this.subMenus.main.iconList );
    this.subMenus.main.drawIcons(0);
    this.drawMenu();
  }

  closeMenu = () => {
    this.removeSubMenu('main');
    this.currSubMenu = '';
    this.menuCanvas.clearCanvas();
    this.digiBeetleAH.showCanvas();
  }

    /**------------------------------------------------------------------------
   * NEXT ICON
   * ------------------------------------------------------------------------
   * Moves to the Next Icon of whichever Icon Menu is currently active
   * ----------------------------------------------------------------------*/
     nextIcon = () => {
      this.subMenus[this.currSubMenu].nextIcon();
      let message = this.subMenus[this.currSubMenu].getCurrLabel();
      // this.menuCanvas.setTopMessage(message.charAt(0).toUpperCase()+message.slice(1))
      this.drawMenu();
    }
  
    /**------------------------------------------------------------------------
     * PREVIOUS ICON
     * ------------------------------------------------------------------------
     * Moves to the Previous Icon of whichever Icon Menu is currently active
     * ----------------------------------------------------------------------*/
    prevIcon = () => {
      this.subMenus[this.currSubMenu].prevIcon();
      let message = this.subMenus[this.currSubMenu].getCurrLabel();
      // this.menuCanvas.setTopMessage(message.charAt(0).toUpperCase()+message.slice(1))
      this.drawMenu();
    }

  /**------------------------------------------------------------------------
   * SELECT ICON
   * ------------------------------------------------------------------------
   * Takes action on the current Icon
   * ----------------------------------------------------------------------*/
   selectIcon = () => {
    let selected = this.subMenus[this.currSubMenu].getCurrLabel();
    this.subMenus[this.currSubMenu].selectIcon();
    if(selected === 'items'){
      this.launchItemMenu();
    } else if(selected === 'beetle'){
      warningLog('DigiBeetle Menu is not ready yet...')
    }
  }

  /**------------------------------------------------------------------------
   * LAUNCH ITEM MENU
   * ------------------------------------------------------------------------
   * Gets the Item Menu Ready to be used
   * ----------------------------------------------------------------------*/
  launchItemMenu = () => {
    debugLog('Launch Item Menu');
    this.removeSubMenu('main');
    this.digiBeetleAH.hideCanvas();
    this.menuCanvas.paintImage(this.systemAH.fetchImage('basicMenu'),0,0);
    this.addSubMenu('items',new ItemsMenu(this.drawTopText,this.drawBottomSection,this.digiBeetleAH.getToolBoxType(),[0,1],12,20,1,this.digiBeetleAH.getToolBoxItems(),this.systemAH.fetchImage('miniCursor'),null,'item'));
    this.currState = 'items';
    this.subMenus.items.isVisible = true;
    this.refreshItemMenu();
  }

  refreshItemMenu = () => {
    this.drawTopText('Select an Item');
    this.subMenus.items.currIndex = 0;
    this.subMenus.items.drawMenu();
    this.drawMenu();
  }

  closeItemMenu = () => {
    this.removeSubMenu('items');
    this.currState = 'main';
    this.menuCanvas.clearCanvas();
    this.floorRedraw();
    this.digiBeetleAH.showCanvas();
    this.launchMenu();
  }

  /**------------------------------------------------------------------------
   * LAUNCH ITEM TARGET SELECT
   * ------------------------------------------------------------------------
   * Sets up and opens the Menu that handles selecting a DGMN from your team
   * ----------------------------------------------------------------------*/
  launchItemTargetSelect = () => {
    this.dgmnData = this.buildDgmnData();
    this.currState = 'items-target';
    this.drawTopText('Select a Target');
    this.addSubMenu('itemTarget',new ListMenu([5,5],3,10,1,[this.dgmnData[0].nickname,'SPROUT','GEAR'],this.systemAH.fetchImage('miniCursor'),null,'item-target'));
    this.subMenus.itemTarget.isVisible = true;
    this.subMenus.itemTarget.drawMenu();
    this.drawBottomSection('dgmn',this.dgmnData[0]);
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * CLOSE ITEM TARGET SELECT
   * ------------------------------------------------------------------------
   * Closes the Item Target Menu, and goes back to Item Select
   * ----------------------------------------------------------------------*/
  closeItemTargetSelect = () => {
    this.currState = 'items';
    this.drawTopText('Select an Item');
    this.removeSubMenu('itemTarget');
    this.drawBottomSection('item',{ itemName: this.subMenus.items.listItems[this.subMenus.items.currIndex] });
    this.drawMenu();
  }

  buildDgmnData = () => {
    let data = [];
    for(let i = 0; i < this.party.length; i++){
      data.push(this.dgmnAH.getDgmnData(this.party[i],['nickname','speciesName','currentHP','currentEN','currentLevel','currentStats'],false));
    }
    return data;
  }

  drawTopText = message => { 
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0,0,20*CFG.tileSize,7*CFG.screenSize); 
    this.topTxt.instantText(this.menuCanvas.ctx,message,'white');
  }

  /**------------------------------------------------------------------------
   * DRAW BOTTOM SECTION
   * ------------------------------------------------------------------------
   * Draws the info on the Bottom Screen. Shows Item and DGMN Data
   * TODO - Bottom Section (especially DGMN, needs to move to its own component)
   * ----------------------------------------------------------------------*/
  drawBottomSection = (type,data) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(0,14*CFG.tileSize,20*CFG.tileSize,4*CFG.tileSize);
    if(type === 'item'){
      this.itemDescriptionTxt.instantText(this.menuCanvas.ctx,this.treasureUtility.getItemDescription(data.itemName),'white');
    }else if(type === 'dgmn'){
      let nicknameTxt = new TextArea(4,14,10,1)
          nicknameTxt.instantText(this.menuCanvas.ctx,data.nickname,'white');
      let speciesTxt = new TextArea(4,15,16,1);
          speciesTxt.instantText(this.menuCanvas.ctx,data.speciesName+".MON",'green');
      let dgmnHPTxt = new TextArea(4,16,10,1);
          dgmnHPTxt.instantText(this.menuCanvas.ctx,".hp"+this.menuUtility.prependZeros(data.currentHP,3)+"-"+data.currentStats.HP,"white"); // TODO - For HP and EN, I need /, not -
      let dgmnENTxt = new TextArea(4,17,10,1);
          dgmnENTxt.instantText(this.menuCanvas.ctx,".en"+this.menuUtility.prependZeros(data.currentEN,3)+"-100","white");
      let dgmnLVTxt = new TextArea(16,14,4,1);
          dgmnLVTxt.instantText(this.menuCanvas.ctx,".lv"+this.menuUtility.prependZeros(data.currentLevel,3),"white");
      this.menuCanvas.paintImage(this.systemAH.fetchImage(`${data.speciesName.toLowerCase()}Portrait`),0,14*CFG.tileSize);
    } else if(type === 'message'){
      this.itemDescriptionTxt.timedText(this.menuCanvas.ctx,data.message,this.drawMenu);
      setTimeout(()=>{
        // Continue cursor
        this.currState = 'items-done';
      },500);
    }
  }

  /**------------------------------------------------------------------------
   * DRAW MENU
   * ------------------------------------------------------------------------
   * Draws all of the currently Visible Menus' Canvases
   * ----------------------------------------------------------------------*/
     drawMenu = () => {
      for(let key in this.subMenus){
        if(this.subMenus[key].isVisible){
          if(key === 'itemTarget'){
            this.menuCanvas.paintImage(this.systemAH.fetchImage('itemsTargetOverlay'),0,0);
          }
          this.menuCanvas.paintCanvas(this.subMenus[key].menuCanvas);
        } 
      }
      this.parentAH.drawDungeon();
    }

  /**------------------------------------------------------------------------
   * SELECT LIST ITEM
   * ------------------------------------------------------------------------
   * Handles what happens when you click Action when inside a List Menu.
   * Handles: Items, Dgmn, "Dex", Beetle
   * TODO - This might get too big, split it up if necessary
   * ----------------------------------------------------------------------*/
    selectListItem = () => { // This has to be here to build a new Sub Menu
      if(this.currState === 'items'){
        let item = this.subMenus.items.listItems[this.subMenus.items.currIndex];
        console.log("Selecting Item = ",item);
        if(this.treasureUtility.isTreasureUsable(item,'dungeon')){ // TODO - This needs to not be hard-coded to dungeon
          let target = this.treasureUtility.getItemTarget(item);
          console.log("TARGET ? ",target)
          if(target === 'party'){
            this.launchItemTargetSelect();
          } else if(target === 'your-dgmn-all'){
            console.log("USE ITEM ON ALL DGMN");
          }else if(target === 'beetle'){
            console.log("USE ITEM ON BEETLE");
          }
        }
      } else if(this.currState === 'items-target'){
        this.dgmnAH.useItemOn(this.party[this.subMenus.itemTarget.currIndex],this.subMenus.items.listItems[this.subMenus.items.currIndex]);
        let message = `Used ${this.treasureUtility.getTreasureName(this.subMenus.items.listItems[this.subMenus.items.currIndex])} on DGMN`;
        this.drawBottomSection('message',{message: message});
        this.digiBeetleAH.removeItemFromToolBox(this.subMenus.items.currIndex);
      } else if(this.currState === 'items-done'){
        this.currState = 'items';
        this.removeSubMenu('itemTarget');
        this.drawBottomSection('items',{ itemName: this.subMenus.items.listItems[this.subMenus.items.currIndex] });
        this.refreshItemMenu();
        this.drawMenu();
      }
    }

  backMenu = () => {
    console.log("Going Back from ",this.currState);
    if(this.currState === 'items'){
      this.closeItemMenu();
    } else if(this.currState === 'items-target'){
      this.closeItemTargetSelect();      
    }
  }

  /**------------------------------------------------------------------------
   * UP LIST ITEM
   * ------------------------------------------------------------------------
   * -
   * ----------------------------------------------------------------------*/
    upListItem = () => { 
      if(this.currState === 'items') { this.subMenus.items.upListItem(); this.drawMenu()
      } else if(this.currState === 'items-target'){ 
        this.subMenus.itemTarget.prevListItem();
        this.drawBottomSection('dgmn',this.dgmnData[this.subMenus.itemTarget.currIndex]);
        this.drawMenu(); 
      }
    }

  /**------------------------------------------------------------------------
   * DOWN LIST ITEM
   * ------------------------------------------------------------------------
   * -
   * ----------------------------------------------------------------------*/
    downListItem = () => { 
      if(this.currState === 'items') { this.subMenus.items.downListItem(); this.drawMenu()
      } else if(this.currState === 'items-target'){ 
        this.subMenus.itemTarget.nextListItem(); 
        this.drawBottomSection('dgmn',this.dgmnData[this.subMenus.itemTarget.currIndex]);
        this.drawMenu(); 
      }
    }

    // PASSTHROUGH
    rightListItem = () => { this.subMenus.items.rightListItem(); this.drawMenu() }
    leftListItem = () => { this.subMenus.items.leftListItem(); this.drawMenu() }

    getState = () => { return this.currState }
}

export default PauseMenu;
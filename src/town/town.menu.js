import Menu from "../classes/menu";
import ListMenu from "../classes/menu/list-menu";
import TextArea from "../classes/text-area";
import CFG from "../config";
import TownAH from "./helpers/town.ah";
import { TOWN_DGMN_DIALOG, TOWN_DGMN_TALKER, TOWN_SCENE_CHOICES, TOWN_TOP_TEXT } from "./helpers/town.const";

class TownMenu extends Menu{
  constructor(...args){
    super(...args);

    this.sceneMenu;

    this.topTxt = new TextArea(0,0,20,1);
    this.chatTxt = new TextArea(4,14,16,4);
  }

  buildScene = (currScene, locationLevel) => {
    let optionCount = TOWN_SCENE_CHOICES[currScene].length;
    this.drawBackground('town_menu_background');

    this.topTxt.instantText(this.menuCanvas.ctx,
      TOWN_TOP_TEXT[currScene][0]); // TODO - Needs to pull from current Sub Menu's Index
    this.chatTxt.timedText(this.menuCanvas.ctx,
      TOWN_DGMN_DIALOG[currScene].INTRO[locationLevel],
      this.drawMenu)

    this.addSubMenu(currScene, new ListMenu([12,13-optionCount],optionCount,6,1,TOWN_SCENE_CHOICES[currScene],this.systemAH.fetchImage('miniCursor'),null,currScene));
    this.subMenus.tower.isVisible = true;
    this.subMenus.tower.drawMenu();
    this.drawDgmnPortrait(this.systemAH.fetchImage(TOWN_DGMN_TALKER[currScene][locationLevel]+'Portrait'));
    this.drawMenu();
  }

  /**------------------------------------------------------------------------
   * DRAW MENU
   * ------------------------------------------------------------------------
   * Draws all of the currently Visible Menus' Canvases
   * ----------------------------------------------------------------------*/
  drawMenu = () => {
    for(let key in this.subMenus){
      if(this.subMenus[key].isVisible){
        this.menuCanvas.paintCanvas(this.subMenus[key].menuCanvas);
      }
    }

    this.parentAH.drawTown();
  }

  drawDgmnPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * CFG.screenSize,32*CFG.screenSize,(32-1)*CFG.screenSize);
  }
}

export default TownMenu;

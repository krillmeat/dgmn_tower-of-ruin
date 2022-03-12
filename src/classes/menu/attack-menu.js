import config from "../../config";
import TextArea from "../text-area";
import ListMenu from "./list-menu";
import ListMenuCanvas from "./list-menu-canvas";

class AttackMenu extends ListMenu{
  constructor(...args){
    super(...args);
    this.battleAH = this.parentAH;
    this.menuCanvas;
    this.backImage;

    this.listSpaces = []
  }

  // TODO - Right now, I'm sending in the entire attack, and then making a shortened object from that
  //        I SHOULD be making a request to Attack to create that Data
  init = (allAttacks) => {
    this.menuCanvas = new ListMenuCanvas('attack-menu-canvas',160,144);
    this.menuCanvas.paintImage(this.systemAH.fetchImage("battleOptionSelectBaseRight"),0,0);
    this.buildAttackList(allAttacks);
    this.drawAttackList();
    this.battleAH.drawBattleCanvas() // TODO - I think I have t owatch this, because ATK Menu should be able to run on Dgmn Stats Menu
  }

  /**------------------------------------------------------------------------
   * BUILD ATTACK LIST
   * ------------------------------------------------------------------------
   * Builds the Attack list with Objects with the needed data
   * ------------------------------------------------------------------------
   * @param {Array} allAttacks List of Attack Data
   * ----------------------------------------------------------------------*/
  buildAttackList = allAttacks => {

    let spacesLength = allAttacks.length < 7 ? allAttacks.length : 6;

    // Loop through and create the Elements needed for your list
    for(let i = 0; i < spacesLength; i++){
      this.listSpaces.push({
        textArea: new TextArea(5,2+(i*2),8,1),
        attackName: allAttacks[i].attackName,
        displayName: allAttacks[i].displayName,
        currCost: allAttacks[i].currCost,
        maxCost: allAttacks[i].maxCost,
        type: allAttacks[i].type,
        power: allAttacks[i].power,
        targets: allAttacks[i].targets,
        hits: allAttacks[i].hits
      })
    }
  }

  setMenuItem = dir => {
    this.repaintCanvas();
    if(dir === 'next'){
      if(this.currentIndex + 1 < this.listSpaces.length){
        this.currentIndex++;
      }
    } else if(dir === 'prev'){
      if(this.currentIndex - 1 >= 0){
        this.currentIndex--;
      }
    }

    this.repaintCanvas();
  }

  selectAttack = () => {
    this.battleAH.launchTargetSelect( this.listSpaces[this.currentIndex] );
  }

  /**------------------------------------------------------------------------
   * DRAW ATTACK LIST
   * ------------------------------------------------------------------------
   * Paints the Elements needed for the Attac List
   * ----------------------------------------------------------------------*/
  drawAttackList = () => {
    this.drawCursor(this.currentIndex,4,2);
    for(let i = 0; i < this.listSpaces.length; i++){
      let attack = this.listSpaces[i];
      attack.textArea.instantText(this.menuCanvas.ctx,attack.displayName,"white");
      this.drawCostMeter(i,attack.maxCost,attack.currCost);
      this.drawTypeIcon(i,attack.type);
      this.drawPowerIcon(i,attack.power);
      this.drawTargetsIcon(i,attack.targets);
      this.drawHitsIcon(i,attack.hits);
    }
  }

  repaintCanvas = () => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage("battleOptionSelectBaseRight"),0,0);
    this.drawAttackList();
    this.battleAH.drawBattleCanvas();
  }

  drawTypeIcon = (listIndex,type) => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage(`${type}TypeIcon`), 
                              ( 120 )*config.screenSize ,this.getYOffsetForIndex(listIndex) + ( 24 * config.screenSize ));
  }

  drawPowerIcon = (listIndex,power) => {
    this.menuCanvas.paintImage(this.systemAH.fetchImage(`pwr${power}Icon`), 
                              ( 128 )*config.screenSize ,this.getYOffsetForIndex(listIndex) + ( 24 * config.screenSize ));
  }

  drawTargetsIcon = (listIndex,targets) => {
    let imageName = targets === 'single' ? 'targetOne' : 'targetAll';
    this.menuCanvas.paintImage(this.systemAH.fetchImage(imageName), 
                              ( 136 )*config.screenSize ,this.getYOffsetForIndex(listIndex) + ( 24 * config.screenSize ));
  }

  drawHitsIcon = (listIndex,hits) => {
    let hitCount = 'one';
        hitCount = hits === 2 ? 'two' : hitCount;
        hitCount = hits === 3 ? 'three' : hitCount;

    this.menuCanvas.paintImage(this.systemAH.fetchImage('oneHitIcon'), // TODO - Create the remaining icons 
                              ( 144 )*config.screenSize ,this.getYOffsetForIndex(listIndex) + ( 24 * config.screenSize ));
  }

  /**------------------------------------------------------------------------
   * DRAW COST METER
   * ------------------------------------------------------------------------
   * Draws the Cost Meter to show how many uses an Attack has left
   * TODO - Do a comment write-up on how this works
   * ----------------------------------------------------------------------*/
  drawCostMeter = (listIndex,maxCost,currCost) => {
    let blockCount = maxCost / 4;
    let remCount = currCost;
    for(let i = 0; i < blockCount; i++){
      let remove = maxCost - ((i+1) * 4);
      let check = maxCost - remove - (i * 4);
      let final = 25 * (remCount - check);
          final = final >= 0 ? 0 : final;
          final = final/25 < -3 ? -100 : final;
      this.menuCanvas.ctx.drawImage(this.systemAH.fetchImage(`costMeter${100+final}`),
                                 ((5 + i) * (8 * config.screenSize)), (3+(listIndex*2))*(8*config.screenSize),
                                 (8*config.screenSize),(8*config.screenSize));
      remCount -= 4;
    }
  }
}

export default AttackMenu;
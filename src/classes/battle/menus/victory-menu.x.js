import GameCanvas from "../../canvas";
import SubMenu from "../../menu/sub-menu";
import config from "../../../config";
import TextArea from "../../text-area";
import DgmnUtility from "../../dgmn/utility/dgmn.util";
import DgmnCanvas from "../../dgmn/canvas/dgmn-canvas";

// TODO - I think I should take this out of the Battle Menu Umbrella and load it as a main menu directly in the Battle
//        It would make things a WHOLE lot cleaner

class VictoryMenu extends SubMenu{
  constructor(redrawCB,...args){
    super(...args);

    this.menuCanvas = new GameCanvas('victory',160,144);
    this.dgmnAH;

    this.currIndex = 0;
    this.currState = '';

    this.levelUps = [];
    this.currLvDgmn = '';
    this.levelUpTxt = new TextArea(3,5,4,1,this.baseXPTxtColorize);

    this.statTxtAreas = {
      HP:  {original: new TextArea(13,4,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,4,2,1,this.baseXPTxtColorize) },
      ATK: {original: new TextArea(13,5,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,5,2,1,this.baseXPTxtColorize) },
      DEF: {original: new TextArea(13,6,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,6,2,1,this.baseXPTxtColorize) },
      INT: {original: new TextArea(13,7,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,7,2,1,this.baseXPTxtColorize) },
      RES: {original: new TextArea(13,8,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,8,2,1,this.baseXPTxtColorize) },
      HIT: {original: new TextArea(13,9,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,9,2,1,this.baseXPTxtColorize) },
      AVO: {original: new TextArea(13,10,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,10,2,1,this.baseXPTxtColorize) },
      SPD: {original: new TextArea(13,11,3,1,this.baseXPTxtColorize),
            plus: new TextArea(17,11,2,1,this.baseXPTxtColorize) }
    }

    this.dgmnUtility = new DgmnUtility();

    this.redrawCB = () => redrawCB();
  }

  gotoVictoryScreen = (backImg,rewards,baseXP,fetchImgCB,onDoneCB) => {
    this.menuCanvas.paintImage(backImg,0,0);

    this.drawBaseXP(baseXP,fetchImgCB);
    this.drawVictoryRewards(rewards,onDoneCB,fetchImgCB);
  }

  gotoRewardsScreen = (rewards,fetchImgCB) => {
    let backImg = fetchImgCB('battleVictoryRewardsOverlay')
    this.menuCanvas.paintImage(backImg,0,0);

    this.drawRewardsList(rewards,0,fetchImgCB);
  }

  gotoLevelUpScreen = (levelUps,fetchImgCB,portraitCB) => {
    let backImg = fetchImgCB('battleLevelUpOverlay');
    this.menuCanvas.clearCanvas();
    this.menuCanvas.paintImage(backImg,0,0);
    this.currState = 'level'

    this.levelUps = levelUps;

    let dgmn = levelUps[0];
    this.currLvDgmn = dgmn.dgmnId;

    portraitCB(fetchImgCB(dgmn.speciesName.toLowerCase()+'Portrait'));

    let dgmnCanvas = this.dgmnAH.getCanvas(dgmn.dgmnId); // TODO - this goes against the idea of not storing refs to Objects but... :shrug:
        dgmnCanvas.x = 3 * config.tileSize;
        dgmnCanvas.y = 8 * config.tileSize;
        dgmnCanvas.refreshScreen = this.redrawDgmnCanvas;
    this.menuCanvas.paintCanvas(dgmnCanvas);

    this.levelUpTxt.instantText(this.menuCanvas.ctx, `.lv${this.menuUtility.prependZeros(dgmn.currentLevel,3)}`,'white')

    for(let stat in dgmn.currentStats){
      let growth = this.dgmnUtility.getBaseStat(dgmn.speciesName,stat);
      this.statTxtAreas[stat].original.instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(dgmn.currentStats[stat],3),'white');
      this.statTxtAreas[stat].plus.instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(growth,2),'green');
    }
  }

  gotoEvolution = (dgmnData,fetchImgCB) => {
    let backImg = fetchImgCB('battleEvolutionOverlay');
    this.menuCanvas.clearCanvas();
    this.menuCanvas.paintImage(backImg,0,0);
    this.currState = 'evo';

    let dgmnCanvas = this.dgmnAH.getCanvas(dgmnData.dgmnId);
        dgmnCanvas.x = 1*config.tileSize;
        dgmnCanvas.y = 4 * config.tileSize;

    let evos = this.dgmnUtility.getEvolutions(dgmnData.speciesName);
    console.log("ALL EVOS = ",evos);

    // this.evoDgmnCanvas = new DgmnCanvas(this.redrawDgmnCanvas,evos[0].dgmnName,'dgmn-canvas',32,32);
    // this.evoDgmnCanvas.x = 4*config.tileSize;
    // this.evoDgmnCanvas.y = 4*config.tileSize;
    // this.evoDgmnCanvas.frames = [];

    // TODO - Backwards pattern to send the canvas reference in
    let evoDgmn = this.dgmnAH.getTempDgmn();
        evoDgmn.speciesName = evos[0].dgmnName;
    let evoDgmnImages = [fetchImgCB(`${evoDgmn.speciesName.toLowerCase()}Idle0`),
                         fetchImgCB(`${evoDgmn.speciesName.toLowerCase()}Idle1`)];
    evoDgmn.initCanvas(this.redrawDgmnCanvas,evoDgmnImages,0);
    evoDgmn.startIdleAnimation();

    console.log("EVO DGMN = ",evoDgmn);

    /*
    this.dgmnCanvas = new DgmnCanvas(refreshScreenCB,this.speciesName,'dgmn-canvas',32,32);
    this.dgmnCanvas.x = (24 + (this.isEnemy ? 8 : 72) ) * config.screenSize;
    this.dgmnCanvas.y = (16 + (battlePosition * 32) ) * config.screenSize;
    this.dgmnCanvas.frames = dgmnImageList;
    if(this.isEnemy){ this.dgmnCanvas.flip() }
    */
  }

  
  drawVictoryRewards = (rewards,callback,fetchImageCB) => {
    let i = 0;
    let rewardInterval = setInterval(()=>{
      let image = rewards[i] === 'XP' ? 'xpIconSmall' : `field${rewards[i]}Icon`;
      this.menuCanvas.paintImage(fetchImageCB(image),(2+i)*config.tileSize,5*config.tileSize);
      if(i >= rewards.length-1){
        clearInterval(rewardInterval);
        setTimeout(()=>{callback()},500)
      } 
      i++;
    },66);
  }

  drawBaseXP = (xpTotal) => {
    let baseXPTxt = new TextArea(6,11,3,1,(char,wholeString,index) => { return this.baseXPTxtColorize(char,wholeString,index) });
        baseXPTxt.instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(xpTotal,3),'white');
  }

  baseXPTxtColorize = (char,wholeString,index) => {
    let color = 'none';
    if(char === 'hp' || char === 'en' || char === 'lv'){ color = 'green' 
    } else if( (char === '0' && index === 1) || (char === '0' && index === 2 && wholeString[1] === '0') ){ color = 'darkGreen'}
    return color;
  }

  drawRewardsList = (rewards,currIndex,fetchImgCB) => {
    this.menuCanvas.paintImage(fetchImgCB(`field${rewards[currIndex]}Icon`),1*config.tileSize,2*config.tileSize);
    for(let i = currIndex+1; i < rewards.length; i++){
      let img = rewards[i] === 'XP' ? 'xpIconSmall' : `field${rewards[i]}Icon`;
      this.menuCanvas.paintImage(fetchImgCB(img),(2 + (i-this.currIndex))*config.tileSize,2*config.tileSize);
    }
  }

  updateRewardsList = (rewards,fetchImgCB,drawCB,onDoneCB) => {
    let backImg = fetchImgCB('battleVictoryRewardsOverlay')
    this.currIndex++;

    if(this.currIndex >= rewards.length){
      this.menuCanvas.paintImage(backImg,0,0);
      drawCB();
      onDoneCB();
    } else{
      // Have to redraw the Back IMG to delete the previous FP
      this.menuCanvas.paintImage(backImg,0,0);
      this.drawRewardsList(rewards,this.currIndex,fetchImgCB);
      drawCB();
    }
  }

  levelUpNext = () => {
  }

  //this.refreshScreen
  redrawDgmnCanvas = () => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    if(this.currState === 'level'){
      this.menuCanvas.ctx.fillRect(2*config.tileSize,6*config.tileSize,48*config.screenSize,48*config.screenSize);
    } else if(this.currState === 'evo'){
      this.menuCanvas.ctx.fillRect(1*config.tileSize,4*config.tileSize,36*config.screenSize,36*config.screenSize);
      this.menuCanvas.paintCanvas(this.dgmnAH.getTempDgmn().dgmnCanvas);
    }
    this.menuCanvas.paintCanvas(this.dgmnAH.getCanvas(this.currLvDgmn));
    this.redrawCB();
  }
}

// export default VictoryMenu;

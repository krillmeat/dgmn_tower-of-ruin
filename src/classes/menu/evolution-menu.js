import IconMenu from "./icon-menu";
import GameCanvas from "../canvas";
import config from "../../config";
import DgmnUtility from "../dgmn/utility/dgmn.util";
import TextArea from "../text-area";
import DgmnCanvas from "../dgmn/canvas/dgmn-canvas";

// TODO - So much is shared between this and Hatching Egg Menu, it feels like I should make a new Class for the shared elements

class EvolutionMenu extends IconMenu{
  constructor(...args){
    super(...args);

    this.dgmnUtility = new DgmnUtility();
    this.dgmnCanvas;
    this.evoCanvas;

    this.menuCanvas = new GameCanvas(`${this.label}-menu`,160,144); // TODO - Figure out the proper length
    this.menuCanvas.x = 0;
    this.menuCanvas.y = 0;

    this.selectedDgmn = '';

    this.statTxtAreas = {
      HP:  new TextArea(17,2,3,1,this.baseXPTxtColorize),
      ATK: new TextArea(17,3,3,1,this.baseXPTxtColorize),
      DEF: new TextArea(17,4,3,1,this.baseXPTxtColorize),
      INT: new TextArea(17,5,3,1,this.baseXPTxtColorize),
      RES: new TextArea(17,6,3,1,this.baseXPTxtColorize),
      HIT: new TextArea(17,7,3,1,this.baseXPTxtColorize),
      AVO: new TextArea(17,8,3,1,this.baseXPTxtColorize),
      SPD: new TextArea(17,9,3,1,this.baseXPTxtColorize)
    }

    this.evoReqsTxt = [
      new TextArea(2,10,3,1,this.baseXPTxtColorize),
      new TextArea(6,10,3,1,this.baseXPTxtColorize),
      new TextArea(2,11,3,1,this.baseXPTxtColorize),
      new TextArea(6,11,3,1,this.baseXPTxtColorize)
    ];

    this.evoNameTxt = new TextArea(4,14,12,1,this.baseXPTxtColorize);
    this.evoAttributeTxt = new TextArea(4,15,7,1,this.baseXPTxtColorize);
    this.evoWeakTxt = new TextArea(4,16,4,1,this.baseXPTxtColorize);
    this.evoResTxt = new TextArea(12,16,3,1,this.baseXPTxtColorize);

    this.fetchImgCB;
    this.redrawParentCB;
  }

  buildEvolutionScreen = (dgmnData,redrawCB) => {
    let evos = this.dgmnUtility.getEvolutions(dgmnData.speciesName);
    this.selectedDgmn = evos[0];
    this.iconList = evos;
    this.drawIcons(dgmnData.currentFP,evos,0);
    this.drawDgmnStats(this.dgmnUtility.getAllBaseStats(this.selectedDgmn));
    this.drawEvoRequirements(evos[0]);
    this.drawDgmnCanvas('dgmnCanvas',dgmnData.speciesName,redrawCB);
    this.drawDgmnCanvas('evoCanvas',evos[0],redrawCB);
    this.drawDgmnInfo(evos[0])

    this.redrawParentCB();
  }

  drawDgmnInfo = species => {
    this.drawEvoPortrait(this.fetchImgCB(`${species.toLowerCase()}Portrait`))
    this.evoNameTxt.instantText(this.menuCanvas.ctx,`${species}.MON`,'white')
    this.evoAttributeTxt.instantText(this.menuCanvas.ctx,this.dgmnUtility.getAttribute(species),'green')
    this.evoWeakTxt.instantText(this.menuCanvas.ctx,'WEAK','green');
    this.evoResTxt.instantText(this.menuCanvas.ctx,'RES','green');

    for(let field in this.dgmnUtility.getBaseFP(species)){
      this.menuCanvas.paintImage(this.fetchImgCB(`field${field}Icon`),(this.dgmnUtility.getAttribute(species).length+5)*config.tileSize,15*config.tileSize);
    }
  }

  drawDgmnStats = stats => {
    for(let stat in stats){
      this.statTxtAreas[stat].instantText(this.menuCanvas.ctx, this.menuUtility.prependZeros(stats[stat],2),'white');
    }
  }

  drawEvoRequirements = species => {
    let fpReqs = this.dgmnUtility.getEvoFP(species);
    let otherReqs = []; // TODO - Not doing this yet
    // LOOP THROUGH FP REQS
    let i = 0;
    for(let req in fpReqs){
      let img = this.fetchImgCB(`field${req}Icon`);
      this.menuCanvas.paintImage(img,(1+i)*config.tileSize,10*config.tileSize);
      this.evoReqsTxt[i].instantText(this.menuCanvas.ctx,this.menuUtility.prependZeros(fpReqs[req],3),'white');
      i++;
    }
  }

  // TODO - Right now, there's no Multi-evo DGMN, so I need to rework that when the time comes for Yura.MON (Evolves into Tane and Bud)
  drawIcons = (dgmnFP,evoList,selected) => {
    let possibleEvos = [];

    let iconsOffset = [1*config.tileSize,13*config.tileSize];

    for(let i = 0; i < evoList.length; i++){
      let img;
      if( this.dgmnUtility.canEvolveInto(dgmnFP,evoList[i]) ){
        possibleEvos.push(evoList[i]);
        img = this.fetchImgCB('evoIconPositive');
      } else{ img = this.fetchImgCB('evoIconNegative') }
      this.menuCanvas.paintImage(img,iconsOffset[0]+(i*config.tileSize),iconsOffset[1]);
    }

    this.menuCanvas.ctx.fillStyle = "#C4CFA1";
    this.menuCanvas.ctx.fillRect(iconsOffset[0]+(selected*8)+3,iconsOffset[1]+3,5*config.screenSize,4*config.screenSize);

    // this.redrawParentCB(); // TODO - Can't decide whether to put this here, or on the invoking function
  }

  chooseEvolution = dgmnData => {

  }

  drawEvoPortrait = portraitImg => {
    this.menuCanvas.ctx.drawImage(portraitImg,0,0,256,248,
      0, 112 * config.screenSize,32*config.screenSize,(32-1)*config.screenSize);
  }

  // TODO - Find a way to make more Modular
  drawDgmnCanvas = (canvas,species,redrawCB) => {
    let coord = canvas === 'dgmnCanvas' ? [1,4] : [8,4];
    this[canvas] = new DgmnCanvas(()=>{},species,'dgmn-canvas',32,32);
    this[canvas].x = coord[0]*config.tileSize;
    this[canvas].y = coord[1]*config.tileSize;
    this[canvas].frames = [this.fetchImgCB(`${species.toLowerCase()}Idle0`),
                              this.fetchImgCB(`${species.toLowerCase()}Idle1`)];
    this[canvas].refreshScreen = () => this.redrawDgmn(this[canvas],coord,redrawCB);
    this[canvas].animate(100);
  }

  redrawDgmn = (canvas,coord,redrawCB) => {
    this.menuCanvas.ctx.fillStyle = "#00131A";
    this.menuCanvas.ctx.fillRect(coord[0]*config.tileSize,coord[1]*config.tileSize,32*config.screenSize,32*config.screenSize);
    this.menuCanvas.paintCanvas(canvas);
    
    redrawCB();
  }
}

export default EvolutionMenu;
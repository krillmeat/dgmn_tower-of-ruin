import GameCanvas from "../canvas";
import TextArea from "../text-area";
import config from "../../config";

class  MenuCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.topTxt = new TextArea(0,1,20);
  }

  clearTopMessage = () => {
    this.ctx.clearRect(0,8*config.screenSize, 160*config.screenSize,8*config.screenSize);
  }

  setTopMessage = message => {
    this.clearTopMessage();
    this.topTxt.instantText(this.ctx,message,'white');
  }

  drawDgmnPortrait = (portraitImage,spcies) => {

  }
}

export default MenuCanvas;
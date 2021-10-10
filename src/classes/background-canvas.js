import GameCanvas from './canvas';

class BackgroundCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.loadImageStack(['./sprites/testing/battle-background.png']); // TODO - Dynamically Grab this stuff
  }
}

export default BackgroundCanvas;
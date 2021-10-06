import GameCanvas from './canvas';

class BackgroundCanvas extends GameCanvas{
  constructor(...args){
    super(...args);

    this.loadImageStack();
  }

  loadImageStack = () => {
    this.imageUrlStack = {
      battleBack: './sprites/testing/battle-background.png'
    };
  }
}

export default BackgroundCanvas;
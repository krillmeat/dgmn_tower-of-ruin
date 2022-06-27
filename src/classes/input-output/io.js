class IO{
  constructor(){}

  keyTriage = (key, upDown) => {
    if(key === 'action'){
      this.actionKeyHandler();
    } else if(key === 'cancel'){
      this.cancelKeyHandler();
    } else if(key === 'start'){
      this.startKeyHandler();
    }else if(key === 'up'){
      this.upKeyHandler(upDown);
    } else if(key === 'right'){
      this.rightKeyHandler(upDown);
    } else if(key === 'down'){
      this.downKeyHandler(upDown);
    } else if(key === 'left'){
      this.leftKeyHandler(upDown);
    }
  }

  // ALL SHOULD BE OVERWRITTEN
  actionKeyHandler = upDown => {}
  cancelKeyHandler = upDown => {}
  startKeyHandler = upDown => {}
  upKeyHandler = upDown => {}
  rightKeyHandler = upDown => {}
  downKeyHandler = upDown => {}
  leftKeyHandler = upDown => {}
}

export default IO;
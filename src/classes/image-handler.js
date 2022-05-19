import config from "../config";

class ImageHandler{
  constructor(){
    this.loadQueue = [];
    this.loadedImages = {};
  }

  addToQueue = (imageList, callback) => {
    let loadedImages = {};
    let loadedCount = 0;
    let totalImages = imageList.length;
    for(let i = 0; i < totalImages; i++){
      let modName = this.modImageName(imageList[i]);
      loadedImages[modName] = new Image();
      // loadedImages[modName].src = imageList[i]; // CHANGE THIS
      loadedImages[modName].src = `./sprites/${config.pixelKidMode}/${imageList[i]}.png`
      // loadedImages[modName].src = `./sprites/${imageList[i]}.png`;
      loadedImages[modName].onload = () => {
        if(++loadedCount >= totalImages){
          this.loadedImages = Object.assign(this.loadedImages, loadedImages);
          callback();
        }
      };
    }
  }

  modImageName = fileName => {
    // let modName = fileName.substring(fileName.lastIndexOf('/')+1,fileName.lastIndexOf(".png"));
    let modName = fileName.substring(fileName.lastIndexOf('/')+1);
    return modName;
  }

  fetchImage = imgName => {
    return this.loadedImages[imgName];
  }
    
}

export default ImageHandler;
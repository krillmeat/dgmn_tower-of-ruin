import config from "../../config";
import { attacksDB } from "../../data/attacks.db";
import TextManager from "../text-manager";

class DgmnAttackMenu {
  constructor(fetchImageCallback){
    this.attackList = [];
    this.currentChoice = 0;

    this.textManagers = [
      new TextManager([fetchImageCallback('fontsWhite')], 1,15, 5,2 ),
      new TextManager([fetchImageCallback('fontsWhite')], 1,15, 5,4 ),
      new TextManager([fetchImageCallback('fontsWhite')], 1,15, 5,6 )
    ];

    this.fetchImage = imageName => { return fetchImageCallback(imageName) }
  }

  loadAttackList = attackData => {
    this.attackList = attackData;
  }

  refreshList = (canvas) => {
    let loopCount = this.attackList.length > 6 ? 6 : this.attackList.length;
    for(let i = 0; i < loopCount; i++){
      let attack = this.attackList[i];
      let targetCount = attack.targets === 'single' ? 'targetOne' : 'targetAll';
      this.textManagers[i].instantPaint(canvas,attacksDB[attack.attackName].displayName);
  
      canvas.ctx.drawImage(this.fetchImage('costLabel'), 5 * (8 * config.screenSize), ( 3 + (2 * i) ) * (8 * config.screenSize), 16 * config.screenSize, 8 * config.screenSize);
  
      this.calculateCost(canvas,attack,i);

      canvas.ctx.drawImage(this.fetchImage(`${attack.type}TypeIcon`), 16 * (8 * config.screenSize), ( 3 + (2 * i) ) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      canvas.ctx.drawImage(this.fetchImage(`pwr${attack.power}Icon`), 17 * (8 * config.screenSize), ( 3 + (2 * i) ) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      canvas.ctx.drawImage(this.fetchImage(targetCount), 18 * (8 * config.screenSize), ( 3 + (2 * i) ) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
      canvas.ctx.drawImage(this.fetchImage('oneHitIcon'), 19 * (8 * config.screenSize), ( 3 + (2 * i) ) * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
    }
  }

  calculateCost = (canvas, attack, index) => {
    let blockCount = attack.maxCost / 4;
    let remCount = attack.currCost;
    for(let i = 0; i < blockCount; i++){
      let remove = attack.maxCost - ((i+1) * 4) ;
      let check = attack.maxCost - remove - (i * 4);
      let final = 25 * (remCount - check);
          final = final >= 0 ? 0 : final;
          final = final < 0 ? -100 : final;
      canvas.ctx.drawImage(this.fetchImage(`costMeter${100 + final}`), ( (7 + (i)) * (8 * config.screenSize) ), (3 + (index * 2) ) * (8 * config.screenSize), (8 * config.screenSize), (8 * config.screenSize)  );
      remCount -= 4;
    }
  }
}

export default DgmnAttackMenu;
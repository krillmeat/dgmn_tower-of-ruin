import config from "../../config";
import { attacksDB } from "../../data/attacks.db";
import TextManager from "../text-manager";

class DgmnAttackMenu {
  constructor(fetchImageCallback){
    this.attackList = [];
    this.currentChoice = 0;

    this.textManagers = [
      new TextManager([fetchImageCallback('fontsWhite')], 1,15, 5,2 )
    ];

    this.fetchImage = imageName => { return fetchImageCallback(imageName) }
  }

  loadAttackList = attackData => {
    this.attackList = attackData;
  }

  refreshList = (canvas, index) => {
    let attack = this.attackList[index];
    this.textManagers[0].instantPaint(canvas,attacksDB[attack.attackName].displayName);

    canvas.ctx.drawImage(this.fetchImage('costLabel'), 5 * (8 * config.screenSize), 3 * (8 * config.screenSize), 16 * config.screenSize, 8 * config.screenSize);

    this.calculateCost(canvas,attack)

    canvas.ctx.drawImage(this.fetchImage('fireTypeIcon'), 16 * (8 * config.screenSize), 3 * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.drawImage(this.fetchImage('pwrEIcon'), 17 * (8 * config.screenSize), 3 * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.drawImage(this.fetchImage('targetOne'), 18 * (8 * config.screenSize), 3 * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);
    canvas.ctx.drawImage(this.fetchImage('oneHitIcon'), 19 * (8 * config.screenSize), 3 * (8 * config.screenSize), 8 * config.screenSize, 8 * config.screenSize);

  }

  calculateCost = (canvas, attack) => {
    let blockCount = attack.maxCost / 4;
    let remCount = attack.currCost;
    for(let i = 0; i < blockCount; i++){
      let remove = attack.maxCost - ((i+1) * 4) ;
      let check = attack.maxCost - remove - (i * 4);
      let final = 25 * (remCount - check);
          final = final >= 0 ? 0 : final;
          final = final < 0 ? -100 : final;
      canvas.ctx.drawImage(this.fetchImage(`costMeter${100 + final}`), ( (7 + (i)) * (8 * config.screenSize) ), 3 * (8 * config.screenSize), (8 * config.screenSize), (8 * config.screenSize)  );
      remCount -= 4;
    }
  }
}

export default DgmnAttackMenu;
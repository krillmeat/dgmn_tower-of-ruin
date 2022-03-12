import Menu from "../menu";

class IconMenu extends Menu{
  constructor(...args){
    super(...args);
    this.menuChart;
  }

  getMenuIconImages = (level) => {
    let images = {};
    for(let label of this.menuChart[level]){
      images[label] = {
        selected: this.systemAH.fetchImage(`${label}Selected`),
        deselected: this.systemAH.fetchImage(`${label}Deselected`)
      }
    }

    return images;
  }

  getCurrentMenuButton = () => {
    return this.menuChart[this.menuChart.level][this.menuChart.index]
  }

}

export default IconMenu;
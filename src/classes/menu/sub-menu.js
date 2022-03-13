class SubMenu{
  constructor(label){
    this.label = label;     // Unique Name for storing in the SubMenu List
    this.isVisible = false; // Whether the Menu should be drawn
    this.isActive = false;  // Whether this Sub Menu is the currently controlled Menu
  }
}

export default SubMenu;
import { toolBoxDB } from "../data/digibeetle.db";

class DigiBeetleUtility{
  constructor(){ }

  getToolBoxMax = box => { return toolBoxDB[box].size }
}

export default DigiBeetleUtility;
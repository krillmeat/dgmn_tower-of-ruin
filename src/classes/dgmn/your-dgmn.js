import Dgmn from "./dgmn";

// TODO - THIS CLASS WILL NEVER WORK LIKE THIS. IT WILL INTERACT HEAVILY WITH THE SAVE DATA TO BUILD OUT THE allDgmn OBJECT
class YourDgmn{
  constructor(){
    // TODO - In the future, dIdX should probably be generated. If I ever want to do a cool online thing, you might need very unique IDs
    this.allDgmn = {
      dId0: new Dgmn(0,"FLARE","Agu"),
      dId1: new Dgmn(1,"SPROUT","Lala"),
      dId2: new Dgmn(2,"GEAR","Haguru")
    }
    this.party = this.mockParty();
  }

  // FOR NOW
  mockParty = () => {
    return [this.allDgmn.dId0,this.allDgmn.dId1,this.allDgmn.dId2];
  }
}

export default YourDgmn;
import Attack from "../../src/classes/dgmn/attack";
import Dgmn from "../../src/classes/dgmn/dgmn";
import YourDgmn from "../../src/classes/dgmn/your-dgmn";

describe('Dgmn',()=>{
  describe('Attacks',()=>{
    describe('Get Attack Data',()=>{
      let mockDgmn = new YourDgmn();
          mockDgmn.allDgmn = {dId0: new Dgmn('dId0','FLARE','agu')};
          mockDgmn.allDgmn.dId0.attacks = [new Attack('bubbles'), new Attack('babyFlame')];
      test('Data Grab', ()=> {
        let expData = [{displayName:'Bubbles'},{displayName:'Baby Flame'}]
        expect(mockDgmn.getDgmnAttackData('dId0',['displayName'])).toEqual(expData);
      })
    })
  })
})
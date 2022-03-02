import 'jest-canvas-mock';

import Battle from "../../src/classes/battle/battle";
import BattleUtility from '../../src/classes/battle/utility/battle.util';
import Dgmn from '../../src/classes/dgmn/dgmn';
import DgmnParty from '../../src/classes/dgmn/dgmn-party';

const emptyFn = () => {}

describe('Battle System',()=>{
  let mockBattle;
  describe("Building Battle",()=>{

  })

  describe("Attacking",()=>{

  })

  describe("Dgmn Status Area",()=>{
    let mockBattleUtility = new BattleUtility();
    describe("Drawing Meters",()=>{
      let spyDrawStatus;
      beforeEach(()=>{
        mockBattle = new Battle();
        mockBattle.systemAH = { fetchImage: emptyFn }
        mockBattle.yourParty = new DgmnParty();
        mockBattle.yourParty.dgmnList = [];
        mockBattle.yourParty.dgmnList[0] = new Dgmn('dId0','BUG','agu');
        mockBattle.yourParty.dgmnList[0].currentHP = 10;
        mockBattle.yourParty.dgmnList[0].currentStats.HP = 20;
        mockBattle.dgmnStatusCanvas = { drawDgmnStatusMeter: jest.fn() }
        spyDrawStatus = jest.spyOn(mockBattle.dgmnStatusCanvas,'drawDgmnStatusMeter').mockImplementation(emptyFn);
      });
      test('Expect HP Meter to be in the correct spot for the first Dgmn in your party',()=>{
        mockBattle.drawDgmnStatusMeter(false,0,'hp');
        expect(spyDrawStatus).toHaveBeenCalledWith( [17,2] , expect.anything(), expect.anything() );
      })
      test('Expect EN Meter to be in the correct spot for the second Dgmn in your party',()=>{
        mockBattle.yourParty.dgmnList[1] = new Dgmn('dId1','DOG','gabu');
        mockBattle.yourParty.dgmnList[1].currentEN = 10;
        mockBattle.drawDgmnStatusMeter(false,1,'en');
        expect(spyDrawStatus).toHaveBeenCalledWith( [17,7], expect.anything(), expect.anything() );
      })
    })
    describe("Meter Calculation",()=>{
      test('Dgmn with HP at 100% will return an 18',()=>{
        expect(mockBattleUtility.calculateMeterLength(20,20)).toEqual(18);
      })

      test('Dgmn with HP at 50% will return a 9',()=>{
        expect(mockBattleUtility.calculateMeterLength(10,20)).toEqual(9);
      });

      test('Dgmn with HP att 25% will return a 4',()=>{
        expect(mockBattleUtility.calculateMeterLength(5,20)).toEqual(4);
      })
    })
  })

  describe("Getters/Setters",()=>{
    describe("Dgmn Data",()=>{
      beforeEach(()=>{
        mockBattle = new Battle();
        mockBattle.yourParty = new DgmnParty();
        mockBattle.yourParty.dgmnList = [new Dgmn('id0','FLARE','agu')];
      })
      test('Getting Digimon Data by Index will build a proper data object',()=>{
        let expectedDgmnData = {speciesName: 'agu' }
        expect(mockBattle.getDgmnDataByIndex(0,['speciesName'])).toEqual(expectedDgmnData);
      })
    })
    
  })
})
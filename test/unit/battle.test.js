import 'jest-canvas-mock';

import Battle from "../../src/classes/battle/battle";
import BattleUtility from '../../src/classes/battle/utility/battle.util';
import Dgmn from '../../src/classes/dgmn/dgmn';
import DgmnParty from '../../src/classes/dgmn/dgmn-party';

const emptyFn = () => {}
const expect_or = (...tests) => {
  try {
    tests.shift()();
  } catch(e) {
    if (tests.length) expect_or(...tests);
    else throw e;
  }
}

describe('Battle System',()=>{
  let mockBattle;
  describe("Building Battle",()=>{

  })

  describe("Turn Order",()=>{
    let mockBattleUtility = new BattleUtility();
    test('With two Dgmn',()=>{
       let mockDgmnData = [{dgmnId: 'dId0',SPD:5},{dgmnId: 'dId1',SPD:10}]
       let expectedData = ['dId1','dId0'];
       expect(mockBattleUtility.calculateTurnOrder(mockDgmnData)).toEqual(expectedData);
    })
    test('With four Dgmn',()=>{
      let mockDgmnData = [{dgmnId: 'dId0',SPD:5},{dgmnId: 'dId1',SPD:10},{dgmnId:'dId2',SPD:20},{dgmnId:'dId3',SPD:2}]
      let expectedData = ['dId2','dId1','dId0','dId3'];
      expect(mockBattleUtility.calculateTurnOrder(mockDgmnData)).toEqual(expectedData);
   })
   test('With six Dgmn',()=>{
    let mockDgmnData = [{dgmnId: 'dId0',SPD:5},{dgmnId: 'dId1',SPD:10},{dgmnId:'dId2',SPD:20},{dgmnId:'dId3',SPD:2},{dgmnId:'dId4',SPD:4},{dgmnId:'dId5',SPD:22}]
    let expectedData = ['dId5','dId2','dId1','dId0','dId4','dId3'];
    expect(mockBattleUtility.calculateTurnOrder(mockDgmnData)).toEqual(expectedData);
   })
   test('With a SPD tie',()=>{
    let mockDgmnData = [{dgmnId: 'dId0',SPD:5},{dgmnId: 'dId1',SPD:10},{dgmnId: 'dId2',SPD:10}]
    let expectedData = ['dId2','dId1','dId0'];
    let expectedData2 = ['dId1','dId2','dId0'];
    expect_or(
      () => expect(mockBattleUtility.calculateTurnOrder(mockDgmnData)).toEqual(expectedData),
      () => expect(mockBattleUtility.calculateTurnOrder(mockDgmnData)).toEqual(expectedData2))
   })
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
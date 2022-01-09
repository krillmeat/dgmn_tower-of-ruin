import Battle from "../../src/classes/battle";
import Dgmn from "../../src/classes/dgmn";
import 'jest-canvas-mock';
import Attack from "../../src/classes/attack";
import DgmnBattleStatus from "../../src/classes/menu/dgmn-battle-status";

import BattleMenu from "../../src/classes/menu/battle-menu";

const fakeDgmn = new Dgmn(0,'FLARE','Agu',0);
const fakeEnemyDgmn = new Dgmn(1,'BOMBER','Gabu',4,true);
const emptyFunc = () => {}

describe('Battle System',() => {


  describe('Loading Data', ()=>{
    test('All Dgmn are added to Object List',()=>{
      let mockBattle = new Battle([fakeDgmn],[],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
      let spy = jest.spyOn(mockBattle, 'addObject');

      mockBattle.addDgmnToObjectList(mockBattle.dgmnList);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    // TODO - I need to figure out how to see inside the callback passed into here...
    test('Loading Battle Images should trigger loadBattleImages on finish', () =>{
      let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);

      let spy = jest.spyOn(mockBattle, 'loadImages');
      mockBattle.loadBattleImages( () => {} );
      
      expect(spy).toHaveBeenCalled();
    });
  });


  describe('Turn Order',()=>{
    let mockBattle;
    beforeEach(()=>{
      mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
    })
    
    test('With 1 Party Dgmn and 1 Enemy Dgmn, order should include 2 Dgmn',()=>{
      let mockOrder = mockBattle.setupOrder();
      expect(mockOrder.length).toBe(2);
    });

    test('With 1 Party Dgmn and 1 Enemy Dgmn, order should have fastest Dgmn first',()=>{
      // Set Party Dgmn to be MUCH faster than the Enemy Dgmn
      mockBattle.dgmnList[0].currStats[7] = 100;
      mockBattle.enemyDgmnList[0].currStats[7] = 1;

      let mockOrder = mockBattle.setupOrder();

      expect(mockOrder[0]).toEqual(mockBattle.dgmnList[0]);
    });

    test('If both Dgmn have the same speed, and 1 has a Speed buff, that buffed Dgmn should be first',()=>{
      // Set both Dgmn to same Speed, but buff the Enemy Dgmn
      mockBattle.dgmnList[0].currStats = [1,1,1,1,1,1,1,10];
      mockBattle.enemyDgmnList[0].currStats = [1,1,1,1,1,1,1,10];
      mockBattle.enemyDgmnList[0].currBuffs[7] = 2;

      let mockOrder = mockBattle.setupOrder();

      expect(mockOrder[0]).toEqual(mockBattle.enemyDgmnList[0]);
    });
  });


  describe('Dealing Damage',()=>{
    let mockBattle;
    beforeEach(()=>{
      jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
      mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
    });
    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('Equal Stats, No Buffs, No Mods',()=>{
      let mockAttacker = new Dgmn(0,'FLARE','Agu',0,false);
          mockAttacker.level = 5;
          mockAttacker.currStats = [10,10,10,10,10,10,10,10];
      let mockTarget = new Dgmn(1,'BLAST','Gabu',0,true);
          mockTarget.currStats = [10,10,10,10,10,10,10,10];
      let mockAttack = new Attack('babyFlame');
      
      // Damage Calculation Breakdown
      //   (  10 / 10  ) * (  5 / 2 ) * 1.125 = 1 * 2.5 * 1.125 = 2.8125 = 2
      let damage = mockBattle.calculateDamage(mockAttacker,mockTarget,mockAttack,1,1,1);

      expect(damage).toBe(3); // Random = 1 | 2 + 1 = 3
    });

    test('Attacker has double the ATK, No Buffs, No Mods',()=>{
      let mockAttacker = new Dgmn(0,'FLARE','Agu',0,false);
          mockAttacker.level = 5;
          mockAttacker.currStats = [10,20,10,10,10,10,10,10];
      let mockTarget = new Dgmn(1,'BLAST','Gabu',0,true);
          mockTarget.currStats = [10,10,10,10,10,10,10,10];
      let mockAttack = new Attack('babyFlame');
      
      // Damage Calculation Breakdown
      //   (  20 / 10  ) * (  5 / 2 ) * 1.125 = 2 * 2.5 * 1.125 = 5.625 = 5
      let damage = mockBattle.calculateDamage(mockAttacker,mockTarget,mockAttack,1,1,1);

      expect(damage).toBe(6); // Random = 1 | 5 + 1 = 6
    });

    test('Defender has double the DEF, No Buffs, No Mods',()=>{
      let mockAttacker = new Dgmn(0,'FLARE','Agu',0,false);
          mockAttacker.level = 5;
          mockAttacker.currStats = [10,10,10,10,10,10,10,10];
      let mockTarget = new Dgmn(1,'BLAST','Gabu',0,true);
          mockTarget.currStats = [10,10,20,10,10,10,10,10];
      let mockAttack = new Attack('babyFlame');
      
      // Damage Calculation Breakdown
      //   (  10 / 20  ) * (  5 / 2 ) * 1.125 = 2 * 2.5 * 1.125 = 1.40625 = 1
      let damage = mockBattle.calculateDamage(mockAttacker,mockTarget,mockAttack,1,1,1);

      expect(damage).toBe(2); // Random = 1 | 1 + 1 = 2
    });
  });

  describe('Battle Effects',()=>{

    describe('Buff/Debuff',()=>{

      let mockInflictStatus = jest.fn();
      let mockSetEffectBottomInfo = jest.fn();
      jest.mock( "../../src/classes/menu/battle-menu", () => {
        return jest.fn().mockImplementation(() => {
          return {
            inflictStatus: mockInflictStatus,
            setEffectBottomInfo: mockSetEffectBottomInfo
          };
        });
      });

      afterEach(()=>{
        fakeDgmn.currBuffs = [0,1,1,1,1,1,1,1];
        fakeEnemyDgmn.currBuffs = [0,1,1,1,1,1,1,1];
        jest.clearAllMocks();
      })

      test('Handle Effect will send to the buffStat if Attack has Buff effect',()=>{
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        let spyBuff = jest.spyOn(mockBattle,'buffStat').mockReturnValue('yes');
        let spyFinish = jest.spyOn(mockBattle,'finishAttack').mockImplementation(()=>{});
        mockBattle.attackActions = { 0: { status: 'todo' } }
        mockBattle.handleEffect(['buff'],fakeDgmn,[fakeDgmn]);
        expect(spyBuff).toHaveBeenCalled();
      });

      test('Buffing stat will write to the Bottom Text Bar',()=>{
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        
        let spyBuff = jest.spyOn(mockBattle,'buffStat').mockReturnValue('');
        let spyFinish = jest.spyOn(mockBattle,'finishAttack').mockImplementation(()=>{});

        mockBattle.attackActions = { 0: { status: 'todo' } }
        mockBattle.handleEffect(['buff'],fakeDgmn,[fakeDgmn]);
        expect(mockSetEffectBottomInfo).toHaveBeenCalled();
      })

      // TODO - NOT SURE WHY I PUT THIS HERE...
      // test('Handle Effect will call Inflict Status if buff succeeds',()=>{
      //   let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
      //   let spyBuff = jest.spyOn(mockBattle,'buffStat').mockReturnValue('');
      //   let spyFinish = jest.spyOn(mockBattle,'finishAttack').mockImplementation(()=>{});

      //   mockBattle.attackActions = { 0: { status: 'todo' } }
      //   mockBattle.handleEffect(['buff'],fakeDgmn,[fakeDgmn]);
      //   expect(mockInflictStatus).toHaveBeenCalled();
      // });

      // test('Handle Effect will not call Inflict Status if buff misses',()=>{
      //   let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
      //   let spyBuff = jest.spyOn(mockBattle,'buffStat').mockReturnValue('missed');
      //   let spyFinish = jest.spyOn(mockBattle,'finishAttack').mockImplementation(()=>{});

      //   mockBattle.attackActions = { 0: { status: 'todo' } }
      //   mockBattle.handleEffect(['buff'],fakeDgmn,[fakeDgmn]);
      //   expect(mockInflictStatus).not.toHaveBeenCalled();
      // });

      test('Buffing a stat by 1 stage will raise the stage by 1',()=>{
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        expect(fakeDgmn.currBuffs[1]).toBe(1);
        mockBattle.buffStat(fakeDgmn,100,1,1);
        expect(fakeDgmn.currBuffs[1]).toBe(2);
      });

      test('Buffing a stat by 1 when already at 3 buffs will not succeed',()=>{
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        fakeDgmn.currBuffs[1] = 4;
        expect(fakeDgmn.currBuffs[1]).toBe(4);
        mockBattle.buffStat(fakeDgmn,100,1,1);
        expect(fakeDgmn.currBuffs[1]).toBe(4);
      })
    })
  })

  describe('Combos',()=>{
    let mockBattle;
    beforeEach(()=>{
      mockBattle = new Battle([],[],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
    });
    test('When Target is not Weak to the Attack, Combo should go up by 1',()=>{
      let prevCombo = fakeEnemyDgmn.currCombo;
      mockBattle.calculateCombo(fakeEnemyDgmn,1);
      let newCombo = fakeEnemyDgmn.currCombo;

      expect(newCombo - prevCombo).toBe(1);
    });

    test('When Target is Weak to the Attack, Combo should go up by 2',()=>{
      let prevCombo = fakeEnemyDgmn.currCombo;
      mockBattle.calculateCombo(fakeEnemyDgmn,2);
      let newCombo = fakeEnemyDgmn.currCombo;

      expect(newCombo - prevCombo).toBe(2);
    });

    test('When Target is in Weakened state, Combo should go up by 2',()=>{
      let prevCombo = fakeEnemyDgmn.currCombo;
      fakeEnemyDgmn.weakenedState[0] = true;
      mockBattle.calculateCombo(fakeEnemyDgmn,1);
      let newCombo = fakeEnemyDgmn.currCombo;

      expect(newCombo - prevCombo).toBe(2);
    });

    test('When Target is in Weakened state and is Weak to the Attack, Combo should go up by 2',()=>{
      let prevCombo = fakeEnemyDgmn.currCombo;
      fakeEnemyDgmn.weakenedState[0] = true;
      mockBattle.calculateCombo(fakeEnemyDgmn,2);
      let newCombo = fakeEnemyDgmn.currCombo;

      expect(newCombo - prevCombo).toBe(3);
    });
  });

  describe("End of Battle",()=>{
    describe("Resetting Weakened",()=>{
      test('A Dgmn with only 1 Weakned State Mark will return to not Weakened after a Turn',()=>{
        fakeEnemyDgmn.weakenedState = [true,1];
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        let spy = jest.spyOn(mockBattle,'fetchImage').mockReturnValue(new Image(64,64));
        expect(fakeEnemyDgmn.weakenedState[0]).toBe(true);
        mockBattle.resetWeakened([fakeDgmn,fakeEnemyDgmn]);
        expect(fakeEnemyDgmn.weakenedState[0]).toBe(false);
      });
    });
    
    describe("Resetting Combos",()=>{
      test('A Dgmn with a 3 Combo will return to 0 after a Turn',()=>{
        fakeEnemyDgmn.currCombo = 3;
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        let spy = jest.spyOn(mockBattle,'fetchImage').mockReturnValue(new Image(64,64));
        expect(fakeEnemyDgmn.currCombo).toBe(3);
        mockBattle.resetCombos([fakeDgmn,fakeEnemyDgmn]);
        expect(fakeEnemyDgmn.currCombo).toBe(0);
      })

      test('A Dead Dgmn will reset to a 0 Combo after a Turn',()=>{
        fakeEnemyDgmn.currCombo = 5;
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        let spy = jest.spyOn(mockBattle,'fetchImage').mockReturnValue(new Image(64,64));
        expect(fakeEnemyDgmn.currCombo).toBe(5);
        fakeEnemyDgmn.isDead = true;
        mockBattle.resetCombos([fakeDgmn,fakeEnemyDgmn]);
        expect(fakeEnemyDgmn.currCombo).toBe(0);
      })
    });

    describe("Resetting Defend",()=>{
      test('Any Dgmn should have their Defense Status reset after a turn',()=>{
        let mockBattle = new Battle([fakeDgmn],[fakeEnemyDgmn],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
        fakeDgmn.isDefending = true;
        mockBattle.resetDefend([fakeDgmn,fakeEnemyDgmn]);
        expect(fakeDgmn.isDefending).toBeFalsy();
      })
    });
  }); // END OF BATTLE

  describe("Knock Out",()=>{
    afterEach(()=>{
      fakeDgmn.isDead = false;
    });

    test('A Dgmn with Zero HP will be set to Dead',()=>{
      let mockBattle = new Battle([fakeDgmn],[],emptyFunc,emptyFunc,emptyFunc,emptyFunc,emptyFunc);
      fakeDgmn.initBattleCanvas(()=>{},[]); // Must fake in order to avoid being undefined
      expect(fakeDgmn.isDead).toBeFalsy();
      mockBattle.knockOut(fakeDgmn);
      expect(fakeDgmn.isDead).toBeTruthy();
    })
  })
});
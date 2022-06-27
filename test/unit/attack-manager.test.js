import AttackManager from '../../src/classes/battle/attack-manager';

describe('Attack Manager',()=>{
  let mockAttackManager = new AttackManager();
  describe('Combo',()=>{
    test('With no Modifiers, Combo Delta will be 1',()=>{
      let comboDelta = mockAttackManager.getComboDelta();
      expect(comboDelta).toBe(1);
    })

    test('With a STRONG attack, Combo Delta will be 2',()=>{
      let comboDelta = mockAttackManager.getComboDelta(1.125);
      expect(comboDelta).toBe(2);
    })

    test('With a WEAK attack, Combo Delta will be 0',()=>{
      let comboDelta = mockAttackManager.getComboDelta(.75);
      expect(comboDelta).toBe(0);
    })

    test('On a WEAKENED target, Combo Delta will be 2',()=>{
      let comboDelta = mockAttackManager.getComboDelta(1,true);
      expect(comboDelta).toBe(2);
    })

    test('On a WEAKENED target hit by a STRONG attack, Combo Delta will be 3',()=>{
      let comboDelta = mockAttackManager.getComboDelta(1.125,true);
      expect(comboDelta).toBe(3);
    })

    test('On a WEAKENED target hit by a WEAK attack, Combo Delta will be 0',()=>{
      let comboDelta = mockAttackManager.getComboDelta(.25,true);
      expect(comboDelta).toBe(0);
    })

    test('Calculating Combo with no modifiers will increase combo value by 1',()=>{
      let prevCombo = 0;
      let newCombo = mockAttackManager.calculateCombo(prevCombo);
      expect(newCombo).toBe(prevCombo+1);
    })

    test('With a STRONG attack will increase combo value by 2',()=>{
      let prevCombo = 0;
      let newCombo = mockAttackManager.calculateCombo(prevCombo,1.125);
      expect(newCombo).toBe(prevCombo+2);
    })

    test('With a WEAK attack combo value will not increase',()=>{
      let prevCombo = 0;
      let newCombo = mockAttackManager.calculateCombo(prevCombo,.75);
      expect(newCombo).toBe(prevCombo);
    })
    
  })
})
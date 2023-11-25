import { getAutoAdvanceDelay, AUTO_ADVANCE_DELAY_DEFAULT, AUTO_ADVANCE_DELAY_PER_CHAR, WARNING_TXT_MESSAGE_MISSING } from "../../../src/utils/text.util";
import { warningLog } from "../../../src/utils/log-utils";

jest.mock('../../../src/utils/log-utils',(()=> {
  return {
    ...jest.requireActual('../../../src/utils/log-utils'),
    warningLog: jest.fn()
  }
}));

describe('Text Utilities',()=>{
  describe('Auto Advance Delay',()=>{
    test('Message with 1 character and no delay will take 1 char increment longer than the delay default',()=>{
      expect( getAutoAdvanceDelay('A') ).toBe(AUTO_ADVANCE_DELAY_PER_CHAR + AUTO_ADVANCE_DELAY_DEFAULT);
    });
  
    test('Message with 2 characters and no delay will take 2 char increments longer than the delay default',()=>{
      expect( getAutoAdvanceDelay('AB') ).toBe((AUTO_ADVANCE_DELAY_PER_CHAR * 2) + AUTO_ADVANCE_DELAY_DEFAULT)
    });
  
    test('Message with 3 characters and no delay will take 3 char increments longer than the delay default',()=>{
      expect( getAutoAdvanceDelay('ABC') ).toBe((AUTO_ADVANCE_DELAY_PER_CHAR * 3) + AUTO_ADVANCE_DELAY_DEFAULT)
    });
  
    test('Message with 5 characters and no delay will take 5 char increments longer than the delay default',()=>{
      expect( getAutoAdvanceDelay('ABCDE') ).toBe((AUTO_ADVANCE_DELAY_PER_CHAR * 5) + AUTO_ADVANCE_DELAY_DEFAULT)
    });
  
    test('Message with 10 characters and no delay will take 10 char increments longer than the delay default',()=>{
      expect( getAutoAdvanceDelay('ABCDEFGHIJ') ).toBe((AUTO_ADVANCE_DELAY_PER_CHAR * 10) + AUTO_ADVANCE_DELAY_DEFAULT)
    });
  
    test('Message with 30 characters and no delay will take 30 char increments longer than the delay default',()=>{
      expect( getAutoAdvanceDelay('ABCDEFGHIJKLMNOPQRSTUVWXYZABCD') ).toBe((AUTO_ADVANCE_DELAY_PER_CHAR * 30) + AUTO_ADVANCE_DELAY_DEFAULT)
    });
  
    test('Message with 1 character and a delay will take 1 char increment longer than the passed-in delay',()=>{
      expect( getAutoAdvanceDelay('A',3000) ).toBe(AUTO_ADVANCE_DELAY_PER_CHAR + 3000);
    });
  
    test('Message with 5 character and a delay will take 5 char increment longer than the passed-in delay',()=>{
      expect( getAutoAdvanceDelay('ABCDE',5000) ).toBe((AUTO_ADVANCE_DELAY_PER_CHAR * 5) +  5000);
    });
  
    test('Undefined Message will log a warning',()=>{
      getAutoAdvanceDelay(undefined);
      expect(warningLog).toHaveBeenCalledWith(WARNING_TXT_MESSAGE_MISSING);
    });
  
    test('Undefined Message will return the delay',()=>{
      const MOCK_DELAY = getAutoAdvanceDelay(undefined);
      expect(MOCK_DELAY).toBe(AUTO_ADVANCE_DELAY_DEFAULT);
    });
  });
});

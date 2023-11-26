import 'jest-canvas-mock';
import BossVictoryMenu, { REWARD_SELECTED_MESSAGES } from "../../../../src/classes/menu/boss-victory-menu";

const EMPTY_FN = () => {};

jest.mock('../../../../src/classes/text-area', () => {
  return jest.fn().mockImplementation(()=>({
    instantText: EMPTY_FN,
    timedText: jest.fn()
  }))
});

describe('Boss Victory Menu',()=>{
  test('Passing in the Current Floor correctly sets the property',()=>{ // TODO - Delete, just testing
    const MOCK_BOSS_VICTORY_MENU = new BossVictoryMenu(3);
    expect(MOCK_BOSS_VICTORY_MENU.currFloor).toBe(3);
  });

  test('When passing in the default List, List should be drawn correctly',()=>{
    let bvm = new BossVictoryMenu(3);
      bvm.listItems = ['fp','xp','en'];
      bvm.drawIcon = jest.fn();
      bvm.drawList();

    // Checking for 25 instead of 24, because after they are all drawn, it draws the currently selected icon
    expect(bvm.drawIcon).toHaveBeenCalledTimes(25);
  });

  test('Drawing the menu while FP was selected will draw the FP Popup',()=>{
    let bvm = new BossVictoryMenu(3);
        bvm.drawFPMenu = jest.fn();
        bvm.fetchImageCB = EMPTY_FN;
        bvm.redrawParentCB = EMPTY_FN;
        bvm.drawIcon = EMPTY_FN;
        bvm.inFPSelection = true;
        bvm.drawMenu();

    expect(bvm.drawFPMenu).toHaveBeenCalled();
  });

  test('Selecting FP will properly set the FP Selection property, then redraw',()=>{
    let bvm = new BossVictoryMenu(3);
        bvm.drawMenu = jest.fn();
        bvm.redrawParentCB = jest.fn();
        bvm.launchFPSelection();

    expect(bvm.inFPSelection).toBeTruthy();
    expect(bvm.drawMenu).toHaveBeenCalled();
  });

  describe('Navigation',()=>{
    describe('Previous',()=>{
      test('Hitting Up when at the first item will not change the index',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
        expect(bvm.currIndex).toBe(0);
        bvm.prevChoice();
        expect(bvm.currIndex).toBe(0);
      });
  
      test('Hitting Up when at the second item will change the index to one lower',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
            bvm.currIndex = 1;
        bvm.prevChoice();
        expect(bvm.currIndex).toBe(0);
      });
  
      test('Hitting Up when in the FP Selection and at DR will not change the FP Selection Index',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
            bvm.drawFPMenu = EMPTY_FN;
            bvm.inFPSelection = true;
        expect(bvm.FPIndex).toBe(0);
        bvm.prevChoice();
        expect(bvm.FPIndex).toBe(0);
      });
  
      test('Hitting Up when in the FP Selection and at NS will change the FP Selection Index',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
            bvm.drawFPMenu = EMPTY_FN;
            bvm.inFPSelection = true;
            bvm.FPIndex = 1;
        bvm.prevChoice();
        expect(bvm.FPIndex).toBe(0);
      });
    });

    describe('Next',()=>{
      test('Hitting Down when at the last item will not change the index',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.listItems = ['fp','xp','en'];
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
            bvm.currIndex = 2;
        bvm.nextChoice();
        expect(bvm.currIndex).toBe(2);
      });

      test('Hitting Down when at the first item will change the index to one higher',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.listItems = ['fp','xp','en'];
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
        expect(bvm.currIndex).toBe(0);
        bvm.nextChoice();
        expect(bvm.currIndex).toBe(1);
      });

      test('Hitting Down when in the FP Selection and at VB will not change the FP Selection Index',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
            bvm.drawFPMenu = EMPTY_FN;
            bvm.inFPSelection = true;
            bvm.FPIndex = 7;
        bvm.nextChoice();
        expect(bvm.FPIndex).toBe(7);
      });

      test('Hitting Down when in the FP Selection and at DR will change the FP Selection Index',()=>{
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.redrawParentCB = EMPTY_FN;
            bvm.drawFPMenu = EMPTY_FN;
            bvm.inFPSelection = true;
        expect(bvm.FPIndex).toBe(0);
        bvm.nextChoice();
        expect(bvm.FPIndex).toBe(1);
      });
    });

    describe('Select',()=>{
      test('Selecting XP Boost will display the XP Message, then call the onDone callback',()=>{
        jest.useFakeTimers();
        const MOCK_CB = jest.fn();
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.currIndex = 1;
            bvm.selectChoice(MOCK_CB)
        expect(bvm.infoTxt.timedText).toHaveBeenCalledWith(expect.anything(), REWARD_SELECTED_MESSAGES[1], expect.anything());
        jest.runAllTimers();
        expect(MOCK_CB).toHaveBeenCalled();
      });

      test('Selecting EN Boost will display the EN Message, then call the onDone callback',()=>{
        jest.useFakeTimers();
        const MOCK_CB = jest.fn();
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.currIndex = 2;
            bvm.selectChoice(MOCK_CB)
        expect(bvm.infoTxt.timedText).toHaveBeenCalledWith(expect.anything(), REWARD_SELECTED_MESSAGES[2], expect.anything());
        jest.runAllTimers();
        expect(MOCK_CB).toHaveBeenCalled();
      });

      test('Selecting FP Boost will launch the FP Menu and will not call the onDone callback',()=>{
        jest.useFakeTimers();
        const MOCK_CB = jest.fn();
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.launchFPSelection = jest.fn();
            bvm.selectChoice(MOCK_CB);
        expect(bvm.launchFPSelection).toHaveBeenCalled();
        expect(MOCK_CB).not.toHaveBeenCalled();
      });

      test('Selecting specific FP will display the FP Message, then call the onDone callback',()=>{
        jest.useFakeTimers();
        const MOCK_CB = jest.fn();
        let bvm = new BossVictoryMenu(3);
            bvm.drawIcon = EMPTY_FN;
            bvm.inFPSelection = true;
            bvm.selectChoice(MOCK_CB);
        expect(bvm.infoTxt.timedText).toHaveBeenCalledWith(expect.anything(), 'Permanently gained 1 DR FP!', expect.anything());
        jest.runAllTimers();
        expect(MOCK_CB).toHaveBeenCalled();
      });

    });
  });
});

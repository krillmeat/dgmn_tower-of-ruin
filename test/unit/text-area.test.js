import 'jest-canvas-mock';
import TextArea from "../../src/classes/text-area";
import Menu from '../../src/classes/menu';
import MenuUtility from "../../src/classes/menu/menu.util"

describe('Text Area',()=>{
  let mockTextArea;;
  test('Splitting a message will return the same message in an array',()=>{
    mockTextArea = new TextArea(20);
    let mockMessage = "hello world";
    let expectedMessageArray = ["h","e","l","l","o"," ","w","o","r","l","d"];
    expect(mockTextArea.splitMessage(mockMessage)).toEqual(expectedMessageArray);
  });

  test('Replacing characters will return the message with those characters swapped out',()=>{
    mockTextArea = new TextArea(20);
    let mockMessage = "agu.MON";
    let expectedMessage = "agu^ON";
    expect(mockTextArea.replaceSpecialCharacters(mockMessage)).toEqual(expectedMessage);
  });

  test('Returning special characters will modify the Char Array with object-name characters',()=>{
    mockTextArea = new TextArea(20);
    let mockCharArray = ["a","g","u","^","O","N"];
    let expectedCharArray = ["a","g","u","dotM","O","N"];
    expect(mockTextArea.returnSpecialCharacters(mockCharArray)).toEqual(expectedCharArray);
  })

  test('Creating a Char Array will do all of the necessary conversions for a Message',()=>{
    mockTextArea = new TextArea(20);
    let mockMessage = "agu.MON hi";
    let expectedCharArray = ["a","g","u","dotM","O","N","space","h","i"];
    expect(mockTextArea.createCharArray(mockMessage)).toEqual(expectedCharArray);
  })

  describe('Colorizing',()=>{
    beforeEach(()=>{
    })
    test('No callback should always be the base color',()=>{
      mockTextArea = new TextArea(0,0,5,1,null);
      expect(mockTextArea.colorizeCB('A')).toEqual('none');
    })

    test('Callback with modified character should return the new color',()=>{
      let mockColorize = char => {
        return char === 'A' ? 'white' : 'none'
      }
      mockTextArea = new TextArea(0,0,5,1,mockColorize);
      expect(mockTextArea.colorizeCB('A')).toEqual('white');
    })
  })

  describe('Character Coordinates',()=>{
    beforeEach(()=>{
      mockTextArea = new TextArea(5);
    })
    test('AaZz',()=>{
      expect(mockTextArea.getCharCoordinates("A")).toEqual([0,0]);
      expect(mockTextArea.getCharCoordinates("a")).toEqual([0,2]);
      expect(mockTextArea.getCharCoordinates("Z")).toEqual([7,1]);
      expect(mockTextArea.getCharCoordinates("z")).toEqual([7,3]);
    })
  })

  test('String with no Zeros and not at max length will have a zeros added to the front',()=>{
    let mockMenuUtility = new MenuUtility();
    let mockNumber = 11;
    expect(mockMenuUtility.prependZeros(mockNumber,4)).toEqual("0011");
  })
})
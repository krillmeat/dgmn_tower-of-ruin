import TreasureUtility from '../../src/classes/dungeon/utility/treasure.util';

/**------------------------------------------------------------------------
 * TEST NOTES
 * ------------------------------------------------------------------------
 * - For Boosting Rarity, Math.random is x2 [false < .5 < true]
 * ----------------------------------------------------------------------*/

describe('Treasure Utility',()=>{
    let mockTreasureUtility = new TreasureUtility();

    describe('Rarity',() => {
        describe('Calculating',()=>{
            afterEach(()=>{
                jest.spyOn(global.Math, 'random').mockRestore();
            })

            test('An item found on Floor 1 should always be Common (if not Boosted)',()=>{
                let mockRarity = mockTreasureUtility.getRarity(1);
                expect(mockRarity).toEqual('common');
                mockRarity = mockTreasureUtility.getRarity(1); // Check twice for consistency
                expect(mockRarity).toEqual('common');
            });
            test('An item found on Floor 6 has a 90% chance of being Common',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.89);
                let mockRarity = mockTreasureUtility.getRarity(6);
                expect(mockRarity).toEqual('common');
            })
            test('An item found on Floor 6 has a 10% chance of being Uncommon',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
                let mockRarity = mockTreasureUtility.getRarity(6);
                expect(mockRarity).toEqual('uncommon');
            })
            test('An item found on Floor 11 has an 80% chance of being Common',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.79);
                let mockRarity = mockTreasureUtility.getRarity(11);
                expect(mockRarity).toEqual('common');
            })
            test('An item found on Floor 11 has a 15% chance of being Uncommon',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
                let mockRarity = mockTreasureUtility.getRarity(11);
                expect(mockRarity).toEqual('uncommon');
            })
            test('An item found on Floor 11 has a 5% chance of being Rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.96);
                let mockRarity = mockTreasureUtility.getRarity(11);
                expect(mockRarity).toEqual('rare');
            })
            test('An item found on Floor 21 has a 70% chance of being Common',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.69);
                let mockRarity = mockTreasureUtility.getRarity(21);
                expect(mockRarity).toEqual('common');
            })
            test('An item found on Floor 21 has a 20% chance of being uncommon',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.89);
                let mockRarity = mockTreasureUtility.getRarity(21);
                expect(mockRarity).toEqual('uncommon');
            })
            test('An item found on Floor 21 has a 10% chance of being rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
                let mockRarity = mockTreasureUtility.getRarity(21);
                expect(mockRarity).toEqual('rare');
            })
            test('An item found on Floor 31 has a 60% chance of being common',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.59);
                let mockRarity = mockTreasureUtility.getRarity(31);
                expect(mockRarity).toEqual('common');
            })
            test('An item found on Floor 31 has a 25% chance of being uncommon',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.84);
                let mockRarity = mockTreasureUtility.getRarity(31);
                expect(mockRarity).toEqual('uncommon');
            })
            test('An item found on Floor 31 has a 10% chance of being rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.94);
                let mockRarity = mockTreasureUtility.getRarity(31);
                expect(mockRarity).toEqual('rare');
            })
            test('An item found on Floor 31 has a 5% chance of being extra rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
                let mockRarity = mockTreasureUtility.getRarity(31);
                expect(mockRarity).toEqual('extraRare');
            })
            test('An item found on Floor 41 has a 40% chance of being common',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.39);
                let mockRarity = mockTreasureUtility.getRarity(41);
                expect(mockRarity).toEqual('common');
            })
            test('An item found on Floor 31 has a 30% chance of being uncommon',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.69);
                let mockRarity = mockTreasureUtility.getRarity(41);
                expect(mockRarity).toEqual('uncommon');
            })
            test('An item found on Floor 31 has a 20% chance of being rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.89);
                let mockRarity = mockTreasureUtility.getRarity(41);
                expect(mockRarity).toEqual('rare');
            })
            test('An item found on Floor 31 has a 10% chance of being extra rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.91);
                let mockRarity = mockTreasureUtility.getRarity(41);
                expect(mockRarity).toEqual('extraRare');
            })
            test('An item found on Floor 51 has a 20% chance of being common',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.19);
                let mockRarity = mockTreasureUtility.getRarity(51);
                expect(mockRarity).toEqual('common');
            })
            test('An item found on Floor 51 has a 40% chance of being uncommon',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.59);
                let mockRarity = mockTreasureUtility.getRarity(51);
                expect(mockRarity).toEqual('uncommon');
            })
            test('An item found on Floor 51 has a 25% chance of being rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.84);
                let mockRarity = mockTreasureUtility.getRarity(51);
                expect(mockRarity).toEqual('rare');
            })
            test('An item found on Floor 51 has a 15% chance of being extra rare',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.86);
                let mockRarity = mockTreasureUtility.getRarity(51);
                expect(mockRarity).toEqual('extraRare');
            })
            test('If rarity should not be boosted, it will not call the boost rarity method',()=>{
                let mockBoost = jest.spyOn(mockTreasureUtility,'boostRarity');
                mockTreasureUtility.getRarity(1);
                expect(mockBoost).not.toHaveBeenCalled();
            })

            test('If rarity should be boosted, it will call the boost rarity method',()=>{
                let mockBoost = jest.spyOn(mockTreasureUtility,'boostRarity');
                mockTreasureUtility.getRarity(1,true);
                expect(mockBoost).toHaveBeenCalled();
            })

        });

        describe('Boosting',()=>{
            afterEach(()=>{
                jest.spyOn(global.Math, 'random').mockRestore();
            })
    
            test('Boosting Rarity will turn a Common to an Uncommon if successful',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
                let mockRarity = mockTreasureUtility.boostRarity('common');
                expect(mockRarity).toEqual('uncommon');
            });
    
            test('Boosting Rarity will turn an Uncommon to an Rare if successful',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
                let mockRarity = mockTreasureUtility.boostRarity('uncommon');
                expect(mockRarity).toEqual('rare');
            });
    
            test('Boosting Rarity will turn a Rare to an Extra Rare if successful',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
                let mockRarity = mockTreasureUtility.boostRarity('rare');
                expect(mockRarity).toEqual('extraRare');
            });
    
            test('Boosting Rarity will not change an Extra Rare, even if successful',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
                let mockRarity = mockTreasureUtility.boostRarity('extraRare');
                expect(mockRarity).toEqual('extraRare');
            });
    
            test('Boosting Rarity will not change the rarity if unsuccessful',()=>{
                jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
                let mockRarity = mockTreasureUtility.boostRarity('common');
                expect(mockRarity).toEqual('common');
            });
        });

    });

    // DGMN [ MEAT | ??? | TOILET ] | BEETLE [ ENG PACK | REPAIR PACK | AMMO ] | FP/XP BOOST
    describe('Get Item Type',()=>{
        afterEach(()=>{
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        test('Unaffected item calculation has a 45% chance to be a Meat Item',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.44);
            let mockItemType = mockTreasureUtility.getItemType();
            expect(mockItemType).toEqual("meat");
        })
        test('Unaffected item calculation has a 45% chance to be a Beetle Item',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.89);
            let mockItemType = mockTreasureUtility.getItemType();
            expect(mockItemType).toEqual("beetle");
        })
        test('Unaffected item calculation has a 10% chance to be an FP/XP Boost',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
            let mockItemType = mockTreasureUtility.getItemType();
            expect(mockItemType).toEqual("booster");
        })

        test('Modified item calculation has a 40% chance to automatically give you that item',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
            let mockItemType = mockTreasureUtility.getItemType('meat');
            expect(mockItemType).toEqual('meat');
        })
        test('Modified item calculation has a 60% chance to default to regular calculation',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.58);
            let mockItemType = mockTreasureUtility.getItemType('meat');
            expect(mockItemType).toEqual('beetle');
        })
    })

    describe('Get Booster Item',()=>{
        afterEach(()=>{
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        test('A Common Rarity Booster will give you an XS Booster',()=>{
            let mockBooster = mockTreasureUtility.getBoosterItemType('common');
            expect(mockBooster.indexOf("xs") === 0).toBeTruthy();
        })
        test('An Uncommon Rarity Booster will give you an S Booster',()=>{
            let mockBooster = mockTreasureUtility.getBoosterItemType('uncommon');
            expect(mockBooster.indexOf("s") === 0).toBeTruthy();
        })
        test('A Rare Rarity Booster will give you an M Booster',()=>{
            let mockBooster = mockTreasureUtility.getBoosterItemType('rare');
            expect(mockBooster.indexOf("m") === 0).toBeTruthy();
        })
        test('An Extra Rare Rarity Booster will give you an L Booster',()=>{
            let mockBooster = mockTreasureUtility.getBoosterItemType('extraRare');
            expect(mockBooster.indexOf("l") === 0).toBeTruthy();
        })

        test('A random of 0 will get you a Dragons Roar FP',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
            let mockBooster = mockTreasureUtility.getBoosterItemType('common');
            expect(mockBooster).toEqual('xsBoosterDR');
        })
        test('A random of 0 will get you an XP Booster',()=>{
            jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
            let mockBooster = mockTreasureUtility.getBoosterItemType('common');
            expect(mockBooster).toEqual('xsBoosterXP');
        })

    })
});
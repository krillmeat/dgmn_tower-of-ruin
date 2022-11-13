import {itemChart,itemsDB,rarityChartDB} from '../../data/items.db';

/**------------------------------------------------------------------------
 * TREASURE UTILITY
 * ------------------------------------------------------------------------
 * Handles the utilities of Treasure in a Dungeon
 * ------
 * A Utility is an action that always returns a value
 * It should never need to access more than a couple of params from the parent
 * This Class should handle the DB, and no other Class should import the DB directly
 * ----------------------------------------------------------------------*/
class TreasureUtility{
    constructor(){ /* Utilities Have No Constructors */ }

    /**------------------------------------------------------------------------
    * GET RARITY
    * ------------------------------------------------------------------------
    * Determines the rarity of an Item
    * ------------------------------------------------------------------------
    * @param {Number}   floorNumber     The current Floor Number
    * @param {Boolean}  isRarityBoosted Dungeon mod to make items rarer
    * @returns {String} Rarity of the item [common|uncommon|rare|extraRare]
    * ----------------------------------------------------------------------*/
    getRarity = (floorNumber, isRarityBoosted = false) => {
        let rarity = 'common';
        if(floorNumber > 5){ // All floors 5 and below are common items always
            if(floorNumber > 50){ // TODO - Floor Rarity should go higher
                let rando = Math.floor(Math.random() * 100); // Range = 20% C | 40% U | 25% R | 15% ER  
                if(rando >= 85){ rarity = 'extraRare';
                } else if(rando >= 60){ rarity = 'rare';
                } else if(rando >= 20){ rarity = 'uncommon'; }
            } else if(floorNumber > 40){
                let rando = Math.floor(Math.random() * 100); // Range = 40% C | 30% U | 20% R | 10% ER
                if(rando >= 90){ rarity = 'extraRare';
                } else if(rando >= 70){ rarity = 'rare';
                } else if(rando >= 40){ rarity = 'uncommon'; }
            } else if(floorNumber > 30){
                let rando = Math.floor(Math.random() * 100); // Range = 60% C | 25% U | 10% R | 5% ER
                if(rando >= 95){ rarity = 'extraRare'; 
                } else if(rando >= 85){ rarity = 'rare';
                } else if(rando >= 60){ rarity = 'uncommon'; }
            } else if(floorNumber > 20){
                let rando = Math.floor(Math.random() * 100); // Range = 70% C | 20% U | 10% R
                if(rando >= 90){ rarity = 'rare';
                } else if(rando >= 70){ rarity = 'uncommon'; } 
            } else if(floorNumber > 10){
                let rando = Math.floor(Math.random() * 100); // Range = 80% C | 15% U | 5% R
                if(rando >= 95){ rarity = 'rare';
                } else if(rando >= 80 ){ rarity = 'uncommon'; }
            } else{ // Floors 6-10
                if(Math.floor(Math.random() * 10) === 9){ rarity = 'uncommon'; } // Range = 90% Common | 10% Uncommon
            }
        }

        rarity = isRarityBoosted ? this.boostRarity(rarity) : rarity;

        return rarity;
    }

   /**------------------------------------------------------------------------
    * BOOST RARITY
    * ------------------------------------------------------------------------
    * Has a 50% chance to make an Item Rarer
    * ------------------------------------------------------------------------
    * @param {String} rarity Rarity of the item [common|uncommon|rare|extraRare]
    * @returns {Boolean} Rarity should be boosted or not
    * ----------------------------------------------------------------------*/
    boostRarity = rarity => {
        if(Math.floor(Math.random() * 2) === 1 && rarity !== 'extraRare'){
            return rarityChartDB[rarityChartDB.indexOf(rarity)+1];
        } return rarity;
    }

    /**------------------------------------------------------------------------
    * GET ITEM TYPE
    * ------------------------------------------------------------------------
    * Determines the type of item you get
    * ------------------------------------------------------------------------
    * @param {String} modifier  Adjusts the rates of Item Types
    * @returns {String} Type of Item Generated
    * ----------------------------------------------------------------------*/
    getItemType = (modifier = 'none') => {
        let itemType = 'none';
        let rando = Math.floor(Math.random() * 100);

       if(modifier !== 'none' && Math.floor(Math.random() * 10 ) > 6){
           return modifier;
       }

        if(rando >= 90){ itemType = 'booster'; 
        } else if(rando >= 45){ itemType = 'beetle'; 
        } else if(rando < 45){ itemType = 'meat'; }

        return itemType;
    }

    getItem = (rarity,type) => {
      let itemOptions = itemChart[type][rarity];
      let rando = Math.floor(Math.random() * itemOptions.length);
      return itemOptions[rando];
    }

    getTreasureById = (id,treasures) => {
      for(let treasure of treasures){
        if(treasure?.id === parseInt(id)) return treasure;
      }
      return {};
    }

    getItemEffect = item => { return itemsDB[item].effect }

    getTreasureName = treasure => { return itemsDB[treasure].displayName }
    isTreasureUsable = (treasure,location) => { return itemsDB[treasure].usable.indexOf(location) !== -1 }
    getItemTarget = treasure => { return itemsDB[treasure].target }
    getItemDescription = treasure => { return itemsDB[treasure].description }
}

export default TreasureUtility;
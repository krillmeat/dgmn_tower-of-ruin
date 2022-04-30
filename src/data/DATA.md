# DATA
There is a _lot_ of Data in this game. All of the files in this Directory contain all of the various information the game.
Databases should _never_ be consumed directly by any of the generic Classes. All consumers of these Databases are Utility Classes, that can be imported into any other Class to access the data.

## DATABASES
"Databases" is a loose term. Each Database is just a standard JS `const`. But below is a table for all of the "databases" and what they service.

| DATABASE  | DESCRIPTION | CONSUMERS |
| --------- | ----------- | --------- |
| DGMN      | Knows all stats, basic values, attacks, evolutions, etc. for a DGMN Species. Does _*not*_ contain any DGMN attributes that can change | DgmnManager |
| DUNGEON   | Floor Layouts and Room Layouts. Also includes Comments on the Numbers used in the matrices | Dungeon - Floor - Room |
| FONT      | Anything related to Type. Mostly used by the Canvases to locate the proper Sprite coordinates for specific characters | TextArea |
| IMAGES    | Strings of all of the paths for basic images. Does not include dynamic images, like Dungeon Tiles, DGMN Sprites, or Attack Frames | All over |
| ITEMS     | Items used by the DigiBeetle. Also includes charts for things like Rarity or Type of Item | Floor - DigiBeetle |
| RANKS     | Various parts of the Game use a lettered ranking system (F - S). This data converts them into useable numbers where needed | AttackManager |

### DGMN
This is the biggest and most complex of all of the Databases. Hundreds of DGMN with a very large amount of Data to each of them.
_This Data is still very much in flux_

#### CODE EXAMPLE
```
Agu: {
    stage: 3, class: 'vaccine', crests: [0],
    stats: [5,5,4,3,4,4,4,3],
    evolutions: evolutions['agu'],
    types: {fire: .5, water: 1.5, plant: .75, evil: 2}
  },
```
#### PROPERTIES
| PROP       | TYPE   | EXAMPLE   | DESCRIPTION |
| ---------- | ------ | --------- | ----------- |
| STAGE      | Number | 1 - 7     | The current Evolutionary Stage. The Number goes from 1 - 7, check the *RANKS DATA* to see their corresponding String value |
| ATTRIBUTE  | String | Vaccine/Data/Virus/Free | Every DGMN has 1 of the 4 Attributes (I've excluded Variable and Unknown) |
| FIELDS     | Array:String | \['DR','VB'\] | Includes all of the Fields the DGMN is a part of. Check Note<sup>1</sup> below this table for the list of all of the Fields |
| STATS      | Array:Number | \[2,3,2,3,5,3,2,1\] | _I need to replace this with an Object, I do not like Arrays like this_ |
| EVOLUTIONS | Object       | ... | _I don't know about this one yet_ |
| TYPES      | Object       | { fire: .5 , water: 1.5 } | Object containing Types as Keys and Numbers for values that represent the DMG Modifier when being attacked. This Object _only_ contains Types affected, all other Types are treated as 1 |

<sup>1</sup> The fields (and labels) are as follows: Dragons Roar (DR), Nature Spirits (NS), Wind Guardians (WG), Deep Savers (DS), Jungle Troopers (JT), Metal Empire (ME), Virus Busters (VB), and Nightmare Army (NA). Nightmare Army is officially Nightmare Soldiers, but the abbrieviation collides with Nature Spirits, so I chaned it. There are no Dark Area or Unknown Fields.


### DUNGEON
_To be added_

### FONT
_To be added_

### IMAGES
_To be added_
# GAME
If this System Class is a Digital Representation of a Physical System, imagine that the Game Class is a Game Cartridge.  
The Game Class handles everything pertaining to the game "Digimon - Tower of Ruin". If it's specific to the game itself, it lives under this Class.

## PROPS
`systemAH` - Action Handler for the System

## EXPORTED METHODS
These Methods are accessible to any other Class that uses the **Game Action Handler**


`addToObjectList(newObject)`  
Used heavily to add Canvases of Classes so they can be drawn to the System Screen

`drawGameScreen`  
Triggers a Canvas Paint of every object in the Object List

`startBattle()`  
Gathers up needed data and starts a battle.

`endBattle()`  
Ends a Battle and gets things back to the proper Dungeon State

`buildDungeon()`  
Gathers up needed data and creates a new Dungeon

`getDgmnParty()`  
Gets the DGMN party passed in from the DGMN Manager  
_Not sure this is a good thing, need to look into it..._

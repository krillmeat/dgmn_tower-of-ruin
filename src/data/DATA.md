# DATA
There is a _lot_ of Data in this game. All of the files in this Directory contain all of the various information the game.
Databases should _never_ be consumed directly by any of the generic Classes. All consumers of these Databases are Utility Classes, that can be imported into any other Class to access the data.

## DATABASES
"Databases" is a loose term. Each Database is just a standard JS `const`. But below is a table for all of the "databases" and what they service.

| DATABASE  | DESCRIPTION | CONSUMERS |
| --------- | ----------- | --------- |
| DGMN      | Knows all stats, basic values, attacks, evolutions, etc. for a DGMN Species. Does *not* contain any DGMN attributes that can change | DgmnManager |
| DUNGEON   | Floor Layouts and Room Layouts. Also includes Comments on the Numbers used in the matrices | Dungeon - Floor - Room |
| FONT      | Anything related to Type. Mostly used by the Canvases to locate the proper Sprite coordinates for specific characters | TextArea |
| IMAGES    | Strings of all of the paths for basic images. Does not include dynamic images, like Dungeon Tiles, DGMN Sprites, or Attack Frames | All over |
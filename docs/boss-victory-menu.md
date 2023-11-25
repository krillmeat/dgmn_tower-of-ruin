# BOSS VICTORY MENU

After winning a Boss Battle, after assigning FP Rewards, but before Level Ups and Evolutions, this Menu has you select a reward for each living DGMN.

Here are the possible rewards:
  - Permanently increase 1 FP
  - Permanently increase EN
  - Permanently increase XP
    -  This XP is added when gaining a Level
  - Reduce the penalty from using a higher-stage Attack

---

## CLASS INFO

### EXTENDS
[ListMenu](#boss-victory-menu) -> [Menu](#boss-victory-menu)

### PARAMETERS 

| NAME | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| currFloor | Number | Dungeon's Current Floor |

---

## METHODS

### INITIALIZE
`init()`

Sets up the Menu's initial state

### CLEAR INFO TEXT
`clearInfoText()`

Clears the Bottom Info Bar area

### DRAW LIST
`drawList()`

Draws the "List" of Icons for the Reward Grid

*This overrides the standard `drawList` from **ListMenu***

### DRAW MENU
`drawMenu()`

Draws the Menu to the screen

*This overrides the standard `drawList` from **ListMenu***

### DRAW FP MENU
`drawFPMenu()`

Draws the Popup Menu for FP

### DRAW ICON
`drawIcon(row,col,image)`

Draws a small, rectangular icon used to show the Upgrade and its unlocked levels

| NAME | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| row | number | Y Position |
| col | number | X Position |
| image | string | Name of the Image used for the Icon |

### LAUNCH FP SELECTION
`launchFPSelection()`

Sets the FP Menu to open so the Menu draws the Popup Menu

### PREVIOUS CHOICE
`prevChoice()`

Handles the action for Up on the D-Pad. Used for both the main Menu, as well as the FP Menu

### NEXT CHOICE
`nextChoice()`

Handles the action for Down on the D-Pad. Used for both the main Menu, as well as the FP Menu

### SELECT CHOICE
`selectChoice(message,onDone)`

Handles the action for the A Button. Used for both the main Menu, as well as the FP Menu

| NAME | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| message | string | Message to write after selection is made |
| onDone | function | Callback for when the message is done writing |

### DRAW DGMN PORTRAIT
`drawDgmnPortrait(portraitImg)`

Draws the Portrait of the Currently Shown DGMN

| NAME | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
|

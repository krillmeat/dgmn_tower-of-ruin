# BATTLE
This is the documentation for the Battle System and Class. It covers both the larger scope of the Battle System, going into the architecture and layers, but also focuses on the Battle Class itself, which acts as the parent for all other Battle-related Classes. Below is a list of the sub-classes that exist within the Battle System, with links to their specific documentation.

- Battle Menu
- Attack Manager

## PROPS
These are all of the Properties created and handled by the Constructor. There are some things in the Constructor like the Action Handlers, IO, etc. that are listed below the Methods.

| PROP | DEFAULT | DESCRIPTION |
| ---- | ------- | ----------- |
| battleActive | true | If this is true, the Battle is Ongoing |
| turn | 0 | Goes up by 1 at the start of each new Turn. Is used for reward calculation |
| yourParty | undefined | Will end up being an Array of the DGMN IDs for each of your Party DGMN |
| enemyParty | \[ 'edId0','edId1','edId2' \] | As there is always 3, it will always looks like this (for now, at least) |
| menuState | 'battle' | Handles the current state of the Menu (_Do I use this?_) |
| attackManager | new AttackManager() | Instance of Attack Manger (see more) |
| battleCanvas | undefined | Canvas for drawing all Battle-related things |
| dgmnStatusCanvas | undefined | Canvas for the Status bars on the side of the Screen |
| battleMenu | undefined | BattleMenu (see more) that handles the Menu-specific side of the Battle |

## METHODS
Each of these handle events that happen at a Root Battle level. I have delegated as much as possible to Child Classes and Utilities. _This list is always shifting and things are always moving to other Classes/Utils or being deleted altogether._

### INITIALIZE

### INITIALIZE CANVAS

### INITIALIZE ACTION HANDLERS

### LOAD BATTLE IMAGES

### ON BATTLE IMAGES LOADED

### INITIALIZE DGMN CHOICE

### NEW TURN

### GO TO NEXT CHOICE

### GENERATE ENEMY PART
See more in the documentation for the EnemyGenerator Class

### CALCULATE TURN ORDER

### DRAW ALL STATUSES

### DRAW DGMN STATUS METER

### PAINT TO BATTLE CANVAS

### DRAW ACTION TEXT

### DRAW BATTLE CANVAS

### BUILD DGMN CANVASES

### CHECK BATTLE CONDITION

### BATTLE WIN

### BATTLE LOSE

### END

### GET DGMN VALUE BY INDEX

### GET DGMN DATA BY INDEX

### GET DGMN ATTACK DATA

### GET CURRENT DGMN CHOICE

### SELECT ATTACK

### ADD ACTION

### BEGIN COMBAT

## ACTION HANDLER

## BATTLE UTILITIES

## INPUT/OUTPUT
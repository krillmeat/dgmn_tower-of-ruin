// TODO - This needs to eventually be built out of a database

let CFG = {
  userName: 'Debug User',
  keyBindings: { 
    action: 'ArrowRight',
    cancel: 'ArrowDown',
    up: 'w',
    right: 'd',
    down: 's',
    left: 'a',
    start: 'Shift',
    select: 'q'
   },
  pixelKidMode: 'PKP',  // Handles which Images to load for a specific "version" of the Pixel Kid
  screenSize: 2,    // How much larger the screen is than the actual
  tileSize: 2 * 8,  // The size of the tile (determined by screenSize) TODO - Make this change dynamically during load
  textSpeed: 1      // 1 is fastest, 4 is slowest
}

export default CFG;
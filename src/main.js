let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play],
  }
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyW, keyA,keyD,keyR, keyUP,keyLEFT, keyRIGHT;

// Point Breakdowns
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Implement a simultaneous two-player mode (30)
// Display the time remaining (in seconds) on the screen (10)

// Source:
// Casting my cat NyuNyu amazing hunting dance and sounds
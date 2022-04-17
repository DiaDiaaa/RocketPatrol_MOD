let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: "#84a59d",
    disableWebAudio: true,
    noAudio: false,
    scene: [ Menu, Play],
  }
let game = new Phaser.Game(config);

let music;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyW, keyA,keyD,keyR,keyUP,keyLEFT, keyRIGHT;


// Point Breakdowns
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Implement a simultaneous two-player mode (30)    // Coorporating game where fire key control by each other
// Add your own (copyright-free) background music to the Play scene (5)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)


// Implementation
// Change most artwork, sound and softer UI color with my best ability :,)
// Added another NyuNyu player into two-player mode
// Add a background music from a copyright-free by crediting them
// Changing the rocket speed with different mode
// Adding another enemies that move faster and 1/4 smaller but deduct point annnddd worth more points

// Source:
// Casting my cat NyuNyu amazing hunting dance and sounds
// Background music by copyright free by crediting https://otologic.jp/free/bgm/game-action-nes03.html
// Drawing and photography by meee (Diana Yee):>
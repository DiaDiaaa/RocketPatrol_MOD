

class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/nyunyu.png');
        this.load.image('spaceship', './assets/cloud.png');
        this.load.image('thunder','./assets/thunder.png');
        this.load.image('skyfield', './assets/skyfield.png');
        this.load.image('sun','./assets/sun.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create(){
        // place tile sprite
        this.skyfield = this.add.tileSprite(0, 0, 640, 480, 'skyfield').setOrigin(0, 0);
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xCBDFBD).setOrigin(0, 0);
        // white borders -> no border
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xD4E09B).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xD4E09B).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xD4E09B).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xD4E09B).setOrigin(0, 0);
        
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); //p1 fire
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); //p2 fire
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

          // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'sun', 0, game.settings.spaceshipSpeed*1.25,30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0,game.settings.spaceshipSpeed, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'thunder', 0, game.settings.spaceshipSpeed*1.1, -10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width -100, borderUISize*6 + borderPadding*9, 'spaceship', 0, game.settings.spaceshipSpeed, 10).setOrigin(0,0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2+40, game.config.height - borderUISize - borderPadding, 'rocket',0, game.settings.rocketSpeed,keyLEFT,keyRIGHT,keyW).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2-40, game.config.height - borderUISize - borderPadding, 'rocket',0, game.settings.rocketSpeed,keyA,keyD,keyUP).setOrigin(0.5, 0);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 20
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            backgroundColor: '#F6F4D2',
            color: '#A44A3F',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            music.stop();
            this.scene.start("menuScene");
        }
        this.skyfield.tilePositionX -= 5;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 
        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship04);   
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
  
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion',{volume:30});     
      }
}


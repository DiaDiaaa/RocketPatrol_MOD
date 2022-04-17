class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
        //load title
        this.load.image('title','./assets/title.png')
        this.load.image('instruction','./assets/instruction.png')
        // load audio
        this.load.audio('sfx_select', './assets/dada.m4a');
        this.load.audio('sfx_explosion', './assets/nyunyu_wow.m4a');
        this.load.audio('sfx_nyunyu', './assets/nyunyu_ao.m4a');
        this.load.audio('bgm','./assets/NES-Action-D06-1(Stage5).mp3');
    }
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Dialog',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        music = this.sound.add('bgm',{volume:0.8});
        music.setLoop(true);
        music.play();

        this.add.image(game.config.width/2,game.config.height/2,'title');  
        this.add.image(game.config.width/2+200,game.config.height/2+150,'instruction');

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            rocketSpeed:5,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 5,
            rocketSpeed: 2,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}
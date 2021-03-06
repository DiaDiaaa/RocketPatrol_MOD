//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, speed,pointValue){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = speed;
    }
    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    
    // position reset
    reset() {
        this.x = game.config.width;
    }
}
class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
  
    preload() {
      this.load.image('Space', '/content/space.png');
      this.load.audio('Music1','content/StarLight.ogg')
      this.load.image('Ship', '/content/ship.png');
      this.load.image('Space2', '/content/space2.jpg');
      this.load.image('Space1', '/content/space1.jpg');
      this.load.image('Laser', '/content/laser.png');
      this.load.image('LaserRed', '/content/laserRed.png');        
      this.load.image('Enemy1', '/content/enemy1.png')
      this.load.image('Enemy2', '/content/enemy2.png')
      this.load.image('Enemy3', '/content/enemy3.png')
      this.load.audio('Music2',['content/OrbitalColossus.mp3'])
      this.load.audio('Music3',['content/MusicBoxGame OverIII.mp3'])
      this.load.audio('sndLaser',['content/laserfire01.ogg'])
      this.load.spritesheet("ExplosionAnim", "content/ExplosionAnim.png", {
        frameWidth: 32,
        frameHeight: 32
      });
    
      this.load.image("sprLaserEnemy0", "content/sprLaserEnemy0.png");
      this.load.image("sprLaserPlayer", "content/sprLaserPlayer.png");
    

      this.load.audio("sndExplode0", "content/sndExplode0.mp3");
      this.load.audio("sndExplode1", "content/sndExplode1.mp3");
      }
  
    create() {

      this.soundFX = this.sound.add("Music1", {loop: "true", volume: 0.3});
      this.sound.pauseOnBlur = false;
      this.soundFX.play();
      
      this.input.keyboard.on("keydown_M", event => {
        if(this.soundFX.isPlaying){
            this.soundFX.pause()
        }
        else {this.soundFX.resume()}
       })

      

      this.image = this.add.image(0, 0, 'Space').setOrigin(0);

      
  
      this.start = this.add.text(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "Press 1 to start", {
          fontFamily: 'monospace',
          fontSize: 30,
          fontStyle: 'bold',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.start.setOrigin(0.5);
  
        
      this.title = this.add.text(this.game.config.width * 0.5, 128, "JOURNEY TO LETHAMYR", {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
      this.title.setOrigin(0.5);
      
      this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

      
    }
    update(delta){
      if(this.key_1.isDown){
          this.scene.start("SceneMain");
          this.soundFX.stop();
          
      } 
  }
      
  }
class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
  
    preload() {
      this.load.image('Space', '/content/space.png');
      this.load.audio('Music1','content/StarLight.ogg')
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

      
  
      this.btnPlay = this.add.text(
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
      this.btnPlay.setOrigin(0.5);
  
        
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
          
      } 
  }
      
  }
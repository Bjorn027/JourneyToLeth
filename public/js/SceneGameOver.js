class SceneGameOver extends Phaser.Scene {
    constructor() {
      super({ key: "SceneGameOver" });
    }
    
    create() {
      this.game.sound.stopAll();
      this.soundFX = this.sound.add("Music3", {volume: 0.4});
      this.sound.pauseOnBlur = false;
      this.soundFX.play();

      this.image = this.add.image(0, 0, 'Space1').setOrigin(0).setScale(.45);
  
      this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
      this.title.setOrigin(0.5);
      
      
      this.restart = this.add.text(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "Back to Main Menu Press 2", {
          fontFamily: 'monospace',
          fontSize: 30,
          fontStyle: 'bold',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.restart.setOrigin(0.5);

      this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

  
      
  }
  update(delta){

    if(this.key_2.isDown){
     
      this.scene.start("SceneMainMenu");
      
  }
 }
}
  
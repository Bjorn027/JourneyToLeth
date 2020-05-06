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
  
      this.title = this.add.text(this.game.config.width * 0.5, this.game.config.width * 0.15, "GAME OVER", {
        fontFamily: 'monospace',
        fontSize: 60,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
      this.title.setOrigin(0.5);
      
      
      this.quit = this.add.image(
        this.game.config.width *0.5,
        this.game.config.height *0.5,
        "QuitButton"
      );
      this.quit.setInteractive();

      this.quit.on("pointerover", function(){
        this.quit.setTexture("QuitButtonHover")
      }, this);

      this.quit.on("pointerout", function(){
        this.setTexture("QuitButton");
      });

      this.quit.on("pointerup", function() {
        this.scene.start("SceneMainMenu");
      }, this);

       
      
  }
}
  
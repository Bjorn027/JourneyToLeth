var config = {
    type: Phaser.WEBGL,
    width:1400,
    height:900,
    backgroundColor: "black",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 }
      }
    },
    scene: [
      SceneMainMenu,
      SceneMain,
      SceneGameOver
    ],
    pixelArt: false,
    roundPixels: true
  };
  
  var game = new Phaser.Game(config);
class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }
  
  preload() {

    
   
  }

  create() {
     

    
    

    this.soundFX = this.sound.add("Music2", {loop: "true", volume: 0.4});
    this.sound.pauseOnBlur = false;
    this.soundFX.play()

    this.input.keyboard.on("keydown_M", event => {
      if(this.soundFX.isPlaying){
          this.soundFX.pause()
      }
      else {this.soundFX.resume()}
     })

    this.anims.create({
      key: "ExplosionAnim",
      frames: this.anims.generateFrameNumbers("ExplosionAnim"),
      frameRate: 20,
      repeat: 0
    });
    
    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0", {volume: 0.6}),
        this.sound.add("sndExplode1", {volume: 0.6})
      ],
      laser: this.sound.add("sndLaser")
    };

    this.image = this.add.image(0, 0, 'Space2').setScale(0.50).setOrigin(0);

    var score = 0;
    var scoreText;
    
     scoreText = this.add.text(16,16, "Score: 0", {
       fontFamily: 'monospace',
       fontSize: 48,
       fontStyle: 'bold',
       color: '#ffffff',
       align: 'center'
     });
     scoreText.setOrigin(0);

         
    
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "Ship"
    );
    console.log(this.player);

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new Shooter(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("Chaser").length < 5) {
    
            enemy = new Chaser(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new MotherShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
    
        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 11) * 0.02);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
        score += 100;
        scoreText.setText('Score: ' + score);
      }
         
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        
        enemy.explode(true);
      }
      
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      if (!player.getData("isDead") &&
          !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update(delta) {

    

    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keyEnter.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
      this.image.on("pointerdown", function(){
        this.player.setData("isShooting", true);
      })
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
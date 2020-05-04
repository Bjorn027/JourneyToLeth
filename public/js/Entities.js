class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy) {
    if (!this.getData("isDead")) {
     
      this.setTexture("ExplosionAnim").setScale(3);
      this.play("ExplosionAnim"); 
     
      this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', function() {
        if (canDestroy) {
          this.destroy();
        }
        else {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");

    this.setData("speed", 250).setScale(0.10);

    this.setData("isShooting", false);
    this.setData("timerShootDelay", 30);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }
  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }
  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }
  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  onDestroy() {
    this.scene.time.addEvent({ 
      delay: 1000,
      callback: function() {
        this.scene.scene.start("SceneGameOver");
        
      },
      callbackScope: this,
      loop: false
      
    });
    
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); 
      }
      else {
        var laser = new PlayerLaser(this.scene, this.x, this.y -39);
        laser.setScale(0.10)
        this.scene.playerLasers.add(laser);
      
        this.scene.sfx.laser.play(); 
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "Laser");
    this.body.velocity.y = -300;
  }
}

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "LaserRed");
    this.body.velocity.y = 200;
  }
}

class Chaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "Enemy1", "Chaser");

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData("isDead") && this.scene.player) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      ) < 320) {

        this.state = this.states.CHASE;
      }

      if (this.state == this.states.CHASE) {
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;

        var angle = Math.atan2(dy, dx);

        var speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );
        
      }
    }
  }
}

class Shooter extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "Enemy2", "Shooter");
    

    this.body.velocity.y = Phaser.Math.Between(50, 100);
    
    this.shootTimer = this.scene.time.addEvent({
      delay: 1600,
      callback: function() {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y +35
        );
        laser.setScale(0.10);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
    this.setScale(0.20);
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
     }
    }
   }
}

class MotherShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "Enemy3", "Better");
    
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

class scene3 extends Phaser.Scene{
    constructor(){
        super({key:"scene3"});
    }
    preload(){
        this.preload.audio('test',['assets/StarLight.ogg'])
    }

    create(){
        this.soundFX = this.soundFX.add("test", {loop: "true"});
    }
}
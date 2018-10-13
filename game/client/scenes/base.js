import Player from '../objects/player.js';
class BaseScene extends Scene {
    constructor(key) {
        super({ key });
        this.key = key;
    }

    init(position) {
        this.scene.setVisible(false, this.key);
        this.player = new Player(this,this,this,this);
        this.layers = {};
        /*
        this.prevSceneKey = this.key;
        this.nextSceneKey = null;
        this.transition = true;
        */
        this.input.keyboard.removeAllListeners();
    }

    create(tilemap, tileset, withTSAnimation) {
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        /*
        this.withTSAnimation = withTSAnimation;
        this.map = this.add.tilemap(tilemap);
        this.tileset = this.map.addTilesetImage(tileset);

        for (let i = 0; i < this.map.layers.length; i++) {
            if (withTSAnimation)
                this.layers[i] = this.map.createDynamicLayer(this.map.layers[i].name, this.tileset, 0, 0);
            else
                this.layers[i] = this.map.createStaticLayer(this.map.layers[i].name, this.tileset, 0, 0);
        }*/

        this.player.create();
        /*
        this.cameras.main.on('camerafadeincomplete', () => {
            this.transition = false;

            this.input.keyboard.on('keyup', (event) => {
                if (event.keyCode >= 37 && event.keyCode <= 40) {
                    this.player.stop();
                }
            });
            
            this.registerCollision();
            this.registerController();
        });

        this.cameras.main.on('camerafadeoutcomplete', this.changeScene.bind(this));*/
    }

    update() {

    }

    onChangeScene() {
        this.transition = true;
        this.player.stop();
        this.cameras.main.fade(FADE_DURATION);
    }
    /*
    changeScene() {
        if (this.withTSAnimation)
            this.tilesetAnimation.destroy();

        this.player.socket.disconnect();
        this.scene.start(this.nextSceneKey, this.prevSceneKey);
    }

    registerCollision() {
        throw new Error('registerCollision() not implemented');
    }

    registerTilesetAnimation(layer) {
        this.tilesetAnimation = new TilesetAnimation();
        this.tilesetAnimation.register(layer, this.tileset.tileData);
        this.tilesetAnimation.start();
    }*/

    registerController() {

    }
    /*
    hold(btn, action) {
        let t;
        let repeat = () => { action(); t = setTimeout(repeat, this.timeout); }
        btn.onmousedown = (e) => { e.preventDefault(); if (this.transition === false) repeat(); }
        btn.onmouseup = (e) => { e.preventDefault(); clearTimeout(t); if (this.transition === false) this.player.stop(); }
        btn.ontouchstart = (e) => { e.preventDefault(); if (this.transition === false) repeat(); }
        btn.ontouchend = (e) => { e.preventDefault(); clearTimeout(t); if (this.transition === false) this.player.stop(); }
    }*/
}

export default BaseScene;
import io from 'socket.io-client'

class Player {
    constructor(scene, room, position) {
        this.scene = scene;
        this.room = room;
        this.position = position;
        this.socket = io();
        this.players = {};
    }

    create() {
        this.socket.emit(NEW_PLAYER, this.room, this.position);

        this.socket.on(NEW_PLAYER, (data) => {
            this.addPlayer(data.id, data.x, data.y, data.direction);
        });

        this.socket.on(ALL_PLAYERS, (data) => {
            this.scene.cameras.main.fadeFrom(FADE_DURATION);
            this.scene.scene.setVisible(true, this.room);

            for (let i = 0; i < data.length; i++) {
                this.addPlayer(data[i].id, data[i].x, data[i].y, data[i].direction);
            }

            this.scene.physics.world.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
            this.scene.cameras.main.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
            this.scene.cameras.main.startFollow(this.players[this.socket.id], true);
            this.players[this.socket.id].setCollideWorldBounds(true);
                        
            var mainPlayer = this.players[data.id];

            this.socket.on(MOVE, (data) => {
                mainPlayer.x = data.x;
                mainPlayer.y = data.y;
                mainPlayer.anims.play(data.direction, true);
            });

            this.socket.on(STOP, (data) => {
                mainPlayer.x = data.x;
                mainPlayer.y = data.y;
                mainPlayer.anims.stop();
            });

            this.socket.on(REMOVE, (id) => {
                this.players[id].destroy();
                delete this.players[id];
            });

            //this.registerChat();
        });
    }

    addPlayer(id, x, y, direction) {
        this.players[id] = this.scene.physics.add.sprite(x, y, IMAGE_PLAYER);
        this.players[id].anims.play(direction);
        this.players[id].anims.stop();
    }

    
    move() {
        this.input.on('pointerdown',(pointer)=> {
            this.physics.moveToObject(this.players[this.socket.id],pointer,240);
        },this)
            
    }
}

export default Player;
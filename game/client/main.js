import BaseScene from './scenes/base.js';
//Some portions of code by jackyrusly/jrgame
import Phaser, { Game } from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 350,
    height: 350,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [game,menu],
};

const game = new Game(config);
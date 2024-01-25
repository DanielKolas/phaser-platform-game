import Phaser from 'phaser';

import PlayScene from './scenes/Play';
import Preload from './scenes/Preload';

const WIDTH = 1280;
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
}

const Scenes = [Preload, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);
import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor(){
        super("PlayScene");
    }

    preload(){
    }

    create(){
        const map = this.createMap();
        const layers = this.createLayers(map);
        const player = this.createPlayer();

        player.addColider(layers.platformColliders);
    }

    createMap(){
        const map = this.make.tilemap({key: "map"});
        map.addTilesetImage("main_lev_build_1","tiles-1");
        return map;
    }

    createLayers(map){
        const tileset = map.getTileset("main_lev_build_1");
        const platformColliders = map.createStaticLayer("platforms_colliders", tileset);
        const environment = map.createStaticLayer("environment", tileset);
        const platforms = map.createStaticLayer("platforms", tileset);

        platformColliders.setCollisionByProperty({collides: true}, true);
        return {environment, platforms, platformColliders};
    }

    createPlayer(){
        return new Player(this, 100, 250);

    }
}

export default Play;
import Phaser from "phaser";
import Player from "../entities/Player";
import Birdman from "../entities/Birdman";

class Play extends Phaser.Scene {

    constructor(config){
        super("PlayScene");
        this.config = config;
    }

    preload(){
    }

    create(){
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start);
        const enemies = this.createEnemies(layers.enemySpawns);

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
        }});
        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
        }});
        this.createEndOfLevel(playerZones.end, player);
        this.setUpFollowupCameraOn(player);
    }

    createMap(){
        const map = this.make.tilemap({key: "map"});
        map.addTilesetImage("main_lev_build_1","tiles-1");
        return map;
    }

    createLayers(map){
        const tileset = map.getTileset("main_lev_build_1");
        const platformsColliders = map.createStaticLayer("platforms_colliders", tileset);
        const environment = map.createStaticLayer("environment", tileset);
        const platforms = map.createStaticLayer("platforms", tileset);
        const playerZones = map.getObjectLayer('player_zones');
        const enemySpawns = map.getObjectLayer("enemy_spawns");

        platformsColliders.setCollisionByProperty({collides: true}, true);
        return {environment, platforms, platformsColliders, playerZones, enemySpawns };
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }
    createEnemies(spawnLayer){
        return spawnLayer.objects.map(spawnPoint => {
            return new Birdman(this, spawnPoint.x, spawnPoint.y);
        })

    }
    createEnemyColliders(enemies, {colliders}){
        enemies.forEach(enemy => {
            enemy
            .addColider(colliders.platformsColliders)
            .addColider(colliders.player)
        })
    }

    createPlayerColliders(player, {colliders}){
        player
            .addColider(colliders.platformsColliders);
    }

    setUpFollowupCameraOn(player){
        const { height, width, mapOffset, zoomFactor } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
        this.cameras.main.startFollow(player);
    }
    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }
    createEndOfLevel(end, player){
        const endOfLevel =  this.physics.add.sprite(end.x, end.y, "end")
            .setSize(5, 300)
            .setOrigin(0.5, 1)
        const EOLoverlap = this.physics.add.overlap(player, endOfLevel, () =>{
            EOLoverlap.active = false;
            console.log("player has won");
        })
    }
}

export default Play;
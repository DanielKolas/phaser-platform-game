export default {
    addColider(otherGameObject, callback){
        this.scene.physics.add.collider(this, otherGameObject, callback, null, this);
    }
}
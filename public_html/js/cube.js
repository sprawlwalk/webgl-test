function Cube(currentPos) {
    this.position = currentPos,
    this.geometry,
    this.material,
    this.mesh;
}

Cube.prototype = {
    constructor: Cube,
    init: function (scene)  {
        this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xcacaca, wireframe: true } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position = this.position;

        scene.add( this.mesh );
    },
    draw: function ()  {
        
    },
    update: function ()  {
        this.mesh.rotation.x += getRandomArbitrary(0.01, 0.03);
        this.mesh.rotation.y += getRandomArbitrary(0.01, 0.03);
    }
};
function Cube(currentPos) {
    this.id = 'cube';
    this.position = currentPos,
    this.geometry,
    this.material,
    this.rotate = true,
    this.move = {
        'active': false,
        'type': ''        
    },    
    this.speed = 1,
    this.mesh;    
}

Cube.prototype = {
    constructor: Cube,
    init: function (scene)  {
        this.geometry = new THREE.BoxGeometry( 100, 100, 100 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xcacaca, vertexColors: THREE.FaceColors } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position = this.position;

        scene.add( this.mesh );
    },
    draw: function ()  {
        
    },
    update: function ()  {
        if (this.rotate) {
            this.rotateOverMe();
        }        
        if (this.move.type === 'toOrigin') {
            this.moveToOrigin();
        }
    },
    rotateOverMe: function ()  {
        this.mesh.rotation.x += getRandomArbitrary(0.01, 0.03);
        this.mesh.rotation.y += getRandomArbitrary(0.01, 0.03);
    },
    moveToOrigin: function ()  {        
        this.position.x += this.position.x > 0 ? -this.speed : this.speed;
        this.position.y += this.position.y > 0 ? -this.speed : this.speed;
        this.position.z += this.position.z > 0 ? -this.speed : this.speed;
    },
    atOrigin: function ()  {
        return (this.position.x === 0 && this.position.y === 0 && this.position.y === 0);
    },
    stopRotation: function ()  {
        this.rotate = false;        
    },
    startRotation: function ()  {
        this.rotate = true;
    },
    stopMove: function ()  {
        this.move = false;        
    },
    startMove: function (type, speed)  {
        switch (type) {
        case 'toOrigin':
            this.move.active = true;
            this.move.type = 'toOrigin';
            break;
        default:
            this.move.active = true;
            this.move.type = 'toOrigin';
            break;
        }
        this.speed = speed;
        this.move.active = true;
    }
};
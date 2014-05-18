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
        this.material = new THREE.MeshPhongMaterial( { color: 0xcacaca, vertexColors: THREE.FaceColors } );
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
        
        switch (this.move.type) {
            case 'toOrigin':                
                this.moveToOrigin();
                if (this.atOrigin()) {
                    this.move.type = 'explosion';
                }
                break;
            case 'explosion':
                this.explosion();
                break;
        }
    },
    rotateOverMe: function ()  {
        this.mesh.rotation.x += getRandomArbitrary(0.01, 0.03);
        this.mesh.rotation.y += getRandomArbitrary(0.01, 0.03);
    },
    moveToOrigin: function ()  {
        this.mesh.translateZ(this.speed);        
    },
    explosion: function ()  {
        if (Math.abs(this.position.x) < 1000 && Math.abs(this.position.y) < 1000 && Math.abs(this.position.y < 1000)) {            
            this.position.x -= this.position.x > 0 ? -this.speed * 10 : this.speed * 10;
            this.position.y -= this.position.y > 0 ? -this.speed * 10 : this.speed * 10;
            this.position.z -= this.position.z > 0 ? -this.speed * 10 : this.speed * 10;
        }
    },
    atOrigin: function ()  {
        return (Math.abs(this.position.x) < 10 && Math.abs(this.position.y) < 10 && Math.abs(this.position.y < 10));
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
                this.mesh.lookAt(new THREE.Vector3(0, 0, 0));
                this.move.active = true;
                this.move.type = 'toOrigin';
                break;
            case 'explosion':
                this.move.active = true;
                this.move.type = 'explosion';
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
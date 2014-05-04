function Axes(length) {
    this.id = 'axes';
    this.length = length;    
    this.axes;
}

Axes.prototype = {
    constructor: Axes,
    init: function (scene)  {
        this.axes = new THREE.Object3D();

        this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( this.length, 0, 0 ), 0xFF0000, false ) ); // +X
        this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -this.length, 0, 0 ), 0xFF0000, true) );  // -X
        this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, this.length, 0 ), 0x00FF00, false ) ); // +Y
        this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -this.length, 0 ), 0x00FF00, true ) ); // -Y
        this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, this.length ), 0x0000FF, false ) ); // +Z
        this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -this.length ), 0x0000FF, true ) ); // -Z        

        scene.add( this.axes );
    },
    showHide: function (option)  {
        this.axes.traverse(function(child) {            
                child.visible = (option === 'hide') ? false : true;
        });
    },
    isVisible: function (option)  {
        return this.axes.visible;
    },
    buildAxis: function ( src, dst, colorHex, dashed )  {
        var geom = new THREE.Geometry(),
                mat; 

        if(dashed) {
                mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 3, gapSize: 3 });
        } else {
                mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
        }

        geom.vertices.push( src.clone() );
        geom.vertices.push( dst.clone() );
        geom.computeLineDistances();

        var axis = new THREE.Line( geom, mat, THREE.LinePieces );

        return axis;        
    },
    draw: function ()  {
        
    },
    update: function ()  {
        
    }
};
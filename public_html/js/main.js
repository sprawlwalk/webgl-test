(function( worldEngine, undefined ) {
    
        var scene,
            camera,
            objects,
            renderer;
            
        init();
        tick();

        // handle resizing windows
        window.addEventListener( 'resize', onWindowResize, false );

        function onWindowResize(){

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }
        
        function tick() {
            update();
            draw();
        }
    
    	function init() {
            var clearColor = 0x506580;

            // renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor( clearColor, 1 );
            document.body.appendChild(renderer.domElement);

            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
            camera.position.set( 0, 0, 3000 );
            camera.lookAt( scene.position );

            initItems();
	};

	function initItems() {
            objects = new Array();
            
            var max = 1000,
                min = -1000,
                currentPos,
                nCubes = 30;

            //Init cubes
            for(var i = 0; i < nCubes; i++) {
                currentPos = new THREE.Vector3(getRandomArbitrary(min, max),getRandomArbitrary(min, max),getRandomArbitrary(min, max));
                objects.push( new Cube(currentPos) );
            }

            for( var i=0; i < objects.length; i++ ) {
                    objects[i].init(scene);
            }
	};

	function draw() {
            requestAnimationFrame(tick);

		for( var i=0; i < objects.length; i++ )
 		{
 			var obj = objects[i];

 			if ( typeof obj.draw === 'function' )
	 			obj.draw();
 		}

	    renderer.render(scene, camera);
	};
       
	function cameraMovement() {
		var time = Date.now() * 0.0003;
		var radius = 2000.0;
		camera.position.x = radius * Math.cos(time);
		camera.position.z = radius * Math.sin(time);
		camera.position.y = radius * 0.4;

		camera.lookAt( new THREE.Vector3(0.0,0.0,0.0) );
	};

	function update() {
		cameraMovement();                
                
		for( var i=0; i < objects.length; i++ )
 		{
 			var obj = objects[i];

 			if ( typeof obj.update === 'function' )
	 			obj.update();
 		}
	}
        
}( window.worldEngine = window.worldEngine || {} ));
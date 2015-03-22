(function( worldEngine, undefined ) {
    
        var scene,
            camera,
            objects,
            renderer;
            
        init();
        tick();

        /* Private methods */
        
        function onWindowResize(){
            // Handle resizing windows
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }
        window.addEventListener( 'resize', onWindowResize, false );
        
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
            
            //Light
            var light = new THREE.PointLight(0xffffff);
            light.position.set(0,150,100);
            scene.add(light);

            initItems();
	};

	function initItems() {
            objects = new Array();
            
            var max = 1000,
                min = -1000,
                currentPos, currentScale,
                nCubes = 30;

            //Init cubes            
            for(var i = 0; i < nCubes; i++) {
                currentPos = new THREE.Vector3(getRandomArbitrary(min, max),getRandomArbitrary(min, max), getRandomArbitrary(min, max));
                objects.push( new Cube(currentPos) );
            }            
           
            // Add debug axes
            objects.push( new Axes(1000) );
            
            //Init text labels            
            currentPos = { x: 0, y: 0, z: 0 },
            currentScale = { x: 1000, y: 500, z: 1.0 };
            objects.push( new SpriteText( "Press 'A' key", { 
                position: currentPos,
                scale: currentScale,
                fontsize: 24, 
                borderColor: {r:0, g:0, b:0, a:1.0},
                fontColor: {r:0, g:255, b:0, a:1.0},
                backgroundColor: {r:0, g:0, b:0, a:0.7} }
            ));
            
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
        
        /* Public methods */
        
        worldEngine.giveMeObject = function ( id ) {
                var objectsArray = [];
            
                for( var i=0; i < objects.length; i++ ) {
                        var obj = objects[i];
                        if ( obj.hasOwnProperty('id') && obj.id === id ) {
                                objectsArray.push(obj);
                        }
                }
                return objectsArray;
        };
        
}( window.worldEngine = window.worldEngine || {} ));
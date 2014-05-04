function SpriteText(message, parameters) { 
    this.id = 'spriteText';
    this.fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    this.fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    this.fontColor = parameters.hasOwnProperty("fontColor") ? parameters["fontColor"] : {r:0, g:0, b:0, a:1.0};
    this.borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    this.borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    this.backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };    
    this.message = message;
    this.position = parameters.position;
    this.scale = parameters.scale;
    
    this.context, this.canvas, this.texture, this.sprite;
}

SpriteText.prototype = {
    constructor: SpriteText,
    init: function (scene)  {        
        var metrics, textWidth,            
            spriteMaterial;
        
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.context.font = "Bold " + this.fontsize + "px " + this.fontface;
    
	// Get size data (height depends only on font size)
	metrics = this.context.measureText( this.message );
	textWidth = metrics.width;

	// Context properties
	this.context.fillStyle   = "rgba(" + this.backgroundColor.r + "," + this.backgroundColor.g + "," + this.backgroundColor.b + "," + this.backgroundColor.a + ")";	
	this.context.strokeStyle = "rgba(" + this.borderColor.r + "," + this.borderColor.g + "," + this.borderColor.b + "," + this.borderColor.a + ")";
	this.context.lineWidth = this.borderThickness;        
	roundRect(this.context, this.borderThickness/2, this.borderThickness/2, textWidth + this.borderThickness, this.fontsize * 1.4 + this.borderThickness, 6);	
        
        // Font color
        this.context.fillStyle = "rgba(" + this.fontColor.r + "," + this.fontColor.g + "," + this.fontColor.b + "," + this.fontColor.a + ")";
	this.context.fillText( this.message, this.borderThickness, this.fontsize + this.borderThickness);

	// canvas contents will be used for a texture
	this.texture = new THREE.Texture(this.canvas);
	this.texture.needsUpdate = true;

	spriteMaterial = new THREE.SpriteMaterial( { map: this.texture, useScreenCoordinates: false } );
	this.sprite = new THREE.Sprite( spriteMaterial );
        
	this.sprite.scale.set(this.scale.x, this.scale.y, this.scale.z);
        this.sprite.position.set(this.position.x, this.position.y, this.position.z);

        //Add spriteText to the scene
        scene.add( this.sprite );
    },
    draw: function ()  {
        
    },
    update: function ()  {
        
    }
};

// Function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();
}
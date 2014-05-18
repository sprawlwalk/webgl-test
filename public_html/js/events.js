document.onkeypress = function(e) {
	var e=window.event || e;
	var keycodeRaw = e.charCode || e.keyCode;
	var keycodeStr = String.fromCharCode(keycodeRaw).toLowerCase();

	if ( keycodeStr === 'x' ) {
                var obj = worldEngine.giveMeObject('axes');
                
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].isVisible()) {
                        obj[i].showHide('hide');
                    } else {
                        obj[i].showHide('show');
                    }
                }
                
                
		console.log('"' + String.fromCharCode(e.charCode) +'" key pressed');
	}
        
        if ( keycodeStr === 'a' ) {
                var obj = worldEngine.giveMeObject('cube');
                
                for (var i = 0; i < obj.length; i++) {
                    obj[i].stopRotation();                
                    obj[i].startMove('toOrigin', 2);
                }
                
		console.log('"' + String.fromCharCode(e.charCode) +'" key pressed');
	}
};
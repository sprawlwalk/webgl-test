document.onkeypress = function(e) {
	var e=window.event || e;
	var keycodeRaw = e.charCode || e.keyCode;
	var keycodeStr = String.fromCharCode(keycodeRaw).toLowerCase();

	if ( keycodeStr === 'x' ) {
                var obj = worldEngine.giveMeObject('axes');
                if (obj.isVisible()) {
                    obj.showHide('hide');
                } else {
                    obj.showHide('show');
                }
		console.log('"' + String.fromCharCode(e.charCode) +'" key pressed');
	}
};
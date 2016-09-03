




// Position Left & Top

	function getCSSposition(a) {
		return pos = new Point (
			parseInt(a.style.left, 10),
			parseInt(a.style.top, 10)) }

	function setCSSposition(a, position) {
			a.style.left = position.x + 'px'
			a.style.top  = position.y + 'px' }


// Rotation (transform)

	function setCSSrotation(a, v) {
		var alpha = angle(v)*180/Math.PI
			// transform rotate est en sens inverse
			// du sens trigonometrique, donc on inverse alpha
			a.style.transform = 'rotate('+ (-alpha) +'deg)' }
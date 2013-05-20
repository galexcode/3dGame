
var Player = function() {
	var scalarVelocity = 0.5;
	var goalVelocity = new THREE.Vector3( 0, 0, 0 );
	var velocity = new THREE.Vector3( 0, 0, 0 );
	var geometry = new THREE.CubeGeometry( 1, 2, 1 );
	var gravity = new THREE.Vector3( 0, -1, 0 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var mesh = new THREE.Mesh( geometry, material );
	var jumping = false;
	this.mesh = function(){ return mesh; }
	this.position = function() { return mesh.position; }

	this.updatePosition = function(dt) {
		if (control.isDown(control.UP)) {
			goalVelocity.z = -scalarVelocity;
		} else if(control.isDown(control.DOWN)) {
			goalVelocity.z = scalarVelocity;
		} 
		else {
			goalVelocity.z = 0;
		}

  		if (control.isDown(control.LEFT)) {
			goalVelocity.x = -scalarVelocity;
		} else if(control.isDown(control.RIGHT)) {
			goalVelocity.x = scalarVelocity;
		} else {
			goalVelocity.x = 0;
		}

		if(control.isDown(control.SPACE) && !jumping) {
			velocity.y = 0.4;
			jumping = true;
		} else if(mesh.position.y == 0) {
			jumping = false;
		}

		velocity.x = approach(goalVelocity.x, velocity.x, dt);
		velocity.z = approach(goalVelocity.z, velocity.z, dt);
		mesh.position = mesh.position.add(velocity);

		mesh.position.y = mesh.position.y + velocity.y * dt;
		velocity.y = velocity.y + gravity.y * dt;
		if(mesh.position.y < 0) mesh.position.y = 0;
		if(mesh.position.y > 5) mesh.position.y = 5;
		if(mesh.position.x < -49.5) mesh.position.x = -49.5;
		if(mesh.position.x > 49.5) mesh.position.x = 49.5;
		if(mesh.position.z < -49.5) mesh.position.z = -49.5;
		if(mesh.position.z > 49.5) mesh.position.z = 49.5;
	}

	function approach(g, v, dt) {
		var difference = g - v;
		if(difference > dt)
			return v + dt;
		if(difference < -dt)
			return v - dt;
		return g;
	}

	var control = {
		_pressed: {},
		LEFT: 65,
		UP: 87,
		RIGHT: 68,
		DOWN: 83,
		SPACE: 32,
		isDown: function(keyCode) {
			return this._pressed[keyCode];
		},
		onKeydown: function(event) {
			this._pressed[event.keyCode] = true;
		},
		onKeyup: function(event) {
			delete this._pressed[event.keyCode];
		}
	};

	window.addEventListener('keyup', function(event) { control.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { control.onKeydown(event); }, false);
}
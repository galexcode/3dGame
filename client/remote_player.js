
var RemotePlayer = function() {
	var geometry = new THREE.CubeGeometry( 1, 2, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var mesh = new THREE.Mesh( geometry, material );
	this.mesh = function(){ return mesh; }
	this.position = function() { return mesh.position; }
	this.setPosition = function(posArray) {
		mesh.position.fromArray(posArray);
	}
}
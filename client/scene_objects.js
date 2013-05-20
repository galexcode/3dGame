var Tree = function(x, z) {
	var geometry = new THREE.CubeGeometry(1,2,1);
	var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
	var tree = new THREE.Mesh(geometry, material)
	tree.position.x = x;
	tree.position.z = z;
	return tree;
}

var Floor = function() {
	var floorGeometry = new THREE.CubeGeometry(100, 100, 0.05);
	var floorMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -2;
	floor.rotation.x = Math.PI / 2;
	return floor;
}		

var Sky = function() {
	var skyBoxGeometry = new THREE.CubeGeometry( 100, 100, 100 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );	
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	return skyBox;
}
var GameWebSocket = function(player, playerName, onOpenCallback, onMessageCallback) {

	var connected = false;
	var socket = new WebSocket('ws://localhost:30000');
	socket.onopen = function () {
		var playerInfo = {'type': 'connect', 'name': playerName, 'position': player.position};
		connected = true;
		socket.send(JSON.stringify(playerInfo));
	}
	socket.onmessage = onMessageCallback;
	socket.onerror = function(err) {
		console.log('error: ' + err);
	}
	socket.onclose = function(r) {
		console.log(r);
	}

	this.sendMessage = function(message) {
		if(connected) socket.send(message);
	}
}
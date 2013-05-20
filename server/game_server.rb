require 'eventmachine'
require 'em-websocket'
require 'json'

module GameServer
	port = 30000

	def self.debug_message(msg)
		puts "GameServer => #{msg}"
	end
	players = []
	EventMachine.run do
		EventMachine::WebSocket.start(:host => '0.0.0.0', :port => port, :debug => false) do |client|

			client.onopen do
				debug_message "client connected: " + client.to_s
			end

			client.onmessage do |msg|
				player_info = JSON.parse(msg)
				players << {:client => client, :name => player_info['name'], :position => player_info['position']} and debug_message "New player: #{player_info['name']}" if player_info['type'] == 'connect'
				players.each { |player| player[:position] = player_info['position'] if player[:name] == player_info['name'] } if player_info['type'] = 'update'
				debug_message players.count
				#TODO: avisar cliente das novas posicoes
				players.each { |player| player[:client].send players.to_json }
			end

			client.onclose do
				players.each { | p | players.delete p if p.client == client }
				debug_message "bye " + client.to_s
			end

			client.onerror do |error|
				if error.kind_of?(EM::WebSocket::WebSocketError)
					debug_message "error: " + error.to_s
				end
			end
		end	
		debug_message "Server Up. Runnning on port #{port}"
	end
end
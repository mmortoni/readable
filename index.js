const { spawn } = require('child_process');

function loadProcess() {

	var server = spawn('node', ['./server.js', 'server']);
	var client = spawn('node', ['./client.js', 'client']);
	
	server.stdout.on('data', function(data) {
		console.log(data.toString());
	});

	server.stderr.on('data', function(err) {
		console.log(err.toString());
	});

	server.on('exit', function() {
		console.log('Done server!');
	});

	client.stdout.on('data', function(data) {
		console.log(data.toString());
	});

	client.stderr.on('data', function(err) {
		console.log(err.toString());
	});

	client.on('exit', function() {
		console.log('Done client!');
	});
}

loadProcess();  

const { exec } = require('child_process');
const process = require('process');

process.chdir('api-server');

var child = exec("npm start", function(err, stdout, stderr) {
	if (err) throw err;
	else console.log('NPM executado!');
});

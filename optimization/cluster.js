// process.env.UV_THREADPOOL_SIZE = 1;	// every child in cluster only have 1 thread available
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
	// Cause index.js to be executed **again** but in 
	// child mode.
	cluster.fork();
	cluster.fork();
} else {
	// I'm a child, I'm going to act like a server and
	// do nothing else.
	const crypto = require('crypto');
	const express = require('express');
	const app = express();

	// function doWork(duration) {
	// 	const start = Date.now();
	// 	while(Date.now() - start < duration) {}
	// }

	app.get('/', (req, res) => {
		crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
			res.send('hi there');
		});		
	});

	app.get('/fast', (req, res) => {
		res.send('this was fast!');
	});

	app.listen(3000);
}

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
	https.request('https://www.google.com', res => {
		res.on('data', () => {});
		res.on('end', () => {
			console.log('Request:', Date.now() - start);
		});
	}).end();
}

function doHash() {
	crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
		console.log('Hash:', Date.now() - start);
	});
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
	console.log('FS:', Date.now() - start);
});	// FS: 21

doHash();
doHash();
doHash();
doHash();

// Request: 359
// Hash: 2143
// FS: 2143
// Hash: 2143
// Hash: 2159
// Hash: 2159

// Why in this order? Very complicated... ...
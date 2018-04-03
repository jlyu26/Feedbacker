// pbkdf2 Function (in Node's 'crypto' library):
// Usually is used to hash a password for storage inside of a database. 

// Proof that pbkdf2 function is not acturally single threaded:

const crypto = require('crypto');

const start = Date.now();

// Both following functions are executed at almost the same time,
// the 2nd won't wait until the 1st fihishes.
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	console.log('1:', Date.now() - start);	// how long it takes to calculate the hash value
});

// 1: 1011
// [Finished in 1.3s]

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	console.log('2:', Date.now() - start);
});

// 1: 1383
// 2: 1433
// [Finished in 1.8s]

// If single threaded, the total execution time of two invocation would
// be as single invocation doubled (2000 ms or so in this case).
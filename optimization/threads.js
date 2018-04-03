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
// be as single invocation doubled (2000 ms or so in this case). There are
// other threads node uses for doing some computationally intensive tasks
// that node event loop is not designed to be responsible for.

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
	console.log('5:', Date.now() - start);
});

// 4: 2279
// 3: 2285
// 2: 2291
// 1: 2318
// 5: 3412
// [Finished in 3.8s]
// By default thread pool has 4 threads



// On windows terminal:
// SET UV_THREADPOOL_SIZE = 2 && node threads.js

// 1: 1254
// 2: 1254
// 3: 2553
// 4: 2569
// 5: 3483
// They're being completed in groups of 2.



// On windows terminal:
// SET UV_THREADPOOL_SIZE = 5 && node threads.js

// 5: 2743
// 3: 2779
// 2: 2784
// 4: 2797
// 1: 2809
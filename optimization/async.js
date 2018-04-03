const https = require('https');

const start = Date.now();

function doRequest() {
	https.request('https://www.google.com', res => {
		res.on('data', () => {});
		res.on('end', () => {
			console.log(Date.now() - start);
		});
	}).end();
}

doRequest();
// 289

doRequest();
doRequest();
doRequest();
doRequest();

// 306
// 332
// 339
// 348
// 349

// Some function calls in the std library are delegated to the
// underlying operating system (OS async helpers in this case)
// and ran entirely outside the event loop.
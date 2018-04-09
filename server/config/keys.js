// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {	// automaticaly on Heroku
	// we are in production - return the prod set of keys
	module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'ci') {
	module.exports = require('./ci');
} else {
	// we are in development - return the dev set of keys
	module.exports = require('./dev');
}
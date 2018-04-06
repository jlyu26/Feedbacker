// Get a reference to the existing default exec() function that
// is defined on a Mongoose query, then overwrite that function
// to manipulate extra code whenever the query is executed.

const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);
// A copy of the origional mongoose function: what is supposed to
// be executed anytime a query is executed.
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || '');

	return this;	// make function chainable
};

// Overwrite the function and add some additional logic
mongoose.Query.prototype.exec = async function() {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}

	// Object.assign(): 
	// safely copy properties from one object to another
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {	
			collection: this.mongooseCollection.name
		})
	);
	
	// See if we have a value for 'key' in Redis
	const cacheValue = await client.hget(this.hashKey, key);

	// If we do, return that
	if (cacheValue) {
		const doc = JSON.parse(cacheValue);

		return Array.isArray(doc)
			?  doc.map(d => new this.model(d))
			: new this.model(doc);
	}

	// Otherwise, issue the query and store the result in Redis	
	const result = await exec.apply(this, arguments);	// Run the origional function

	// The windows port of Redis is on 3.0, which has hset() different than hmset
	// Use hmset() on windows, hset() for other systems
	client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

	return result;
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	}
};
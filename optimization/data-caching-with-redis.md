## Data Caching with Redis

### MongoDB Query Performance

In 'server/routes/surveyRoutes.js' line 13, there's a request handler inside which there's Mongoose query that retrives a list of surveys to show to the user. So every single time someone refreshes the page, inside of the application, we always issuing two separate requests to MongoDB (current_user and surveys). 

Whenever we issue a Mongoose query to the running MongoDB, MongoDB has an **index** that is matched up with a individual collection (of individual records [1]). The index is an efficient data structure for allowing us not have to look at every single record, but go directly to the queried record inside of the collection. Indices like this are what make MongoDB very quick.

<img width="432" alt="mongodb-query-index" src="https://user-images.githubusercontent.com/20265633/38348928-b4be8a5e-3872-11e8-8dc9-ca024f9cf44c.PNG">

However, whenever an index is created for a Mongo collection, the index targetes in one individual property on the records. If we issue a query by another property, like the index is on `_id` but we want a specific `title`, if the index on `title` does not exist, Mongo will have to fall back to the default behavior, a **full collection scan**, which is a very expensive operation. So when we write queries that doesn't match up with any index, it's easy to run into performance concern.

There are two ways to solve this concern. 

One is to write an index for that given field. We can have multiple indicies for a given collection. But as we add indicies to a collection, it will take longer to **write** into that collection. So more indicies means more disk space and more memory as well. Also we might be writing queries that we can't figure out ahead of time what indicies we need for it.

The other option is using **cache server**.

[1] _In this application there's one collection of surveys and one collection of users._

### Caching Layer

<img width="532" alt="cache-server" src="https://user-images.githubusercontent.com/20265633/38382399-d84ff088-38d7-11e8-8589-48261d52451a.PNG">

With cache server, anytime a query is issued, Mongoose is going to send the query to the cach server. If the cache server sees that query has already been issued once before, instead of sending the query to MongoDB, but it's going to take the respond to that query it got the last time, and immediately send it back to Mongoose.

If not issued before, cache server will reach out to MongoDB instance and let Mongo execute the query, then it will take the result and immediately send it back to Mongoose, while at the same time add the query and result onto it's collection of queries that have been issued.

<img width="489" alt="cache-server-example" src="https://user-images.githubusercontent.com/20265633/38382932-2d654950-38d9-11e8-8302-6ad0e059f6a1.PNG">

The cache server is not used for any right actions, but only reading data. If we write data, the writing will always going to MongoDB instance. So anytime we write data, make sure to clear any data stored on the cache server that is related to the record we just updated.

### Redis

Redis is an in-memory key-value data store that is very fast for reading and writing. It operates only in memory so once gets turned off or restarted, all the data that sits inside of there is instaltly deleted and wiped. To interact with the Redis server, we need **node-redis** library [[GitHub](https://github.com/NodeRedis/node_redis)] to manipulate by setting and getting the values.

<img width="546" alt="redis-pipline" src="https://user-images.githubusercontent.com/20265633/38385401-c97c1b7e-38df-11e8-84e5-54fff4934ddd.PNG">

Notice that we can't store plain JavaScript object directly inside of Redis. Use `JSON.stringify()` when writing data and `JSON.parse()` reading them.

```javascript
client.set('colors', JSON.stringify({ red: 'rojo' }));

client.get('colors', (err, val) => console.log(JSON.parse(val)));
```


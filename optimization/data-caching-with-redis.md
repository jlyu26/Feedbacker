## Data Caching with Redis

### MongoDB Query Performance

In 'server/routes/surveyRoutes.js' line 13, there's a request handler inside which there's Mongoose query that retrives a list of surveys to show to the user. So every single time someone refreshes the page, inside of the application, we always issuing two separate requests to MongoDB (current_user and surveys). 

Whenever we issue a Mongoose query to the running MongoDB, MongoDB has an **index** that is matched up with a individual collection (of individual records [1]). The index is an efficient data structure for allowing us not have to look at every single record, but go directly to the queried record inside of the collection. Indices like this are what make MongoDB very quick.

<img width="432" alt="mongodb-query-index" src="https://user-images.githubusercontent.com/20265633/38348928-b4be8a5e-3872-11e8-8dc9-ca024f9cf44c.PNG">

However, whenever an index is created for a Mongo collection, the index targetes in one individual property on the records. If we issue a query by another property, like the index is on `_id` but we want a specific `title`, if the index on `title` does not exist, Mongo will have to fall back to the default behavior, a **full collection scan**, which is a very expensive operation. So when we write queries that doesn't match up with any index, it's easy to run into performance concern.

There are two ways to solve this concern. 

One is to write an index for that given field. We can have multiple indicies for a given collection. But as we add indicies to a collection, it will take longer to **write** into that collection. So more indicies means more disk space and more memory as well. Also we might be writing queries that we can't figure out ahead of time what indicies we need for it.

The other option is using **caching**.

[1] _In this application there's one collection of surveys and one collection of users._
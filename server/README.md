## Server Side of Feedbacker

### 1. CommonJS Modules

CommonJS modules is a system implemented in Node.js for requiring/sharing code between different files. We use CommonJS modules in server side of the application while ES6 modules in front-end.

```javascript
// import Express library in CommonJS modules
const express = require('express');

// import React library in ES2015/ES6 modules
import React from 'react';
```


### 2. Handle HTTP Request using Express

<img width="446" alt="tech-express-route-handler" src="https://user-images.githubusercontent.com/20265633/36118590-91082d02-100b-11e8-8f28-0aefd376e8b3.PNG">

```javascript
// route handler
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(PORT);
```

**Theory of Authentication:**

The application communicate between browser and Express web server by HTTP request, and **HTTP is stateless** (Ajax is HTTP request). To solve this, after user logged in, server respond cookie/token/whatever that contains the identifying information that is unique to the user together inside the request that gets sent back to browser. On any follow up request that browser ever makes to the server, we're going to include that identifying information, so that server can check if the request is from the same person that made the origional login request.

**Cookie Based Authentication:**


### 3. Deploy Application Using Heroku

[Document](https://devcenter.heroku.com/categories/deployment)

Pre deployment checklist and Deployment process:

<img width="625" alt="tech-deployment-checklist-1" src="https://user-images.githubusercontent.com/20265633/36135220-bd2738be-1057-11e8-8ef2-8f89691111e2.PNG">

Running on windows, first step is to login local Heroku cli in cmd `heroku login`, then for the **initial** deployment, open git bash in server folder following the steps below:

1. Create a new app, using `heroku create`, there will show two separate links. [The first address](https://immense-forest-54300.herokuapp.com/) is the one we are navigated to when visiting out app in browser (a https URL); the second is our deployment target, that is a remote git repository managed by Heroku that we can push our local server to.
2. Add a remote repository to our current repo and name it "heroku" and the deployment target is the address of the remote repository: `git remote add heroku https://git.heroku.com/immense-forest-54300.git`
3. Take the code we have committed to local repository and push the master branch to the heroku repository: `git push heroku master`
3. To see whether application deployment success: `heroku open`

Subsequent Deploys:

When some arbitary changes are made, after making sure changes are saved:
1. use `$ git status` to check changes
2. `$ git add .` to add the file that will be committed
3. commit the file by using `$ git commit -m "commit message"` 
4. `$ git push heroku master` to put the change to heroku.


### 4. Google OAuth Authentication with Passport.js

<img width="513" alt="oauth-flow" src="https://user-images.githubusercontent.com/20265633/36182706-f4c88b14-10f8-11e8-9b8e-802655dfc6ee.PNG">

One key point is to securely store Google OAuth private token secret inside project and make sure not accidently push it to Github.

Need to properly set up account to say `http://localhost:5050` is valid to redirect users to, otherwise will get an 'redirect_uri_mismatch' error. Add `http://localhost:5000/auth/google/callback` to 'Authorized redirect URIs' in credentials.


### 5. MongoDB and Mongoose


### 6. Difference between express-session and cookie-session?


### 7. Two Sets of Resources for Production and Development Environment

<img width="638" alt="development-production-2-sets" src="https://user-images.githubusercontent.com/20265633/36361386-6567208e-14f9-11e8-85f2-041b949e6315.PNG">

There are two reasons to have a complete separate and different set of keys for production environment (Heroku deployment). First, in case of the physical laptop got stolen or someone else somehow have direct access to the keys (which is plain text file). Second, it allows us to have two separate Mongo databases. In production environment, we want to have a clean database that contains only users data that we never manually ness around with. But in development environment we can add/delete records or collections and change everything we want. 


### 8. HTTP and HTTPS


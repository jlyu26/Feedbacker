## Server Side of Feedbacker

**1. CommonJS Modules**

CommonJS modules is a system implemented in Node.js for requiring/sharing code between different files. We use CommonJS modules in server side of the application while ES6 modules in front-end.

```javascript
// import Express library in CommonJS modules
const express = require('express');

//	import React library in ES2015/ES6 modules
import React from 'react';
```

**2. Handle HTTP Request using Express**

<img width="446" alt="tech-express-route-handler" src="https://user-images.githubusercontent.com/20265633/36118590-91082d02-100b-11e8-8f28-0aefd376e8b3.PNG">

```javascript
// route handler
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(PORT);
```

**3. Deploy Application Using [Heroku](https://www.heroku.com/)**

**Pre deployment checklist and Deployment process:**

<img width="625" alt="tech-deployment-checklist-1" src="https://user-images.githubusercontent.com/20265633/36135220-bd2738be-1057-11e8-8ef2-8f89691111e2.PNG">

Running on windows, first step is to login local Heroku cli in cmd `heroku login`, then for the **initial** deployment, open git bash in server folder following the steps below:

1. Create a new app, using `heroku create`, there will show two separate links. [The first address](https://immense-forest-54300.herokuapp.com/) is the one we are navigated to when visiting out app in browser (a https URL); the second is our deployment target, that is a remote git repository managed by Heroku that we can push our local server to.
2. Add a remote repository to our current repo and name it "heroku" and the deployment target is the address of the remote repository: `git remote add heroku https://git.heroku.com/immense-forest-54300.git`
3. Take the code we have committed to local repository and push the master branch to the heroku repository: `git push heroku master`
3. To see whether application deployment success: `heroku open`

**Subsequent Deploys:**

When some arbitary changes are made, after making sure changes are saved:
1. use `$ git status` to check changes
2. `$ git add .` to add the file that will be committed
3. commit the file by using `$ git commit -m "commit message"` 
4. `$ git push heroku master` to put the change to heroku.
## Server Side of Feedbacker

1. CommonJS Modules

CommonJS modules is a system implemented in Node.js for requiring/sharing code between different files. We use CommonJS modules in server side of the application while ES6 modules in front-end.

```javascript
// import Express library in CommonJS modules
const express = require('express');

//	import React library in ES2015/ES6 modules
import React from 'react';
```

2. Handle HTTP Request using Express

<img width="446" alt="tech-express-route-handler" src="https://user-images.githubusercontent.com/20265633/36118590-91082d02-100b-11e8-8f28-0aefd376e8b3.PNG">

```javascript
// route handler
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(PORT);
```

3. Deploy Application Using [Heroku](https://www.heroku.com/)

**Pre deployment checklist:**

<img width="288" alt="tech-deployment-checklist-1" src="https://user-images.githubusercontent.com/20265633/36119618-7a3e88de-100e-11e8-805d-b2cf68a8eacf.PNG">

**Deployment process:**

<img width="329" alt="tech-deployment-steps" src="https://user-images.githubusercontent.com/20265633/36119661-a433a49e-100e-11e8-8f46-52ed5f4b5c80.PNG">

Subsequent Deploys:

When some arbitary changes are made, after making sure changes are saved, use `$ git status` to check changes, `$ git add .` to add the file, commit the file by `$ git commit -m "commit message"` `$ git push heroku master` to put the change to heroku.
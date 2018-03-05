## Server Side of Feedbacker

### 1. CommonJS Modules

CommonJS modules is a system implemented in Node.js for requiring/sharing code between different files. We use CommonJS modules in server side of the application while ES6 modules in front-end. In CommonJS modules with `require` statements, we can have some logic executed **before** we decide what file to require in, which is not allowed in ES6 modules. So in front-end of the application, to custom environment variables that need filter (such as publish/secret keys), use create-react-app [[Document]](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables).

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

[[Deployment Document]](https://devcenter.heroku.com/categories/deployment)

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

Dev/Prod Mode:

<img width="484" alt="why-two-server-structure" src="https://user-images.githubusercontent.com/20265633/36815992-8a96e2b4-1caa-11e8-9c6d-0167bb54098c.PNG">

Before deploy to Heroku, we need to **build** the project first. There are three options as listed below. Most industrial developments chose the third option, in which we make use of a third party **CI (Continuous Integration) server**, a server that has the ability to run tests or checks [[example]](http://circleci.com/docs/2.0/tutorials/), any task over the codebase, to actually build the application. However in this project, we go with the second option because we have no test cases and option three is overkill.

When deploying to Heroku, make sure remove `client/build` from gitignore under **server** folder.

<img width="370" alt="heroku-deployment-options" src="https://user-images.githubusercontent.com/20265633/36817160-29fdd238-1cae-11e8-9ad9-6bc3bd090a45.PNG">

[[Heroku build process document]](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)

### 4. Google OAuth Authentication with Passport.js

<img width="513" alt="oauth-flow" src="https://user-images.githubusercontent.com/20265633/36182706-f4c88b14-10f8-11e8-9b8e-802655dfc6ee.PNG">

One key point is to securely store Google OAuth private token secret inside project and make sure not accidently push it to Github.

Need to properly set up account to say `http://localhost:5000` is valid to redirect users to, otherwise will get an 'redirect_uri_mismatch' error. Add `http://localhost:5000/auth/google/callback` to 'Authorized redirect URIs' in credentials.


### 5. MongoDB and Mongoose

Mongoose for Survey Creation:

Why use subdocument collection for recipients, but separate collection for surveys (diagram below)?

<img width="630" alt="survey-model" src="https://user-images.githubusercontent.com/20265633/36826611-8d7e18d0-1cdc-11e8-85e4-787413261b54.PNG">

There's a very practical reason for this structure. In MongoDB, we refer to each of the records inside of a collection as a **document** (e.g. `User` is a document inside `User Collection`). The size limit for a single record is 4MB. So all the data inside of a `Survey` can only be up to 4MB. An average length of email address (20 characters) is around 20 bytes, so a single survey can only store 200,000 email addresses, which in most case is not a problem. However, if we make `Survey` as subdocument of `User`, as `User` itself has a limitation of 4MB, a user can only send out 200,000 emails worth of surveys, and that would be a very bad scenario.

Also, when fetching the surveys list created by a particular user to generate feedback percentage in dashboard, the surveys object should exclude the `recipients` list because it has nothing to do with percentage and could be very big.

Survey Workflow and Routes:

<img width="555" alt="survey-workflow-and-routes" src="https://user-images.githubusercontent.com/20265633/36863442-af7244ae-1d57-11e8-9697-cdad1630c231.PNG">

Email Approach:

<img width="550" alt="email-approach" src="https://user-images.githubusercontent.com/20265633/36864128-bea54f5a-1d59-11e8-8185-ffc5698c5b42.PNG">

Question: As in the above diagram, to batch all recipient's mailers into one mailer object and send in one request, we use the same template instance for all recipients, in another word everyone gets the exact same email with the same link of Yes/No (not able to customize link for different email address), so how can we track/record who clicked the link?

Solution: via email provider: [[SendGrid]](https://sendgrid.com/), with npm nodule [sendgrid](https://www.npmjs.com/package/sendgrid).

<img width="303" alt="email-sendgrid" src="https://user-images.githubusercontent.com/20265633/36866122-69c4d37e-1d5f-11e8-93e6-4ae9197c2305.PNG">

The process that SendGrid sends message back to our server is referred to as **Webhook**.


### 6. Webhooks in Development

The lifecycle of a webhook inside of this application:

<img width="209" alt="webhook-by-sendgrid" src="https://user-images.githubusercontent.com/20265633/36930878-b8c1bd42-1e78-11e8-83a0-612b4b7dcd85.PNG">

Webhook in development environment is more complicated than production environment, as SendGrid doesn't have the ability to reach out directly to a very particular laptop and make a POST request to our running development server.

<img width="493" alt="webhook-in-production-and-development" src="https://user-images.githubusercontent.com/20265633/36930992-fbb9ced0-1e7a-11e8-801d-a63d89243a72.PNG">

That's why we need [[Localtunnel]](https://github.com/localtunnel/localtunnel). So whenever SendGrid makes a POST request to our local server, instead, the POST request is sent to `localtunnel.com` API service. And we're going to tell `localtunnel.com` that if they ever receive a POST request to the sub-domain of like `webhookhelper.localtunnel.com`, then they should take that request and automatically forward it onto a Localtunnel's server that is running on local development laptop. We will the tell the local server to forward the request onto `localhost:5000`.

<img width="410" alt="webhook-with-localtunnel" src="https://user-images.githubusercontent.com/20265633/36931258-2913784a-1e80-11e8-837c-e7085b41600c.PNG">


### 7. Difference between express-session and cookie-session?


### 8. Two Sets of Resources for Production and Development Environment

<img width="638" alt="development-production-2-sets" src="https://user-images.githubusercontent.com/20265633/36361386-6567208e-14f9-11e8-85f2-041b949e6315.PNG">

There are two reasons to have a complete separate and different set of keys for production environment (Heroku deployment). First, in case of the physical laptop got stolen or someone else somehow have direct access to the keys (which is plain text file). Second, it allows us to have two separate Mongo databases. In production environment, we want to have a clean database that contains only users data that we never manually ness around with. But in development environment we can add/delete records or collections and change everything we want. 
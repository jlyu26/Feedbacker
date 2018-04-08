## Testing

### Unit and Integration Testing

Unit Testing: Take one single piece of application (a single function, a model, a single route handler) and test it in isolation to make sure that it's working the way as expect.

**Integration Testing:** Take multiple units, string them together and test them as one individual system. This allows developer to write fewer tests that test wide swaths of code base, and make sure many different feathres are working as expect without haveing to obsess about the particular implementation details.

<img width="237" alt="testing-flow" src="https://user-images.githubusercontent.com/20265633/38460187-f97481b4-3a82-11e8-84f5-89f224e972b8.PNG">

Headless Browser: A headless browser is a web browser without a graphical user interface. We interact with it through code. The purpose of headless browser is to run faster.

Challenges:

- Need to launch Chromium programatically and interact with it from a test suite
- Make assertions in Jset about stuff that's happening in a Chrome window
- "Simulate" logging in as a user through Google OAuth

<img width="239" alt="test-chromium-flow" src="https://user-images.githubusercontent.com/20265633/38461768-bd452b20-3aa6-11e8-86a8-3c61f2971ce4.PNG">

### Challenge

Many further test process will require to be logged in. After clicking the 'Login with Google' button, the page will be redirected to the google accounts page. If we write test code to find a certain account and click that to login, in local machine that will probably be OK. However when take the entire testing setup and push it onto a continuous integration (CI) server to run the tests automatically in some isolated environment off local server, as soon as Google detect we logging into an account from a machine that we never login before, and many test instances trying to login at the same time, Google's authentication service starts to get suspecious and show us CAPTCHAs (**C**ompletely **A**utomated **P**ublic **T**uring test to tell **C**omputers and **H**umans **A**part).

| Suggestion        | Thoughts           |
| ------------- |:-------------:|
| Make a secret route on the server that automatically logs in Chromium browser | Bad practice to change server code just to make test suite work |
| When tests are running, don't require quthentication | Server is running 100% separately from test suite. Can't easily change the server only when tests are running |
| Convince the server that Chromium browser is logged into the app by **faking a session** | √ Will not only work for Google but also every other oauth provider |

<img width="529" alt="testing-oauth-flow" src="https://user-images.githubusercontent.com/20265633/38469315-d0ad0c94-3b20-11e8-8273-280259c338ce.PNG">

In OAuth flow:

```javascript
const session = 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWE4N2JlNGQ4NDYzOTkxZjY0ZmIyMjVjIn19';
const Buffer = require('safe-buffer').Buffer;

Buffer.from(session, 'base64').toString('utf8');

// '{"passport":{"user":"5a87be4d8463991f64fb225c"}}'
// the id of current signed user stored in MongoDB (check users collection in mLab)
```

In test flow, we're going to work in reverse. We take an existing user ID and generate a fake session string with it and sign [1] the session object with keygrip [[GitHub](https://github.com/crypto-utils/keygrip)]. After that, we set the session and signature on page instance as cookies.Then we can use that page instance to make a request to the application with cookie sent along, and app server will think the page instance actually is signed in when in fact it is not.

[1] _Session Signature: To figure out whether or not someone has tampered with their session string. Base64 Session + Cookie Signing Key = Session Signature The cookie signing key is a secret string that defined by us (server/config/dev.js) and never shared with anyone outside of application._
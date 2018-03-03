## Client Side of Feedbacker

### 1. Redux Store and Provider Component

Redux store is where all app state exists to determine current state or to change state. To determine/change the current state, we call an action creator which dispatches an action, the action is sent to all the different reducers inside of application, those reducers are combined together with the `combineReducers()` call and that is uesd to update the state in Redux store (`createStore()`). After the update, all state that exists inside the store will be sent back to React components which causes them to re-render and display new content on screen.

<img width="855" alt="react-redux" src="https://user-images.githubusercontent.com/20265633/36515353-ebaa737c-1746-11e8-89df-f8771621bcdb.PNG">

Inside index.js file we create a Redux store and also we render a `<Provider>` tag. The `<Provider>` tag is a React component that is provided by React-Redux library, and we can consider this like the glue between React and Redux side of application. Because the `<Provider>` tag is the **very parent component** of application, any other component that we create can reach directly into the Redux store and pull out states.

```jsx
const store = createStore(() => [], {}, applyMiddleware());

ReactDom.render(
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
);
```

### 2. Webpack and Materialize

<img width="197" alt="webpack" src="https://user-images.githubusercontent.com/20265633/36645147-91d08f82-1a32-11e8-90ed-93236f976526.PNG">

Webpack is a **module loader**, which allows us to take separate JavaScript files and condense it down to one individual file. And it's not only limited to processing JavaScript files, but can also load up 'loaders' into webpack that instruct webpack how to handle other types of files as well, in particular CSS files that come with create-react-app installation. So if we import a CSS file (Materialize in this case) directly into a JavaScript file, webpack will look at the import statement and recognize that we are attempting to import in a CSS file, and it will include the file into our project output as CSS rather than trying to parse it as raw JavaScript (which is exactly what we need).

```jsx
import 'materialize-css/dist/css/materialize.min.css';
```

More information about webpack refer to [[document]](https://webpack.js.org/). 

Also, Materialize here refers to **Materialize CSS** [[Document]](http://materializecss.com/getting-started.html). There's another library called Material-UI [[Document]](http://www.material-ui.com/). The different between them is Materialize CSS use vanilla CSS to style components while Material-UI use JSX.

### 3. Communication between React and Server

<img width="269" alt="react-server-communication" src="https://user-images.githubusercontent.com/20265633/36645970-ea0c9ab8-1a3e-11e8-99de-1dfd0e529df7.PNG">

**Axios** [Github](https://github.com/axios/axios) is responsible for helping us making API/Ajax requests to back-end API. And **Redux Thunk** [Github](https://github.com/gaearon/redux-thunk) helps us to maintain/make asynchronous action creators behave the way we expect, by passing an action to 'dispatch function' to manually dispatch that action at any time that we wish, while vanilla Redux expects any action creator that we call will instantly and immediately return an action.

<img width="645" alt="react-redux-flow - comparison" src="https://user-images.githubusercontent.com/20265633/36647527-ec587ab0-1a54-11e8-8c21-26481af8af94.PNG">

### 4. Two Ways to Logout and Navigate

<img width="275" alt="logout-two-ways" src="https://user-images.githubusercontent.com/20265633/36652941-fd18d838-1a7f-11e8-9fe2-2d3ea92014c3.PNG">

To handle logout using traditional browser behavior (using `<a href="">` and HTTP request) is much easier to take care of. However, the benefit of handle the logout within the context of React and Redux side is that it would be a **much faster process**. Because the browser is not changing HTML documents, just make a single Ajax request, when we get the response just tell the Redux side of everything to update itself.

<img width="265" alt="navigation-two-ways" src="https://user-images.githubusercontent.com/20265633/36653574-ff6fde2a-1a83-11e8-8008-e239247c5594.PNG">

### 5. Billing

Considerations:

We as developers are bad at security

- Never accept raw credit card numbers
- Never store credit card numbers
- Always use an outside payment processor (like [Stript](https://stripe.com/) in this project)

Billing is hard

- Possible to avoid monthly payments/multiple plans?
- Fraud and chargebacks are a pain

The plugin to use in front-end form to exchange information with stripe API [[Document]](https://www.npmjs.com/package/stripe#documentation) is [[checkout.js library]](https://stripe.com/checkout). However, as this project is being developed, checkout's support of React is not as well as Angular, so we use [[React Stripe Checkout]](https://github.com/azmenak/react-stripe-checkout) component to make checkout.js work nicely with React.

Stripe workflow:

<img width="278" alt="stripe-workflow" src="https://user-images.githubusercontent.com/20265633/36772291-a4055556-1c22-11e8-8497-e9eaf7e68189.PNG">

Require login:

<img width="558" alt="express-how-it-works" src="https://user-images.githubusercontent.com/20265633/36811321-5632001c-1c9b-11e8-84f3-bb2b5d8cbf21.PNG">

### 6. Create Survey Form Using Redux Form

<img width="257" alt="form-reducer" src="https://user-images.githubusercontent.com/20265633/36884840-5c7837f4-1db1-11e8-9a6e-3d3c326fa80e.PNG">

`reduxForm` function allows Redux form to communicate with Redux store. It takes care of calling action creators, pulling data out of store and provide it to other components, so Redux form does have the ability to communicate to the Redux store at top of the application. 

<img width="335" alt="survey-client-structure" src="https://user-images.githubusercontent.com/20265633/36886262-7910fa10-1db9-11e8-8bda-576a1f378dd7.PNG">

The usage of `reduxForm` to connect component and store looks similar to `connect` from react-redux library. Validation with Redux form, use `validate: validateFunction` inside.

```jsx
export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm);
``` 

To validate a single email address, use regular expression in [[emailregex.com]](http://emailregex.com/).

### 7. Toggling Visibility

<img width="307" alt="toggling-visibility" src="https://user-images.githubusercontent.com/20265633/36929055-e8b022ba-1e59-11e8-9a9c-1a82ae2aaae1.PNG">

There are three ways to determine which component to show:

(1) Separate route

Pros: Clear implementation, easy to change the review component, easy and straightforward.

Cons: If user visit the url directly without entering any information onto the form, the user will probably be presented an empty page or empty form. To avoid this scenario, extra logic is needed.

(2) Redux

Have some 'flag' (action creator or reducer) inside of Redux store, and whenever user click 'continue' button, based on that piece of state inside of Redux store, determine whether user could be processed to review.

Cons: Make action creator, reducer, etc, which takes a lot of extra code to implement.

(3) Component State

Add a piece of **component level state** to `SurveyNew` component. If `true` show `SurveyFormView`, if `false` show `SurveyForm`. We can update the piece of state by passing a callback into `SurveyForm` and a callback into `SurveyFormView`, and both callbacks would essentially toggle the boolean value, and allow user to navigate back and forth. 

And as long as no other component in this application cares about whether it's `SurveyNew` or `SurveyFormView` the user is looking at, so other than Redux state, we would use component level state in this case.
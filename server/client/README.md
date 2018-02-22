## Client Side of Feedbacker

### 1. Redux Store and Provider Component

Redux store is where all app state exists to determine current state or to change state. To determine/change the current state, we call an action creator which dispatches an action, the action is sent to all the different reducers inside of application, those reducers are combined together with the `combineReducers()` call and that is uesd to update the state in Redux store (`createStore()`). After the update, all state that exists inside the store will be sent back to React components which causes them to re-render and display new content on screen.

<img width="855" alt="react-redux" src="https://user-images.githubusercontent.com/20265633/36515353-ebaa737c-1746-11e8-89df-f8771621bcdb.PNG">

Inside index.js file we create a Redux store and also we render a `<Provider>` tag. The `<Provider>` tag is a React component that is provided by React-Redux library, and we can consider this like the glue between React and Redux side of application. Because the `<Provider>` tag is the **very parent component** of application, any other component that we create can reach directly into the Redux store and pull out states.

```javascript
const store = createStore(() => [], {}, applyMiddleware());

ReactDom.render(
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
);
```

### 2. 
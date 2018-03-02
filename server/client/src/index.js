import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Debug:
// Use axios in browser to test backend survey logic:
import axios from 'axios';
window.axios = axios;
// Type in the following lines and should be able to receive an email
// const survey = { title: 'my title', subject: 'my subject', recipients: 'example@gmail.com', body: 'here is the body of the email' };
// axios.post('/api/surveys', survey);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);
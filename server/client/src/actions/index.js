import axios from 'axios';
import { FETCH_USER } from './types';

// `dispatch` is a function
// we want to dispatch an action AFTER the `axios.get` request
// has beed successfully completed
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
}
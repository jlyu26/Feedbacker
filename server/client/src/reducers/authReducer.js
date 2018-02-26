import { FETCH_USER } from '../actions/types';

// null: still figuring whether user is logged in
// user model: user logged in
// false: user not logged in
export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
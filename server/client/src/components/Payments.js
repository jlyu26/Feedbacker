import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="Feedbacker"
				description="$5 for 5 email credits"
				amount={500} // in US cents
				// callback function after authorization token retrieved from Stripe API
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">	{/* Materialize UI */}
					Add Credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
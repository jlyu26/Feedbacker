import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:	// null: still figuring whether user is logged in
				return;
			case false:	// false: user not logged in
				return <li><a href="/auth/google">Login with Google</a></li>;
			default:	// user model: user logged in
				return [
					<li key="1"><Payments /></li>,
					<li key="3" style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="2"><a href="/api/logout">Logout</a></li>
				];
		}
	}

	render() {
		return (
			<nav style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
			    <div className="nav-wrapper">
			    	<Link 
				    	to={this.props.auth ? '/surveys' : '/'} 
				    	className="left brand-logo"
				    	style={{ fontFamily: 'Marck Script', marginLeft: '10px' }}
			    	>
			    		Feedbacker
			    	</Link>
			    	<ul className="right">
			    		{this.renderContent()}
			      	</ul>
			    </div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
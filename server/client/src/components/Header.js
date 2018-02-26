import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:	// null: still figuring whether user is logged in
				return;
			case false:	// false: user not logged in
				return <li><a href="/auth/google">Login with Google</a></li>;
			default:	// user model: user logged in
				return <li><a href="/api/logout">Logout</a></li>;
		}
	}

	render() {
		return (
			<nav>
			    <div className="nav-wrapper">
			    	<Link 
				    	to={this.props.auth ? '/surveys' : '/'} 
				    	className="left brand-logo"
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
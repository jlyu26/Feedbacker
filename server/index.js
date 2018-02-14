const express = require('express');	// import Express library
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys')

const app = express();

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		console.log('Access Token: ', accessToken);
		console.log('Refresh Token: ', refreshToken);
		console.log('Profile: ', profile);
	})
);

// GoogleStrategy has an internal identifier of 'google', and
// that's how passport knows to take the string and go to find the
// strategy that has been already wired up to it.
// the scope specifies to Google service what access we
// want to have inside of this user's profile.
app.get(
	'/auth/google', 
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));

// Dynamic port binding:
// in production environment || development environment 5000 by default
const PORT = process.env.PORT || 5000;
app.listen(PORT);
const passport = require('passport');	// requiring the origional npm module passport

module.exports = (app) => {
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

	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {	// request, response
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
}


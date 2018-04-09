//// Everything is kicked off from index.js

const express = require('express');	// import Express library
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//// Register models with Mongoose
// the order of require statement can cause error in application!
require('./models/User');
require('./models/Survey');
require('./services/passport');	// Handling authentication
require('./services/cache');	// Overwrite Mongoose query exec function

//// Setup Mongoose instance
mongoose.connect(keys.mongoURI);

//// Create Express application
const app = express();

//// Setup middleware
// app.use() -- middleware:
// doing preprocessing of the incoming request before
// they are sent off to different route handlers
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

//// Register event handlers
// equals to:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//// Setup production file serving
// if (process.env.NODE_ENV === 'production') {
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
	// Express will serve up production assets
	// like our main.js, or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//// App listening on some given port
// Dynamic port binding:
// in production environment || development environment 5000 by default
const PORT = process.env.PORT || 5000;
app.listen(PORT);
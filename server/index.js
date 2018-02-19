const express = require('express');	// import Express library
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// the order of require statement can cause error in application!
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// app.use() -- middleware:
// doing preprocessing of the incoming request before
// they are sent off to different route handlers
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// equals to:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// Dynamic port binding:
// in production environment || development environment 5000 by default
const PORT = process.env.PORT || 5000;
app.listen(PORT);
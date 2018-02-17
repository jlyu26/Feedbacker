const express = require('express');	// import Express library
const mongoose = require('mongoose');
const keys = require('./config/keys');
// the order of require statement can cause error in application!
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoutes')(app);
// equals to:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// Dynamic port binding:
// in production environment || development environment 5000 by default
const PORT = process.env.PORT || 5000;
app.listen(PORT);
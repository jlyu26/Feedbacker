const express = require('express');	// import Express library
const app = express();

// route handler
app.get('/', (req, res) => {
	res.send({ bye: 'buddy' });
});

// Dynamic port binding:
// in production environment || development environment 5000 by default
const PORT = process.env.PORT || 5000;
app.listen(PORT);
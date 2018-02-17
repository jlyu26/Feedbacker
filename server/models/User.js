const mongoose = require('mongoose');
// equals to: const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

// create a new collection called 'users'
// collections are created bt making a 'model class'
mongoose.model('users', userSchema);
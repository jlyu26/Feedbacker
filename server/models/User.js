const mongoose = require('mongoose');
// equals to: const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

// create a new collection called 'users'
// collections are created bt making a 'model class'
mongoose.model('users', userSchema);
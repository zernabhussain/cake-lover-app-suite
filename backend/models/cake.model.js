const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true,
	},
	comment: {
		type: String,
		required: [true, 'Comment is required'],
		minlength: [5, 'Comment must be at least 5 characters long'],
		maxlength: [200, 'Comment must not exceed 200 characters'],
	},
	imageUrl: {
		type: String,
		required: [true, 'Image URL is required'],
	},
	yumFactor: {
		type: Number,
		required: [true, 'Yum Factor is required'],
		min: 1,
		max: 5,
	},
}, { timestamps: true });

module.exports = mongoose.model('Cake', cakeSchema);

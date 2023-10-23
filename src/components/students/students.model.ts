import mongoose from 'mongoose';
import bcrypt = require('bcryptjs');
import validator = require('validator');

const { Schema, model } = mongoose;
/**
 * Students Schema for DB
 */
const studentsSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
		},
		phone_number: {
			type: Schema.Types.Number,
			required: true,
		},
		department: {
			ref: 'Department',
			type: Schema.Types.ObjectId,
			required: true,
		},
		batchYear: {
			type: Schema.Types.Number,
			required: true,
		},
		semester: {
			type: Schema.Types.Number,
			required: true,
		},
		email: {
			type: Schema.Types.String,
			lowercase: true,
			unique: true,
			required: true,
			validate: (value) => {
				if (!validator.isEmail(value)) {
					throw new Error('Enter Valid emailAddress');
				}
			},
		},
		password: {
			type: Schema.Types.String,
			required: true,
		},
		attendance: [
			{
				type: Schema.Types.Mixed,
			},
		],
		authToken: {
			type: Schema.Types.String,
		},
	},
	{
		timestamps: true,
	},
);

//Hash the password before storing into DB
studentsSchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		throw new Error(err);
	}
});

const Student = model('Student', studentsSchema);
export default Student;

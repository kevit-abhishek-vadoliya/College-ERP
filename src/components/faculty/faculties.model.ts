import mongoose from "mongoose";
import bcrypt = require('bcryptjs')

const { Schema, model } = mongoose;

const facultySchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
    department:{
        ref: "Department",
        type: Schema.Types.ObjectId,
        required: true
    },
    role:{
        type: Schema.Types.String,
        required: true
    },
    email:{
        type: Schema.Types.String,
        required: true
    },
    password:{
        type: Schema.Types.String,
        required: true 
    }
  
},{
    timestamps: true
});

facultySchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		throw new Error(err)
	}
});

const Faculty = model('Faculty', facultySchema)
export default Faculty
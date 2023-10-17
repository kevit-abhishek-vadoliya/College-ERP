import mongoose from "mongoose";

const { Schema, model } = mongoose;

const facultySchema = new Schema({
	name: {
		type: String,
		required: true
	},
    department:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
  
});

const Faculty = model('Faculty', facultySchema)
export default Faculty
import mongoose from "mongoose";

const { Schema, model } = mongoose;
/**
 * Students Schema for DB
 */
const studentsSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone_number: {
		type: Number,
        required: true
	},
    department:{
        type: String,
        required: true
    },
    batch:{
        type: Number,
        required: true
    },
    semester:{
        type: Number,
        required: true
    }
});

const Student = model('Student', studentsSchema)
export default Student
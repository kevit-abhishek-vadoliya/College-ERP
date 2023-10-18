import mongoose from "mongoose";

const { Schema, model } = mongoose;
/**
 * Students Schema for DB
 */
const studentsSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	phone_number: {
		type: Schema.Types.Number,
        required: true
	},
    department:{
        ref: 'Department',
        type: Schema.Types.ObjectId,
        required: true
    },
    batchYear:{
        type: Schema.Types.Number,
        required: true
    },
    semester:{
        type: Schema.Types.Number,
        required: true
    },
    email:{
        type: Schema.Types.String,
        required: true
    },
    password:{
        type: Schema.Types.String
    }
}, {
    timestamps: true
});

const Student = model('Student', studentsSchema)
export default Student
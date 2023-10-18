import mongoose from "mongoose";

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

const Faculty = model('Faculty', facultySchema)
export default Faculty
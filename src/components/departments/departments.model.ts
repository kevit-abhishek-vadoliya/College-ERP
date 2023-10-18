import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DeptSchema = new Schema({
	department: {
		type: Schema.Types.String,
		required: true
	},
    initial:{
        type: Schema.Types.String,
        required: true
    },
    totalStudentsIntake:{
        type: Schema.Types.Number,
        required: true
    }
},{
    timestamps:true
});

const Department = model('Department', DeptSchema)
export default Department
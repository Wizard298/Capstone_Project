import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    salary: Number,
    // other fields...
});

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    }
},{timestamps:true});
export const Application  = mongoose.model("Application", applicationSchema);
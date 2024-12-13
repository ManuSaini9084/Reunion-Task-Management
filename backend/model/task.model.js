const mongoose =require("mongoose");

const taskSchema =mongoose.Schema({
    title:String,
    description:String,
    status:Boolean,
    username:String,
    userID:String
},{versionKey:false});

const TaskModel=mongoose.model("post",taskSchema);

module.exports={TaskModel}
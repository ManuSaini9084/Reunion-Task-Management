const express = require("express");
const {  TaskModel } = require("../model/task.model");
const { auth } = require("../middlware/auth.middleware");

const taskRoute = express.Router();

// taskRoute.use(auth)

taskRoute.get("/",async(req,res)=>{
    
    try{
        const tasks = await TaskModel.find();
        res.status(200).send(tasks)
    }catch(err){
        res.status(400).send({"error":err})
    }
})


taskRoute.post("/create",auth,async(req,res)=>{
    
    try{
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(200).send({"msg":"new Task has been added","newTask":req.body})
    }catch(err){
        res.status(400).send({"error":err})
    }
})


taskRoute.patch("/update/:taskID",auth,async(req,res)=>{
    const {taskID}=req.params
  
    try{
        const task = await TaskModel.findOne({_id:taskID})
        console.log(task)
        console.log(task.userID);
        console.log(req.body.userID)
        console.log(req.body.username)
        if(req.body.userID === task.userID)
        {
            await TaskModel.findByIdAndUpdate({_id:taskID},req.body)
            res.status(200).send({"msg":`The  Task ${taskID} has been updated`})
        }else{
            res.status(200).send({"msg":"You are not Authorized"})
        }
       
    }catch(err){
        res.status(400).send({"error":err})
    }
})



taskRoute.delete("/delete/:taskID", auth ,async(req,res)=>{
    const {taskID}=req.params

    try{
        const post = await TaskModel.findOne({_id:taskID})

        if(req.body.userID === post.userID)
        {
            await TaskModel.findByIdAndDelete({_id:taskID})
            res.status(200).send({"msg":`The Task  ${taskID} has been Deleted`})
        }else{
            res.status(200).send({"msg":"You are not Authorized"})
        }
       
    }catch(err){
        res.status(400).send({"error":err})
    }
})


module.exports={taskRoute}
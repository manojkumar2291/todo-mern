const mongoose=require("mongoose");
mongoose.connect("enter your db url/database name")
const todoSchema=mongoose.Schema({
title:String,
description:String,
completed:Boolean
})
const todo=mongoose.model('todos',todoSchema);
module.exports={todo}

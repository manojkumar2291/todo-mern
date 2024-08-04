const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://manoj:manoj@cluster0.q0hhtbe.mongodb.net/todos")
const todoSchema=mongoose.Schema({
title:String,
description:String,
completed:Boolean
})
const todo=mongoose.model('todos',todoSchema);
module.exports={todo}
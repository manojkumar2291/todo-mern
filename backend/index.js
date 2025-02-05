const express=require('express');
const jwt=require('jsonwebtoken');
const cors =require('cors')
const { createtodo, updatetodo } = require('./types');
const { Todo } = require('./db');
const app=express();
require("dotenv").config(); 


app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_VITE
}));
//list all todos
app.get('/todos',async function(req,res){
    const todos= await Todo.find({});
    res.json({
        todos
    })

});

//create new todo
app.post('/todo',async function(req,res){
    const createpayload=req.body;
    const parsepayload=createtodo.safeParse(createpayload);
    if(!parsepayload.success){
        res.json({
            msg:'you sent wrong inputs'
        })
        return;
    }
    //mongodb
    await Todo.create({
        title:createpayload.title,
        description:createpayload.description,
        completed:false
    })
    res.json({
        msg:'to do added'
    })
});


//mark as completed
app.put('/completed', async function(req,res){
    //const createpayload=req.body;
    const parsepayload=updatetodo.safeParse(req.body);
    if(!parsepayload.success){
        res.json({
            msg:'you sent wrong inputs'
        })
        return;
    }
    
    await Todo.updateOne({
        _id:req.body.id
    },{ 
        completed:req.body.completed
    })
    res.json({
        msg:'Todo is marked as done'
    })

});

//delete todo
app.delete('/delete',async function(req,res){
    const parsepayload=updatetodo.safeParse(req.body)
    if(!parsepayload.success){
        res.json({
            msg:'you sent wrong inputs'
        })
        return;
    }
    await Todo.deleteOne({_id:req.body.id})
    res.json({msg:'deleted todo'});
} )
app.listen(3000);
const express=require('express');
const jwt=require('jsonwebtoken');
const cors =require('cors')
const { createtodo, updatetodo } = require('./types');
const { todo } = require('./db');
const app=express();


app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}));

app.get('/todos',async function(req,res){
    const todos= await todo.find({});
    res.json({
        todos
    })

});
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
    await todo.create({
        title:createpayload.title,
        description:createpayload.description,
        completed:false
    })
    res.json({
        msg:'to do created'
    })
});

app.put('/completed', async function(req,res){
    //const createpayload=req.body;
    const parsepayload=updatetodo.safeParse(req.body);
    if(!parsepayload.success){
        res.json({
            msg:'you sent wrong inputs'
        })
        return;
    }
    
    await todo.updateOne({
        _id:req.body.id
    },{ 
        completed:req.body.completed
    })
    res.json({
        msg:'Todo is marked as done'
    })

});
app.delete('/delete',async function(req,res){} )
app.listen(3000);
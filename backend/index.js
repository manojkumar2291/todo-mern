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
//list all todos
app.get('/todos',async function(req,res){
    const todos= await todo.find({});
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
    await todo.create({
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
    
    await todo.updateOne({
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
    await todo.deleteOne({_id:req.body.id})
    res.json({msg:'deleted todo'});
} )
app.listen(3000);
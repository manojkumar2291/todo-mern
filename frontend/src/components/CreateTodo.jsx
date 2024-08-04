import { useState } from "react";

export function CreateTodo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")
    return(
        <div>
            <label htmlfor='title'>Title: </label>
            <input style={{
                padding:10,
                
            }} type="text"  placeholder='title' id='title'
            onChange={function(e){
                const value=e.target.value;
                setTitle(e.target.value)
            }}></input><br/>

<label htmlfor='description'>description: </label>
            <input  style={{
                padding:10,
                
            }}type='text' placeholder='description' id='description'
             onChange={function(e){
                const value=e.target.value;
                setDescription(e.target.value)
                }}></input><br/>
            
            <button onClick={
                ()=>fetch("http://localhost:3000/todo",{
                method:'post',
                body:JSON.stringify({
                    title:title,
                    description:description,
                }),
                headers:{
                    'content-type':"application/json"
                }
                }).then (async function(res){
                    const json=await res.json();
                    alert("todo added");
                })
                }>Add a todo</button>
        </div>
    )
}

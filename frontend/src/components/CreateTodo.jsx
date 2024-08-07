import { useState } from "react";

export function CreateTodo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")
    return(
        <div className="box-border m-auto h-100 w-2/5 p-10 
                border-2 bg-grey-50 m4 rounded mt-10 ">
            <label htmlfor='title'  >Title: 
            <input style={{
                padding:10,
            }} type="text"  placeholder='title' id='title'
            onChange={function(e){
                const value=e.target.value;
                setTitle(e.target.value)
            }}
            className="box-border mb-2  border-2 bg-grey-50"></input></label><br/>

            <label htmlfor='description'>description: 
            <input  style={{
                padding:10,
                
            }}type='text' placeholder='description' id='description'
             onChange={function(e){
                const value=e.target.value;
                setDescription(e.target.value)
                }}
                className="box-border  border-2 bg-grey-50 mb-5"></input></label><br/>
            
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
                    alert(json.msg);
                })
                } className="bg-blue-500 text-white px-4 py-2 rounded mx-auto block">Add a todo</button>
        </div>
    )
}

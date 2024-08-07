/*

*/

import { useEffect } from "react";

export function Todos({todos}){
    
    let i=1;
    return (
        <div class="container mx-auto">
          <h1 class="text-3xl font-bold mb-6 text-center">Todo List</h1>
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-6 text-center">S.NO</th>
                <th class="py-3 px-6 text-left">Title</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 text-sm">

            {todos.map(function(todo) {
             return   (
              <tr class="border-b border-gray-200">
                <td class="py-3 px-6 text-center">{i++}</td>
                <td class="py-3 px-6 text-left">{todo.title}</td>
                <td class="py-3 px-6 text-left">{todo.description}</td>
                <td class="py-3 px-6 text-center">
                  <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={()=>{
                    fetch('http://localhost:3000/completed',{
                        method:'PUT',
                        body:JSON.stringify({
                            id:todo._id,
                            completed:!todo.completed
                        }),
                        headers:{
                            'content-type':"application/json"
                        }
                        }).then (async function(res){
                            const json=await res.json();
                            alert(json.msg);
                        })
                }}>{todo.completed==true?"completed":"mark as completed"}</button>
                  <button class="bg-red-500 text-white px-4 py-2 rounded" onClick={()=>{
                    fetch('http://localhost:3000/delete',{
                        method:'delete',
                        body:JSON.stringify({
                        id:todo._id,
                        completed:todo.completed,
                        }),
                        headers:{
                        'content-type':"application/json"
                        }
                        }).then (async function(res){
                        const json=await res.json();
                        alert(json.msg);
                        })}}>Delete</button>
                </td>
              </tr>)})}
              
              
            </tbody>
          </table>
        </div>
      
        
    )
}
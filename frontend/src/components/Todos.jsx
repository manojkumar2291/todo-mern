/*

*/

export function Todos({todos}){
    
    return (
        <div>
           {todos.map(function(todo) {
            return <div>
                
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={()=>{
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
                            alert("todo updated");
                        })
                }}>{todo.completed==true?"completed":"mark as completed"}</button>
                </div>
            })}
        </div>
    )
}
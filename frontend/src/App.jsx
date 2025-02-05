import { useEffect, useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  
  const fetchTodos = () => {
    fetch(`${backendUrl}/todos`)
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]); 

  return (
    <div >
      <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">Todo App</h1>
      <CreateTodo fetchTodos={fetchTodos} />
      <Todos todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
}

export default App;

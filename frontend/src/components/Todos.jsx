import { useEffect } from "react";

export function Todos({ todos }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Todo List</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-center">S.NO</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {todos.map((todo, index) => (
              <tr key={todo._id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                <td className="py-3 px-6 text-center font-semibold">{index + 1}</td>
                <td className="py-3 px-6 text-left">{todo.title}</td>
                <td className="py-3 px-6 text-left">{todo.description}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  {/* Mark as Completed Button */}
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition duration-300 ${
                      todo.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => {
                      fetch(`${backendUrl}/completed`, {
                        method: "PUT",
                        body: JSON.stringify({ id: todo._id, completed: !todo.completed }),
                        headers: { "Content-Type": "application/json" },
                      })
                        .then(async (res) => {
                          const json = await res.json();
                          alert(json.msg);
                        })
                        .catch((err) => console.error("Error:", err));
                    }}
                  >
                    {todo.completed ? "Completed" : "Mark as Completed"}
                  </button>

                  {/* Delete Button */}
                  <button
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-300"
                    onClick={() => {
                      fetch(`${backendUrl}/delete`, {
                        method: "DELETE",
                        body: JSON.stringify({ id: todo._id, completed: todo.completed }),
                        headers: { "Content-Type": "application/json" },
                      })
                        .then(async (res) => {
                          const json = await res.json();
                          alert(json.msg);
                        })
                        .catch((err) => console.error("Error:", err));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

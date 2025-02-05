import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Use environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todo`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      alert(json.msg);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo. Try again!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cyan-400"
         >
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Todo Form Card */}
      <div className="relative z-10 max-w-lg w-full mx-auto p-6 bg-white bg-opacity-80 shadow-lg rounded-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Add a Todo</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

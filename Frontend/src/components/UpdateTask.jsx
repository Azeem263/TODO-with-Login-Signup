import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (id) => {
    let item = await fetch("http://localhost:3200/task/" + id, {
      credentials: "include",
    });
    item = await item.json();
    if (item.success) {
      setTaskData(item.result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let res = await fetch("http://localhost:3200/update-task", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, ...taskData }),
    });

    const data = await res.json();
    console.log("Update response:", data);

    if (data.success) {
      alert("Task updated successfully!");
      navigate("/"); 
    } else {
      alert("Update failed. Try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Update Task
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="title" className="font-medium text-gray-700">
            Title
          </label>
          <input
            value={taskData.title}
            onChange={(event) =>
              setTaskData({ ...taskData, title: event.target.value })
            }
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          />

          <label htmlFor="description" className="font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={taskData.description}
            onChange={(event) =>
              setTaskData({ ...taskData, description: event.target.value })
            }
            name="description"
            id="description"
            placeholder="Enter your description"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="bg-gray-700 text-white font-semibold py-2 rounded-md mt-2 hover:bg-gray-900 transition-all duration-300"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;

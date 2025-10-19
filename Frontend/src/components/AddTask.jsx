import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";

function AddTask() {

  const [taskData, setTaskData] = useState();
  const navigate = useNavigate()

const handleAddTask = async (e) => {
  e.preventDefault();
  if (!taskData?.title || !taskData?.description) {
    alert("Please fill in both Title and Description!");
    return;
  }

  const res = await fetch("http://localhost:3200/add-task", {
    method: "POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });

  const data = await res.json();
  // console.log("Add response:", kaam);
  if (data.success) {
    navigate("/"); 
  } else {
    alert("Failed to add task");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Add Task
        </h1>

        <form className="flex flex-col space-y-4">
          <label htmlFor="title" className="font-medium text-gray-700">
             Title
          </label>
          <input
             onChange={(event) =>
              setTaskData({ ...taskData, title: event.target.value })
                 }
             type="text"
              name="title"
             placeholder="Enter task title"
             className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          />

          <label htmlFor="description" className="font-medium text-gray-700">
             Description
          </label>
          <textarea
             onChange={(event) =>
             setTaskData({ ...taskData, description: event.target.value })
              }
             name="description"
             placeholder="Enter your description"
             className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
             rows="4"
           ></textarea>

          <button
             onClick={handleAddTask}
             type="submit"
             className="bg-gray-700 text-white font-semibold py-2 rounded-md mt-2 hover:bg-gray-900 transition-all duration-300"
              >
             Add New Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;

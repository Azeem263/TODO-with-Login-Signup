import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks", {
      credentials: "include",
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }else{
      alert("Try After Sometime")
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch("http://localhost:3200/delete/" + id, {
      method: "delete",
      credentials:"include",
    });
    item = await item.json();
    if (item.success) {
      getListData();
    }else{
      alert("Try After Sometime")
    }
  };

  //  Select All checkbox handler
  const selectAll = (event) => {
    if (event.target.checked) {
      // all IDs
      const allIds = taskData.map((task) => task._id);
      setSelectedTask(allIds);
    } else {
      setSelectedTask([]); // empty
    }
  };

  // Single checkbox handler
  const selectSingleItem = (id) => {
    if (selectedTask.includes(id)) {
      // if already selected -> remove it
      setSelectedTask(selectedTask.filter((item) => item !== id));
    } else {
      // add id to selected list
      setSelectedTask([...selectedTask, id]);
    }
  };

  const deleteMultiple = async () => {
    let item = await fetch("http://localhost:3200/delete-multiple", {
      method: "delete",
      credentials:"include",
      body: JSON.stringify(selectedTask),
      headers: {
        "content-Type": "application/json",
      },
    });
    item = await item.json();
    if (item.success) {
      getListData();
    }else{
      alert("Try After Sometime")
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-2">
      <h1 className="text-3xl font-extrabold text-gray-800">Task List</h1>

      <div className="w-11/12 md:w-3/4 mb-4 flex justify-start">
        <button
          onClick={deleteMultiple}
          disabled={selectedTask.length === 0} // disable if nothing selected
          className={`${
            selectedTask.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-800"
          }
           text-white font-semibold py-2 px-5 rounded-lg shadow-md border border-red-700 transition-all duration-300`}
        >
          Delete Selected
        </button>
      </div>

      <div className="overflow-x-auto w-11/12 md:w-3/4">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm tracking-wider">
              <th className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={
                    selectedTask.length === taskData.length &&
                    taskData.length > 0
                  } // selectAll checkbox reflects state
                />
              </th>
              <th className="py-3 px-6 text-left">S.No</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 pl-18 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {taskData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No tasks available
                </td>
              </tr>
            ) : (
              taskData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTask.includes(item._id)}
                      onChange={() => selectSingleItem(item._id)}
                    />
                  </td>

                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {item.title}
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium max-w-xs break-words whitespace-normal">
                    {item.description}
                  </td>

                  <td className="py-4 px-6 text-white font-medium flex ">
                    <button
                      onClick={() => deleteTask(item._id)}
                      className="bg-red-700 hover:bg-red-900 text-white py-1 px-4 rounded-md border border-red-800 shadow-md transition-all duration-300 hover:scale-105 "
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${item._id}`}
                      className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-4 rounded-md border border-blue-700 shadow-md transition-all duration-300 hover:scale-105 ml-3"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ✅ For Debugging
        <div className="mt-4 text-sm text-gray-600">
          Selected IDs: {JSON.stringify(selectedTask)}
        </div> */}
      </div>
    </div>
  );
}

export default List;

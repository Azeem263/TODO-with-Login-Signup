import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navabar() {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("login");
    setTimeout(() => {
      navigate('/login')
    }, 0);

  };

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem("login"));
    };
    window.addEventListener("localstorage-change", handleStorage);
    return () => {
      window.removeEventListener("localstorage-change", handleStorage);
    };
  }, []);

  return (
    <nav className="py-5 px-5 flex justify-between items-center bg-gray-800 font-sans text-white">
      <div className="text-2xl font-bold">To Do App</div>
      <ul className="list-none flex gap-5">
        {login ? (
          <>
            <li className="hover:text-gray-300">
              <Link to="/">List</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/add">Add Task</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link onClick={logout}>Logout</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="new">New Page</Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navabar;

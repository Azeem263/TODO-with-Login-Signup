import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  //if user is login then don't go on login page
  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  },[]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(userData);
    let result = await fetch("http://localhost:3200/login", {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      // alert("Login Success")
      // toast.success("Login successful!");
      document.cookie = "token=" + result.token;
      localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event('localstorage-change'))
      navigate("/");
    } else {
      alert("Email & Password Mismatch");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Login
        </h1>

        <form className="flex flex-col space-y-4">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
            type="text"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          />

          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          />

          <button
            onClick={handleLogin}
            className="bg-gray-700 text-white font-semibold py-2 rounded-md mt-2 hover:bg-gray-900 transition-all duration-300"
          >
            Login
          </button>
          <Link
            to="/signup"
            className=" w-fit bg-gray-500 hover:bg-gray-900 text-white py-1 px-4 rounded-md "
          >
            SignUp
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

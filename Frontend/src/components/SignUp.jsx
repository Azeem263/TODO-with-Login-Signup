import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();


    useEffect(() => {
  const login = localStorage.getItem("login");
  if (login && login !== "undefined" && login !== "null" && login !== "") {
    navigate("/");
  }
}, []);


  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(userData);

    let result = await fetch("http://localhost:3200/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.success) {
      document.cookie = "token=" + result.token;
      localStorage.setItem("login", userData.email);
      navigate("/");
    } else {
      alert("Try After Some Time");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Sign UP
        </h1>

        {/* ✅ Handle form submit */}
        <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
          <label htmlFor="name" className="font-medium text-gray-700">
            Name
          </label>
          <input
            onChange={(event) =>
              setUserData({ ...userData, name: event.target.value })
            }
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          />

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
            id="password"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
          />

          <button
            type="submit"
            className="bg-gray-700 text-white font-semibold py-2 rounded-md mt-2 hover:bg-gray-900 transition-all duration-300"
          >
            Sign Up
          </button>

          <Link
            to="/login"
            className="w-fit bg-gray-500 hover:bg-gray-900 text-white py-1 px-4 rounded-md"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

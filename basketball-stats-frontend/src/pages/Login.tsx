import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/endpoints/users";
import { LoginResponseType } from "../types";

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponseType) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-50">
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border border-gray-50 rounded-md bg-white">
        <h1 className="text-2xl mb-4 font-semibold">Login</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-50 rounded-md p-2 w-full mb-3 bg-gray-100"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-50 rounded-md p-2 w-full mb-3 bg-gray-100"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-4">
          <hr className="border border-gray-100" />
          <div className="flex gap-1 py-2">
            Don't you have an account?
            <Link
              className="text-blue-600 hover:text-blue-700"
              to={"/register"}
            >
              Register now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

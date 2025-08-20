import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/endpoints/users";
import { RegisterResponseType } from "../types";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "player" | "admin">("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: RegisterResponseType) => {
      localStorage.setItem("token", data.token);
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
    registerMutation.mutate({ username, password, role });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-50">
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border border-gray-50 rounded-md bg-white">
        <h1 className="text-2xl mb-4 font-semibold">Register</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
          <div className="role-selection">
            <select
              className="border border-gray-50 rounded-md p-2 w-full mb-3 bg-gray-100"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "user" | "player" | "admin")
              }
              required
            >
              <option value="user">User</option>
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <div className="my-4">
          <hr className="border border-gray-100" />
          <div className="flex gap-1 py-2">
            Already have an account?
            <Link className="text-blue-600 hover:text-blue-700" to={"/login"}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

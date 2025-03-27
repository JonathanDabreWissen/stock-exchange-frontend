import React, { useState, useContext } from "react";
// import api from "../../api"; // Import your Axios instance
import { useNavigate } from "react-router-dom"; // Import if using react-router
import { AuthContext } from "../../context/AuthContext";
import { Toaster, toast } from 'sonner'
import usePostDataWithParams from "../../hooks/usePostDataWithParams";

function SignIn() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Remove if not using react-router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {  addData:loginUser } = usePostDataWithParams("/api/auth/login")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params= {
      name: formData.name,
      password: formData.password,
    }

    const response = await loginUser(params)
    console.log(response)

    if(response){
      // Extract user data from the response
      const userData = {
        id: response.user,
        name: formData.name,
      };

      // Call the login function from AuthContext
      login(userData);

      // Display success message
      toast.success("Login successful!");

      // Reset form
      setFormData({ name: "", password: "" });
      setError("");

      // Redirect user after successful login
      navigate("/dashboard");
    }

    
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster/>
      <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full bg-light-blue text-white font-medium py-2 rounded-md bg-[#17C1E8] transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

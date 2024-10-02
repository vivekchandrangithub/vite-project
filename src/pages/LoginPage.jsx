import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Send login request to the backend
      const response = await axiosInstance.post("/login/userlogin", data);
      console.log(response, '=== response from user login'); // Debug log to check response structure
      
      // Check if login was successful
      if (response.data.success) {
        // Display success toast
        toast.success("Login successful");

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Navigate to the home page or dashboard
        navigate('/profile'); 
      } else {
        // Display error message if login failed
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error, '==== error'); // Debug log in case of error
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
          Log in to your account to explore our delicious menu, track your orders, and enjoy a seamless food ordering experience!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <Link className='p-2' to='/signup'>New User?</Link>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

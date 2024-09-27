import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance'; // Adjust this import if needed
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/login/adminlogin', data);
            console.log(response, '=== response from admin login'); // Debug log to check response structure
            if (response.data.success) {
                toast.success("Admin login successful");
                localStorage.setItem('adminToken', response.data.token); // Store the token in local storage
                navigate('/admindashboard'); // Navigate to admin dashboard
            } else {
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            console.log(error, '==== error');
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Admin Login</h1>
                    <p className="py-6">
                        Access the admin dashboard to manage your application.
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
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control mt-2">
                            <Link className='p-2' to='/signup'>New Admin? Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;

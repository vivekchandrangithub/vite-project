import React, { Children } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';
import toast from 'react-hot-toast';


const LoginPage = () => {

  const {register,handleSubmit} = useForm();
  const navigate = useNavigate(Children)

  const onSubmit = async(data) => {
    try{
        const response = await axiosInstance({method:"POST",url:"/login/userlogin",data})
        console.log(response,'====response')
        toast.success("login sucess")
        navigate('/')
    }catch(error){
      console.log(error,'====error')
      toast.error("Invalid username or password")
        console.log(error);
        
    }
  };
  
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register('email')} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register('password')} placeholder="password" className="input input-bordered" required />
          
            <Link className='p-2' to='/signup'>new User?</Link>
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default LoginPage;

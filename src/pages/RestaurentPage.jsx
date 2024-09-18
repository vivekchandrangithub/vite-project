import React, { useEffect } from 'react'
import { axiosInstance } from '../config/axiosinstance';

const RestaurentPage = () => {
const fetchRestaurent = async()=>{
    try{
        const response = await axiosInstance({
            method:"GET",
            url:"/restaurents"
        })
        console.log(response);
    }catch(error){
        console.log(error);
    }
};
useEffect(()=>{fetchRestaurent},[]);
  return (
    <div>
      <h1>
        Choose your favorite restaurent!!
      </h1>

    </div>
  )
}

export default RestaurentPage

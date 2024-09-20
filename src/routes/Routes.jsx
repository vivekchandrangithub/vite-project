import { createBrowserRouter } from "react-router-dom";
import HOME from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import About from "../pages/About";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import FoodPage from "../pages/FoodPage";
import RestaurentPage from "../pages/RestaurentPage";
import Cart from "../pages/Cart";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children:[
        {
            path:"",
            element:<HOME/>
        },{
            path:"about",
            element:<About />
        },{
            path:"login",
            element:<LoginPage />
        },{
            path:"signup",
            element:<SignupPage />
        },{
            path:"food",
            element:<FoodPage />
        },{
            path:"restaurent",
            element:<RestaurentPage />
        },{
            path:"cart",
            element:<Cart />
        }
      ]
    },
  ]);
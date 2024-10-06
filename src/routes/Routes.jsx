import { createBrowserRouter } from "react-router-dom";
import HOME from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import About from "../pages/About";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import FoodPage from "../pages/FoodPage";
import RestaurentPage from "../pages/RestaurentPage";
import Cart from "../pages/Cart";
import UserLayout from "../layout/UserLayout";
import ProfilePage from "../pages/ProfilePage";
import AuthUser from "../protectedRoutes/AuthUser"; // Protect User Routes
import RestaurentDetails from "../pages/RestaurentDetails";
import FoodDetails from "../pages/FoodDetails";
import PaymentPage from "../pages/PaymentPage";
import AdminDashboard from "../Admin/AdminDashboard"; // Admin Dashboard Component
import AdminRoute from "../protectedRoutes/AuthAdmin"; // Protect Admin Routes
import UserList from "../Admin/UserList";
import AdminRestuarent from "../Admin/AdminRestuarent";
import AdminFood from "../Admin/AdminFood";
import AdminLoginPage from "../pages/AdminLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HOME />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "food",
        element: <FoodPage />,
      },
      {
        path: "restaurent",
        element: <RestaurentPage />,
      },
      // Protect the Cart route
      {
        path: "cart",
        element: (
          <AuthUser>
            <Cart />
          </AuthUser>
        ),
      },
      // Protect the Profile route
      {
        path: "profile",
        element: (
          <AuthUser>
            <ProfilePage />
          </AuthUser>
        ),
      },
      {
        path: "/singlerestaurent/:id",
        element: <RestaurentDetails />,
      },
      {
        path: "foods/:foodId",
        element: <FoodDetails />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/login/adminLogin",
        element: <AdminLoginPage />,
      },
      {
        path: "/admindashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          {
            path: "userlist", 
            element: <UserList />,
          },
          {
            path: "adminRestaurent", 
            element: <AdminRestuarent />,
          },
          {
            path: "adminFood", 
            element: <AdminFood />,
          },
        ],
      },
    ],
  },
  {
    path: "user",
    element: (
      <AuthUser>
        <UserLayout />
      </AuthUser>
    ),
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";

import './App.css'

import ErrorComponent from "../shared/ui/ErrorComponent";
import MainPage from "../pages/main/MainPage";
import AuthPage from "../pages/authorization/AuthPage";
import RegisterPage from "../pages/registration/RegisterPage";
import { fetchMe } from "./model/slices/authSlice";
import { UserPage } from "../pages/user/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorComponent/>,
  },
  {
    path: "/authorization",
    element: <AuthPage/>,
    errorElement: <ErrorComponent/>,
  },
  {
    path: "/registration",
    element: <RegisterPage/>,
    errorElement: <ErrorComponent/>,
  },
  {
    path: "users/:userId",
    element: <UserPage/>,
    errorElement: <ErrorComponent/>,
  },
]);

function App() {
  const dispatch = useDispatch<ThunkDispatch>();

  useEffect(() => {
    dispatch(fetchMe());
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

import React, { lazy } from "react";
import Loadable from "../layouts/Loadable";
import { Navigate } from "react-router-dom";

const FullLayout = Loadable(lazy(() => import("../layouts/full-layout/MainLayout")));

const Home = Loadable(lazy(() => import("../pages/Home/Homepage")));

const Router = [
    {
      path: "/",
      element: null,
      children: [
        { path: "", exact: true, element: <Home /> }
      ],
    },
  ];
  
  export default Router;
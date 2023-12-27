import React, { lazy } from "react";
import Loadable from "../layouts/Loadable";
import { Navigate } from "react-router-dom";
import Homepage from "../pages/Home/Homepage";
import Fooelement from "../pages/Foo/Fooelement";
const FullLayout = Loadable(lazy(() => import("../layouts/full-layout/MainLayout")));

const Home = Loadable(lazy(() => import("../pages/Home/Homepage")));

const Router = [
    {
      path: "/",
      element: <Homepage />,
      children: [
        { path: "", exact: true, element: <Fooelement /> }
      ],
    },
  ];
  
  export default Router;
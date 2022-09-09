import React from "react";
import {Navigate,useLocation ,Outlet} from "react-router-dom";

import auth from '../services/authService';

const ProtectedRoute = () => {
    const user  = auth.getCurrentUser();
    const location = useLocation()
    return user ? <Outlet/>:<Navigate to="/login/" replace  state={{from:location}}/>
  };

export default ProtectedRoute;

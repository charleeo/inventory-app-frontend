import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "../../auth-component/login";
import Logout from "../../auth-component/logout";
import Register from "../../auth-component/register";
import Home from "../../home-component/home";
import PageNotFound from "../../page-notfound";
import Profile from "../../profile-component/profile";
import ProtectedRoute from "../../protectedRoute";
import UserLists from "../../user-group/UserLists";
import Warehouse from '../../warehouse-component/Warehouse';
import Warehouses from '../../warehouse-component/Warehouses';
const Layout =()=>{
    return(
        <Routes>
            <Route  path="/" element={<Home/>} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/logout/" element={<Logout/>} />
            <Route path="/register/" element={<Register/>} />
            <Route element={<ProtectedRoute/>}>
                <Route path="/profile/" element={<Profile/>} />
                <Route path="/user/group/create/" element={<UserLists/>} />
                <Route path="/warehouses/records/" element={<Warehouses/>} />
                <Route path="/warehouses/:id/record/" element={<Warehouse/>} />
            </Route>
            <Route path='*'  element={<PageNotFound/>}/>
        </Routes>        
    )
}

export default Layout
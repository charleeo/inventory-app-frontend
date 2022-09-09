import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/loader.css"
import "./assets/login.css"
import "./assets/sidebar.css"
import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom'

import Login from "./components/auth-component/login";
import  Header  from "./components/commons/header";
import Home from './components/home-component/home';
import Register from './components/auth-component/register';
import Profile from './components/profile-component/profile';
import ProtectedRoute from './components/protectedRoute';
import Logout from './components/auth-component/logout';
import PageNotFound from './components/page-notfound';
import Sidebar from './components/commons/navigation-components/sidebar';
import UserLists from './components/user-group/UserLists';
import Layout from './components/commons/layout-component/Layout';

function App() {
  return (
    <HashRouter>
      <Header/>
     <Sidebar>
      <Layout/>
     </Sidebar>
    </HashRouter>
  );
}

export default App;


{/* <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
import React from "react"
import { useSelector } from "react-redux"
import {Link} from  "react-router-dom"
import auth from "../../../services/authService"
const Sidebar=(props)=>{
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const currentUser = auth.getCurrentUser()
     const optionalClass = (currentUser || isLoggedIn)?"main-body-wit-sidebar": "main-body-without-sidebar"
    return (
    <>
    {
        (isLoggedIn || currentUser) &&
        <header>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
                <div className="position-sticky">
                    <div className="list-group list-group-flush">
                        <ul className="sidebar-list">
                            <li className="sidebar-list-item">
                                <Link className="menu-items-link" to="/user/group/create">
                                    User Group
                                </Link>
                            </li>
                            <li className="sidebar-list-item">
                                <Link className="menu-items-link" to="/warehouses/records/">
                                    Warehouses
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    }
    <div className={`${optionalClass} container`}>
        {props.children}
    </div>
    </>
) 

}

export default Sidebar
  
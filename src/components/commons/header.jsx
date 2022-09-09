import "../../assets/header-component.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import auth from "../../services/authService"
const Header=()=>{
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const currentUser = auth.getCurrentUser()
    
    return(
    <nav className="my-navbar">
        <div className="nav-items">
            <div className="brand-logo">
            <Link className="navbar-brand menu-items-link" to="/" >INVENTORY</Link>
            </div>
            <div className="nav-menus">
                <ul className="nav-menu-list">
                    <li className="menu-items">
                        <Link className="menu-items-link" to="/">Home</Link>
                    </li>
                    <li className="menu-items">About</li>
                    <li className="menu-items">Contact</li>
                    <li className="menu-items">Career</li>
                    {(!isLoggedIn && !currentUser)&&
                    <>
                        <li className="menu-items">
                            <Link className="menu-items-link" to="/register">Register</Link>
                        </li>
                        <li className="menu-items">
                            <Link className="menu-items-link" to="/login/">Login</Link>
                        </li>
                    </>
                    }
                    {(isLoggedIn ||currentUser) &&
                    <>
                    <li className="menu-items">
                        <Link className="menu-items-link" to={"/profile"}>Profile</Link>
                     </li>
                    <li className="menu-items">
                        <Link className="menu-items-link" to={"/logout/"}>Logout</Link>
                    </li>
                    </>
                    }
                </ul>
            </div>
        </div>
    </nav>
    
    )
}

export default Header
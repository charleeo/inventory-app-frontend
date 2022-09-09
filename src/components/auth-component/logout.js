import {useEffect} from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import auth from "../../services/authService";
import { authActions } from "../../store/authStore";

const Logout=()=> {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(()=>{
     auth.logout()
     dispatch(authActions.logout())
     Swal.fire({
        title: 'Success!',
        text: "Logged out",
        icon: 'success',
        showConfirmButton:false,
        timer:2000
    }) 
    setTimeout(function(){
        navigate('/')
    },2000)  
  },[auth]) 
  return(null)
}

export default Logout;

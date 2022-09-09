import React,{useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate,Navigate,useLocation} from "react-router-dom"
import Swal from "sweetalert2";
import auth from "../../services/authService";
import http from "../../services/httpService";
import { authActions } from "../../store/authStore";
import {  sendDataToServer } from "../../store/httpStore";
import { uiActions } from "../../store/uiSlice";
import Notification from "../commons/notification-components/loading";

const Login = () => {
    const navigate=useNavigate()
    const location = useLocation()
    const [inputText, setInputText] = useState({
        email: "",
        password: ""
    })

  const dispatch = useDispatch();

  const handleInputChange = e =>{
      setInputText({
          ...inputText, 
          [e.target.name]: e.target.value,
        })
    }
    
    const {email,password}=inputText
    const handleSubmit = async (e) => {
        dispatch(uiActions.showLoadingScreen({loading:true}))
    
        e.preventDefault();
        const url = http.setURL()+"users/login"
        const loginResponse = await dispatch(sendDataToServer(
            url,
            {email,password},
            "post"
            ));
        
        let responseData = loginResponse.data;
    
        dispatch(uiActions.showLoadingScreen({loading:false}))
        let message=""
        if(responseData && responseData.status ===true) {
            dispatch(authActions.login())//update  the header component
            message = responseData.message
            Swal.fire({
                text: message,
                icon: 'success',
                showConfirmButton:false,
                timer:4000,
                title:"Success"
            })
            auth.setToken(responseData.response.access_token)
            auth.setUser(JSON.stringify(responseData.response.user))
           if(location.state?.from) navigate(location.state.from)
            else navigate("/")
        }
        else{
            message = responseData.response ===null? responseData.message : responseData.response[0].message
            Swal.fire({
                title: 'Error!',
                text: message,
                icon: 'error'
            })
        }  
  }
  if(auth.getCurrentUser()){ return <Navigate to= '/'/>}
  return (
    <div>
        <Notification/>
     <section className="alignment_center">
        <div className="content-wrapper mb-5">
            <div className="row justify-content-center my-5">
                <div className="col-md-6 col-sm-8 align-self-center">
                    <div className="car border-0">
                        <div className="card-heade mb-5">
                            <h1 className="text-center">User Login</h1>
                        </div>
                        <div className="card-bod">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                    type="email" 
                                    placeholder="enter email here" className="form-control"
                                    value={email}
                                    onChange={handleInputChange}
                                    name="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                    value={password}
                                    type="password" className="form-control" placeholder="enter password here"
                                    onChange={handleInputChange}
                                    name= "password"                            
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                 </div>
            </div>
        </div>            
      </section>  
    </div>
  );
};

export default Login;

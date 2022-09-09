import React,{useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate,Navigate} from "react-router-dom"
import Swal from "sweetalert2";
import auth from "../../services/authService";
import { sendDataToServer } from "../../store/httpStore";
import { uiActions} from "../../store/uiSlice";
import Notification from "../commons/notification-components/loading";

const Register = () => {
    const navigate =useNavigate()
    const [inputText, setInputText] = useState({
        email:"",password:"",name:"", password_confirmation:""
    })

  const dispatch = useDispatch();

  const handleInputChange = e =>{
    setInputText({
        ...inputText, 
        [e.target.name]: e.target.value,
      })
  }

  const {email,password,password_confirmation,name}=inputText
  const handleSubmit = async (e) => {
   
    dispatch(uiActions.showLoadingScreen({loading:true}))
   
    e.preventDefault();

    const loginResponse = await dispatch(sendDataToServer(
        "http://127.0.0.1:9000/api/users/create",
        {email,password,password_confirmation,name},
        "post"
        ));
    
    let responseData = loginResponse.data;
    
    dispatch(uiActions.showLoadingScreen({loading:false}))
    let message=""
    if(responseData && responseData.status ===true) {
        message = responseData.message
        Swal.fire({
            text: message,
            icon: 'success',
            showConfirmButton:false,
            timer:4000,
            title:"Success"
        })
        navigate("/login")
    }
    else{
        message = responseData.response ===null? responseData.message : responseData.response[0].message
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error'
        })
    }  
    
  };
  if(auth.getCurrentUser()){ return <Navigate to= '/login'/>}
  return (
    <div className="container-fluid">
        <Notification/>
    <section className="alignment_center">
        <div className="content-wrapper">
            <div className="row justify-content-center my-5">
                <div className="col-md-5 col-sm-10 align-self-center">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header">
                            <h1 className="text-center">User Registration</h1>
                        </div>
                        <div className="card-body ">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                    type="text" 
                                    placeholder="enter name here" className="form-control"
                                    value={name}
                                    onChange={handleInputChange}
                                    name="name"
                                    />
                                </div>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <label htmlFor="papassword_confirmationssword">Confirm  Password</label>
                                    <input
                                    value={password_confirmation}
                                    type="password" className="form-control" placeholder="confirm password"
                                    onChange={handleInputChange}
                                    name="password_confirmation"  
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <button className="btn btn-primary">Register</button>
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

export default Register;

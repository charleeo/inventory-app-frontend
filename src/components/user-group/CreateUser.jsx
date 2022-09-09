import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux"
import Notification from '../commons/notification-components/loading';

const CreateUser=({closeModal,showModal})=>{
  const dispacth = useDispatch()
  const [inputText,setInputText]=useState({
    name:"","email":"",role:""
  })
    return(
      <div className='mt-5'>  
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create User Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
      <Notification                        />
        <section className="alignment_center">
            <div className="content-wrapper">
                <div className="row justify-content-center my-5">
                    <div className="col-md-5 col-sm-8 align-self-center">
                        <div className="card border-0 shadow-lg">
                            <div className="card-header">
                                <h1 className="text-center">User Login</h1>
                            </div>
                            <div className="card-body ">
                                <form 
                                // onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input 
                                        type="email" 
                                        placeholder="enter email here" className="form-control"
                                        // value={email}
                                        // onChange={handleInputChange}
                                        name="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                        // value={password}
                                        type="password" className="form-control" placeholder="enter password here"
                                        // onChange={handleInputChange}
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
      </Modal.Body>
      <Modal.Footer>
        <button  className="btn btn-secondary" onClick={closeModal}>
          Close
        </button >
        <button  className="btn btn-primary">
          Save Changes
        </button >
      </Modal.Footer>
    </Modal>
  </div>
    )
}
export default CreateUser
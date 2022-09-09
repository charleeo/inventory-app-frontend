import { useState } from "react";
import CreateUser from "./CreateUser";

const UserLists=()=>{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <section className="user-group-lists mt-5">
        <div>
          <button className="btn btn-primary" onClick={handleShow}>
              Create Users
          </button>
          </div>

        <hr/>
        <div className="">
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-lg">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">Item1</li>
                                <li className="list-group-item">Item2</li>
                                <li className="list-group-item">Item3</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-lg">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">Item1</li>
                                <li className="list-group-item">Item2</li>
                                <li className="list-group-item">Item3</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card border-0 shadow-lg">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">Item1</li>
                                <li className="list-group-item">Item2</li>
                                <li className="list-group-item">Item3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Modal */}
         <CreateUser
          openModal={handleShow}
          closeModal={handleClose}
          showModal={show}
         />
        </section>
    )
}
export default UserLists
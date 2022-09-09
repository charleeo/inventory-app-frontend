import { useCallback, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Notification from '../commons/notification-components/loading';

const CreateWarehouse=({
    closeModal,
    showModal,
    handleInputChange,
    handleSubmit,
    regions,
    states,
    inputText,
    getRegions,
    isCreate
    })=>{

    const {warehouse_name, warehouse_description,warehouse_location,size,region_id,region_name,state_name,state_id}= inputText
    let text = isCreate?"Create":"Update"
    return(
      <div className='mt-5'>  
      <Modal 
        show={showModal} 
        size="lg" 
        >
        <Notification/>
        {/* <button closeButton onClick={closeModal}>x</button> */}
        {/* <Modal.Header closeButton onClick={closeModal}> */}
          <Modal.Title className='text-center pt-4'>
            <h3 className='text-center'>{text} Warehouse</h3>
          </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
           <div className='row justify-content-center'>
             <div className='col-md-8 col-sm-10'>
                <div className='card border-0 shadow-l'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <select
                                id='state_id'
                              
                                 name="state_id"
                                 className='form-control border-0 border-bottom'
                                //  value={state_id}
                                 onChange={(e)=>{getRegions(e);handleInputChange(e)}}
                                >
                               
                                <option value={state_name?state_id:""} >{state_name?state_name:"select state"}</option>
                                {
                                states?.map((state)=>(<option 
                                    key={state.id} 
                                    value={state.id}
                                    >{state.name}</option>
                                ))
                                }
                                </select>
                            </div>

                            <div className='form-group mb-3'>
                                <select
                                 name="region_id"
                                 className='form-control border-0 border-bottom'
                                 value={region_id}
                                 onChange={handleInputChange}
                                >
                                {
                                  <option value={""}>{"Select region"}</option> 
                                }

                                {
                                regions?.map((region)=>(
                                    <option key={region.id} value={region.id}>{region.name}</option>
                                ))
                                }
                                </select>
                            </div>

                            <div className='form-group mb-3'>
                                <input
                                type="text"
                                name="warehouse_name"
                                placeholder='warehouse name'
                                className='form-control border-0 border-bottom'
                                onChange={handleInputChange}
                                value={warehouse_name}
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <input
                                type="text"
                                name="size"
                                placeholder='warehouse size'
                                className='form-control border-0 border-bottom'
                                onChange={handleInputChange}
                                value={size}
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <input
                                type="text"
                                name="warehouse_location"
                                placeholder='warehouse location'
                                className='form-control border-0 border-bottom'
                                onChange={handleInputChange}
                                value={warehouse_location}
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <textarea
                                name="warehouse_description"
                                placeholder='warehouse description'
                                className='form-control border-0 border-bottom'
                                onChange={handleInputChange}
                                value={warehouse_description}
                                />
                            </div>

                             <button className=' btn btn-primary'>{text}</button>
                        </form>
                    </div>
                </div>
             </div>
           </div>
        </Modal.Body>
        <Modal.Footer>
        <button  className="btn btn-secondary" onClick={closeModal}>
          Ok
        </button >
      </Modal.Footer>
    </Modal>
  </div>
    )
}
export default CreateWarehouse
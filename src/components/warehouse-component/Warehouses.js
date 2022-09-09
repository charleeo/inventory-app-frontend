import { useState,useEffect} from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

import Swal from "sweetalert2";
import http from "../../services/httpService";
import { sendDataToServer,getStates,getRegions as getRegionsData } from "../../store/httpStore";
import { uiActions } from "../../store/uiSlice";

import Notification from "../commons/notification-components/loading";
import CreateWarehouse from "./CreateWarehouse";

const Warehouses=()=>{
  const [warehouses,setWarehouses] =  useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [pageCount, setpageCount] = useState(0);
  
  const  handleShow= () => {
         getStatesData()
         setShow(true)
    }

  const handleClose = () => {
        setShow(false)
        setRegions(null)
        setStates(null)
        setIsCreate(true)
        setInputText({})
    }

  const perPage = 5

// Create warehouse implementation starts here
 const [inputText,setInputText]=useState({
        warehouse_name: "",
        warehouse_description:"",
        warehouse_location:"",
        size:"",
        region_id:"",
        state_id:"",
        region_name:"",
        state_name:"",
        id:""
    })
 

    
    const [states,setStates]  = useState(null)
    const [regions,setRegions]  = useState(null)
 
    
    const handleEdit = async(warehouseId)=>{

        setIsCreate(false)
        const warehouseData= await dispatch(sendDataToServer(
            `${http.setURL()}warehouse/get/details/${warehouseId}`,"get"
        ))
        setInputText(warehouseData.data.response)
        // setWarehouse(warehouseData.data.response)
    }

    const getStatesData= async()=>{
        const stateData= await dispatch(getStates())
        setStates(stateData?.data.response)
    }

    const getRegions = async e =>{
        dispatch(uiActions.showLoadingScreen({loading:true}))
        const state_id= e.target.value;
        const stateData= await dispatch(getRegionsData(state_id))
        
        dispatch(uiActions.showLoadingScreen({loading:false}))
        setRegions(stateData?.data.response)
    }

    const handleInputChange = (e)=>{
        setInputText({
        ...inputText,[e.target.name]:e.target.value
        })
    }
    
    const {warehouse_name,warehouse_description,warehouse_location,size,region_id,region_name,state_name,id}=inputText

    const handleSubmit=async (e)=>{
        dispatch(uiActions.showLoadingScreen({loading:true}))
        e.preventDefault();
        const url = http.setURL()+"warehouse/create"
        const warehouseResponse = await dispatch(sendDataToServer(
        url,
        {warehouse_description,warehouse_location,warehouse_name,size,region_id,id},
        "post"
        ));

        let responseData = warehouseResponse?.data;

        dispatch(uiActions.showLoadingScreen({loading:false}))
        let message=""
        if(responseData?.status ===true) {
            message = responseData.message
            Swal.fire({
                text: message,
                icon: 'success',
                showConfirmButton:false,
                timer:4000,
                title:"Success"
            })

            setInputText({})
            handleClose()
            getWarehouses()//reload the page the get newlys
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
  

    const getWarehouses = async(selectedPage=1) =>{
        dispatch(uiActions.showLoadingScreen({loading:true}))
        const warehouseData= await dispatch(sendDataToServer(
            `${http.setURL()}warehouse/get/all/for_user?page=${selectedPage}`,{per_page:perPage},"post"
            ))
            dispatch(uiActions.showLoadingScreen({loading:false}))
            setWarehouses(warehouseData?.data.response)
            let total = warehouseData?.data.response.total
            setpageCount(Math.ceil(total / perPage))
    }

    useEffect(() => {
            getWarehouses()
    }, []);
    
    const handlePageClick = async (data) => {
    
        let currentPage = data.selected + 1;
    
        await getWarehouses(currentPage);
    
      };
    return(
        <section className="user-group-lists mt-5">
        <div>
            <h2 className="text-center">
            <button className="btn btn-primary" onClick={handleShow}>
                Create Warehouses
            </button>
            </h2>
        </div>
        <hr/>
        <Notification/>
        <div className="row justify-content-center">
            {warehouses?.data.map((warehouse)=>(
            <div key={warehouse.id} className="col-md-4 col-sm-6 mb-3">
                <div className="card border-0 shadow-lg">
                    <div className="card-body">
                        <ul className="list-group shadow-lg p-4">
                            <li className="list-group-item">
                                <h6>
                                {warehouse.warehouse_name}
                                </h6>
                                </li>
                            <li className="list-group-item">{warehouse.warehouse_location}</li>
                            <li className="list-group-item">

                                State: {warehouse.state_name} 
                                {"  | "}LGA: {warehouse.region_name}
                                </li>
                            <li className="list-group-item"><p>{warehouse.warehouse_description}</p></li>
                            <li className="list-group-item">
                                <Link to={`/warehouses/${warehouse.id}/record/`}
                                className="mx-5 btn btn-default"
                                >Details</Link>
                                <button 
                                className="btn btn-warning"
                                onClick={()=>{
                                    handleEdit(warehouse.id)
                                    handleShow()
                                }}
                                >Edit</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            ))}
             <ReactPaginate
                previousLabel={"<<<<"}
                nextLabel={">>>>"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
        {/* Modal */}
         <CreateWarehouse
            openModal={handleShow}
            closeModal={handleClose}
            showModal={show}
            handleInputChange = {handleInputChange}
            handleSubmit = {handleSubmit}
            regions = {regions}
            states = {states}
            inputText = {inputText}
            getRegions = {getRegions}
            isCreate={isCreate}
         />
        </section>
    )
}
export default Warehouses
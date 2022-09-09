import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import http from '../../services/httpService';
import { getStates, sendDataToServer,getRegions as getRegionsData } from '../../store/httpStore';
import { uiActions } from '../../store/uiSlice';
import CreateWarehouse from './CreateWarehouse';
const  Warehouse =()=>
{
    const dispatch = useDispatch()
    const {id} = useParams()
 
    const getWarehouse = async(warehouseId)=>{

    const warehouseData= await dispatch(sendDataToServer(
        `${http.setURL()}warehouse/get/details/${warehouseId}`,"get"
    ))
        return warehouseData.data.response
    }

    useEffect(() => {
        getWarehouse(id)
    }, [id]);
    
    return (
        <>
         <section>
            
         </section>
        </>
    )
}
export default Warehouse
import http from "../services/httpService";

import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const httpSlice = createSlice({
  name: "http",
  initialState: { isDataSet: false },
  reducers: {
    updateProps(state) {
      state.isDataSet = true;
    }
  },
});


export const sendDataToServer = (url,dataObject=null,mehtod='get') => {
  const headers = http.setTokenHeaders()
    return async () => {
       const sendServerRequest = async () => {
        
        return  (mehtod==="post" && dataObject)? 
        await http.post(url,dataObject,headers)
         :
        await http.get(url,headers);
      }
      try {
       return await sendServerRequest();
      } catch (err) {
        console.log(err)
      }
    };
  }
export const getRegions = (state_id) => {
    return async () => {
       const regions = async () => {
        const regionsData= await 
            http.post(http.setURL()+"setup/region/all",{state_id})
        return regionsData
      }
      try {
       return await regions();
      } catch (err) {
        console.log(err)
      }
    }
}
export const getStates = () => {
    return async () => {
       const states = async () => {
        
        return await  http.get(http.setURL()+"setup/state/all")
      
      }
      try {
       return await states();
      } catch (err) {
        console.log(err)
      }
    }
}


  export const httpActions = httpSlice.actions;

  export default httpSlice;
  
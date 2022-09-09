import React from "react";
import { useSelector} from "react-redux";

const Notification = () => {
  const loading = useSelector((state) => state.ui.loading)
  return (
    <>
      {loading && loading.loading ===true ? 
      <div className="loader-wrapper">
        <div className="loader"></div>
        </div>
       : null}
    </>
  );
};

export default Notification;

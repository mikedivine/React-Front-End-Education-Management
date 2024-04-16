import React, {useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Logout(props) {

    const navigate = useNavigate();
  
    useEffect( () => {
      props.logout();
      navigate('/');
    } )
  
    return (
      <>
        <h3>You are logged out.</h3>
        
      </>
    )
  }

  export default Logout;

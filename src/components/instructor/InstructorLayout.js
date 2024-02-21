import React from 'react';
import { Outlet, Link } from "react-router-dom";

const InstructorLayout = () => {

  return (
    <>
      <nav>
        <Link to="/">Home</Link> 
      </nav>
      <h1>Instructor Home</h1>
      Manage assignments and grades.

      <Outlet />
    </>
  )
};

export default InstructorLayout;

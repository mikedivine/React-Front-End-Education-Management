import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from '../../Logout.js'
import InstructorHome from './InstructorHome';
import EnrollmentsView from './EnrollmentsView';
import InstructorSectionsView from './InstructorSectionsView';
import AssignmentsView from './AssignmentsView';


export const InstructorRouter = (props) => {
  return (
  <div className="App">
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<InstructorLayout />} >
          <Route index element={<InstructorHome />} />
          <Route path="assignments" element={<AssignmentsView />} />
          <Route path="enrollments" element={<EnrollmentsView />} />
          <Route path="sections" element={<InstructorSectionsView />} />
          <Route path="logout" element={<Logout logout={props.logout}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

const InstructorLayout = () => {

  return (
    <>
      <nav>
        <Link to="/">Home</Link> &nbsp;|&nbsp; 
        <Link id="logout" to="/logout">Logout</Link>
      </nav>
      <h1>Instructor Home</h1>
      Manage assignments and grades.

      <Outlet />
    </>
  )
};

export default InstructorLayout;

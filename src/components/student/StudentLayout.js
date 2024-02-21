import { Outlet, Link } from "react-router-dom";

export const StudentHome = () => {

  return (
      <div>
          <h1>Student Home</h1>
          <p>View class schedule</p> 
          <p>Add and drop courses</p> 
          <p>View assignments and grades</p>
          <p>View Transcript</p>
      </div>
      
      );
};

export const StudentLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> &nbsp;|&nbsp;   
        <Link to="/schedule">Class Schedule</Link>&nbsp;|&nbsp;  
        <Link to="/addCourse">Add a Course</Link>&nbsp;|&nbsp;
        <Link to="/studentAssignments">Assignments</Link>&nbsp;|&nbsp;  
        <Link to="/transcript">Transcript</Link>
      </nav>

      <Outlet />
    </>
  )
};

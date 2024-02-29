import { Outlet, Link } from "react-router-dom";

export const StudentHome = () => {

  return (
      <div>
          <h1>Student Home</h1>
          <p>View class schedule. Drop course.</p> 
          <p>Enroll in a course.</p>
          <p>View assignments and grades.</p>
          <p>View Transcript.</p>
      </div>
      
      );
};

export const StudentLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> &nbsp;|&nbsp;   
        <Link to="/schedule">VIew Class Schedule</Link>&nbsp;|&nbsp;  
        <Link to="/addCourse">Enroll in a class</Link>&nbsp;|&nbsp;
        <Link to="/studentAssignments">View Assignments</Link>&nbsp;|&nbsp;  
        <Link to="/transcript">View Transcript</Link>
      </nav>

      <Outlet />
    </>
  )
};
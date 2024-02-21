import { Outlet, Link } from "react-router-dom";

export const AdminHome = () => {

  return (
      <div>
          <h1>Admin Home</h1>
          Manage users, courses and sections.
      </div>
      
      );
};

export const AdminLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> &nbsp;|&nbsp;   
        <Link to="/users">Users</Link>&nbsp;|&nbsp;  
        <Link to="/courses">Courses</Link>&nbsp;|&nbsp;  
        <Link to="/sections">Sections</Link>
      </nav>

      <Outlet />
    </>
  )
};